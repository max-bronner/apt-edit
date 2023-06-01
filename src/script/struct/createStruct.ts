import { createMember } from './createMember';
import type { Struct, Member } from './types';

export const createStruct = (): Struct => {
  let currentOffset = 0;
  const members: Member[] = [];
  const addMember = (name: string) => {
    const member = createMember(name);
    members.push(member);
    return member;
  };

  const parse = (view: DataView, offset: number) => {
    const data = {};
    currentOffset = offset ?? currentOffset;
    members.forEach((member) => {
      currentOffset += member.parse(view, currentOffset, data);
    });
    return data;
  };

  const getCurrentOffset = () => {
    return currentOffset;
  };

  const setCurrentOffset = (offset: number) => {
    currentOffset = offset;
  };

  return {
    getCurrentOffset,
    setCurrentOffset,
    addMember,
    parse,
  };
};
