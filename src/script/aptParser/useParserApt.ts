import type { AptFile, OutputMovie } from './types';
import { FrameItemType } from './types';
import * as Struct from './structs';

export const useParserApt = (buffer: ArrayBuffer) => {
  const view = new DataView(buffer);

  const parseFrameItems = ({ frameItems }: { frameItems: number[] }) => {
    return frameItems?.map((frameItem: number) => {
      const type = view.getUint32(frameItem, true);
      switch (type) {
        case FrameItemType.ACTION:
          return Struct.outputActionStruct.parse(view, frameItem);
        case FrameItemType.FRAMELABEL:
          return Struct.frameLabelStruct.parse(view, frameItem);
        case FrameItemType.PLACEOBJECT:
          return Struct.placeObjectStruct.parse(view, frameItem);
        case FrameItemType.REMOVEOBJECT:
          return Struct.removeObjectStruct.parse(view, frameItem);
        case FrameItemType.BACKGROUNDCOLOR:
          return Struct.backgroundColorStruct.parse(view, frameItem);
        case FrameItemType.INITACTION:
          return Struct.initActionStruct.parse(view, frameItem);
      }
    });
  };

  const parseApt = (offset: number): AptFile => {
    const fileType = Struct.headerStruct.parse(view) as unknown as string;
    const outputMovie = Struct.outputMovieStruct.parse(view, offset) as unknown as OutputMovie;
    outputMovie.frames = outputMovie.frames?.map(parseFrameItems);

    return {
      fileType,
      outputMovie,
    };
  };

  return {
    parseApt,
  };
};
