import { roundUp } from '../utilities/utilities';
import type { Offset, Member, Struct, ParserCallback, CustomCallback } from './types';

const decoder = new TextDecoder();

export const createMember = (name: string): Member => {
  const member: Member = {
    name,
    byteSize: 0,
    callbacks: [],
    pointer: (allowNullPointer: boolean = false) => {
      member.callbacks.push((view: DataView, offset: Offset) => {
        if (offset === null) {
          return null;
        }
        const pointerValue = view.getUint32(offset, true);
        member.byteSize ||= 4;
        return !allowNullPointer && pointerValue === 0 ? null : pointerValue;
      });
      return member;
    },
    uint8: () => {
      member.callbacks.push((view: DataView, offset: Offset) => {
        if (offset === null) {
          return null;
        }
        member.byteSize ||= 1;
        return view.getUint8(offset);
      });
    },
    int32: () => {
      member.callbacks.push((view: DataView, offset: Offset) => {
        if (offset === null) {
          return null;
        }
        member.byteSize ||= 4;
        return view.getInt32(offset, true);
      });
    },
    uint32: () => {
      member.callbacks.push((view: DataView, offset: Offset) => {
        if (offset === null) {
          return null;
        }
        member.byteSize ||= 4;
        return view.getUint32(offset, true);
      });
    },
    float32: () => {
      member.callbacks.push((view: DataView, offset: Offset) => {
        if (offset === null) {
          return null;
        }
        member.byteSize ||= 4;
        return view.getFloat32(offset, true);
      });
    },
    string: () => {
      member.callbacks.push((view: DataView, offset: Offset) => {
        if (offset === null) {
          return null;
        }
        const charArray = new Uint8Array(view.buffer, offset);
        const nullIndex = charArray.indexOf(0);
        const stringArray = charArray.subarray(0, nullIndex);
        member.byteSize ||= roundUp(nullIndex, 4);
        return decoder.decode(stringArray);
      });
    },
    struct: (struct: Struct) => {
      member.callbacks.push((view: DataView, offset: Offset) => {
        if (offset === null) {
          return null;
        }
        const structData = struct.parse(view, offset, false);
        member.byteSize ||= struct.getCurrentOffset() - offset;
        return structData;
      });
    },
    array: (count: number | string) => {
      const arrayMember = createMember('array');
      member.callbacks.push((view: DataView, offset: Offset, data) => {
        if (offset === null) {
          return null;
        }
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
    custom: (customCallback: CustomCallback) => {
      member.callbacks.push((view: DataView, offset: Offset, data) => {
        if (offset === null) {
          return null;
        }
        const { byteSize, result } = customCallback(view, offset, data);
        member.byteSize ||= byteSize;
        return result;
      });
      return member;
    },
    parse: (view: DataView, offset: number, data) => {
      data[member.name] = member.callbacks.reduce((acc: number, callback: ParserCallback) => {
        return callback(view, acc, data);
      }, offset);
      const finalByteSize = member.byteSize;
      member.byteSize = 0;
      return finalByteSize;
    },
  };

  return member;
};
