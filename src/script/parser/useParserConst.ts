import type { ConstFile, ConstHead, ConstItem } from './parserType';
import { ItemType } from './parserType';
import { useParser } from './useParser';
import { ConstItemStruct, ConstHeadStruct } from './structs';

export const useParserConst = (buffer: ArrayBuffer) => {
  const parser = useParser(buffer);

  const parseConstHead = (): ConstHead => {
    return parser.parseStruct(ConstHeadStruct);
  };

  const parseConstItems = (itemCount: number): ConstItem[] => {
    const items: ConstItem[] = [];
    for (let i = 0; i < itemCount; i++) {
      const item = parser.parseStruct<ConstItem>(ConstItemStruct);
      item.itemValue =
        item.itemType === ItemType.TypeString
          ? parser.getString(item.itemValue as number)
          : item.itemValue;
      items.push(item);
    }
    return items;
  };

  const parseConst = (): ConstFile => {
    const { itemCount, ...head } = parseConstHead();
    const items = parseConstItems(itemCount);

    return {
      ...head,
      items,
    };
  };

  return {
    parseConst,
  };
};
