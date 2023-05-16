import type { Parser, Const, ConstHead, ConstItem } from './parser';
import { parseString } from './utilities';

const parseConstHead: Parser<ConstHead> = (buffer: ArrayBuffer) => {
  const fileType = parseString(buffer);
  const iteratorHead = new Uint32Array(buffer, 20, 2).values();
  const aptOffset: number = iteratorHead.next().value;
  const itemCount: number = iteratorHead.next().value;
  return {
    fileType,
    aptOffset,
    itemCount
  }
}

export const parseConst: Parser<Const> = (buffer: ArrayBuffer) => {
  const { itemCount, ...head } = parseConstHead(buffer);
  const items: ConstItem[] = [];

  return {
    ...head,
    items
  };
}