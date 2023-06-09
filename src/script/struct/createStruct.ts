import { createMember } from './createMember';
import type { Struct, Member } from './types';

export const createStruct = (struct?: Struct): Struct => {
  let currentOffset = 0;
  const members: Member[] = struct ? [...struct.members] : [];
  const addMember = (name: string) => {
    const member = createMember(name);
    members.push(member);
    return member;
  };

  const parse = (view: DataView, offset: number, reset: boolean = true) => {
    const data = {};
    currentOffset = offset ?? currentOffset;
    members.forEach((member) => {
      currentOffset += member.parse(view, currentOffset, data);
    });
    if (reset) {
      currentOffset = 0;
    }

    return data;
  };

  const getCurrentOffset = () => {
    return currentOffset;
  };

  const setCurrentOffset = (offset: number) => {
    currentOffset = offset;
  };

  return {
    members,
    getCurrentOffset,
    setCurrentOffset,
    addMember,
    parse,
  };
};
