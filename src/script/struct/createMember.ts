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
    parse: (view: DataView, offset: number, data) => {
      data[member.name] = member.callbacks.reduce((acc: number, callback: ParserCallback) => {
        return callback(view, acc, data);
      }, offset);
      return member.byteSize;
    },
  };

  return member;
};
