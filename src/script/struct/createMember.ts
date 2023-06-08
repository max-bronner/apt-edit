import { roundUp } from '../utilities/utilities';
import type { Member, Struct, ParserCallback } from './types';

const decoder = new TextDecoder();

export const createMember = (name: string): Member => {
  const member: Member = {
    name,
    byteSize: 0,
    callbacks: [],
    uint32: () => {
      member.callbacks.push((view: DataView, offset: number) => {
        member.byteSize ||= 4;
        return view.getUint32(offset, true);
      });
      return member;
    },
    string: () => {
      member.callbacks.push((view: DataView, offset: number) => {
        const charArray = new Uint8Array(view.buffer, offset);
        const nullIndex = charArray.indexOf(0);
        const stringArray = charArray.subarray(0, nullIndex);
        member.byteSize ||= roundUp(nullIndex, 4);
        return decoder.decode(stringArray);
      });
      return member;
    },
    pointer: () => {
      member.callbacks.push((view: DataView, offset: number) => {
        member.byteSize ||= 4;
        return view.getUint32(offset, true);
      });
      return member;
    },
    struct: (struct: Struct) => {
      member.callbacks.push((view: DataView, offset: number) => {
        struct.setCurrentOffset(offset);
        const structData = struct.parse(view);
        member.byteSize ||= struct.getCurrentOffset() - offset;
        return structData;
      });
      return member;
    },
    array: (struct: Struct, count: number | string) => {
      member.callbacks.push((view: DataView, offset: number, data) => {
        const loops = typeof count === 'number' ? count : (data[count] as number);
        const arrayData = [];
        struct.setCurrentOffset(offset);
        for (let i = 0; i < loops; i++) {
          arrayData.push(struct.parse(view));
        }
        member.byteSize ||= struct.getCurrentOffset() - offset;
        return arrayData;
      });
    },
    arrayAlt: (count: number | string) => {
      const arrayMember = createMember('array');
      member.callbacks.push((view: DataView, offset: number, data) => {
        const loops = typeof count === 'number' ? count : (data[count] as number);
        const arrayData = [];
        let currentOffset = offset;
        for (let i = 0; i < loops; i++) {
          const entryData: { array?: any } = {};
          currentOffset += arrayMember.parse(view, currentOffset, entryData);
          arrayData.push(entryData.array);
        }
        member.byteSize ||= currentOffset - offset;
        return arrayData;
      });
      return arrayMember;
    },
    custom: (customCallback: ParserCallback, byteSize: number) => {
      member.callbacks.push((view: DataView, offset: number, data) => {
        member.byteSize ||= byteSize;
        return customCallback(view, offset, data);
      });
      return member;
    },
    parse: (view: DataView, offset: number, data) => {
      data[member.name] = member.callbacks.reduce((acc: number, callback: ParserCallback) => {
        return callback(view, acc, data);
      }, offset);
      return member.byteSize;
    },
  };

  return member;
};
