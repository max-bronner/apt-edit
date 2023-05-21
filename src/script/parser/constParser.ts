import { ConstFile, ConstHead, ConstItem, ConstItemType } from './parser';
import { parseString } from './utilities';

const parseConstHead = (buffer: ArrayBuffer): ConstHead => {
  const fileType = parseString(buffer);
  const iteratorHead = new Uint32Array(buffer, 20, 2).values();
  const aptOffset: number = iteratorHead.next().value;
  const itemCount: number = iteratorHead.next().value;
  return {
    fileType,
    aptOffset,
    itemCount,
  };
};

const parseConstItems = (
  buffer: ArrayBuffer,
  itemCount: number
): ConstItem[] => {
  const iteratorItems = new Uint32Array(buffer, 32, itemCount * 2).values();

  const items: ConstItem[] = [];
  for (let i = 0; i < itemCount; i++) {
    const itemType = iteratorItems.next().value;
    const value = iteratorItems.next().value;
    const itemValue =
      itemType === ConstItemType.TypeString
        ? parseString(buffer, value)
        : value;
    items.push({ itemType, itemValue });
  }
  return items;
};

export const parseConst = (buffer: ArrayBuffer): ConstFile => {
  const { itemCount, ...head } = parseConstHead(buffer);
  const items: ConstItem[] = parseConstItems(buffer, itemCount);

  return {
    ...head,
    items,
  };
};
