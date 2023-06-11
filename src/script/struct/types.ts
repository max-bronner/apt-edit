export type Offset = number | null;

export type ParserCallback = (view: DataView, offset: Offset, data: { [key: string]: any }) => any;
export type CustomCallback = (
  view: DataView,
  offset: number,
  data: { [key: string]: any },
) => { byteSize: number; result: any };

export interface BaseOptions {
  debug?: boolean;
}
export interface PointerOptions extends BaseOptions {
  allowNullPointer?: boolean;
}

export interface Member {
  pointer(options?: PointerOptions): Member;
  uint8(options?: BaseOptions): void;
  int32(options?: BaseOptions): void;
  uint32(options?: BaseOptions): void;
  float32(options?: BaseOptions): void;
  string(options?: BaseOptions): void;
  struct(struct: Struct, options?: BaseOptions): void;
  array(count: number | string, options?: BaseOptions): Member;
  custom(customCallback: CustomCallback, options?: BaseOptions): Member;
  parse(view: DataView, offset: number, structData: { [key: string]: any }): number;
}

export interface Struct {
  members: Member[];
  getCurrentOffset(): number;
  setCurrentOffset(offset: number): void;
  addMember(name: string): Member;
  parse(view: DataView, offset?: number, reset?: boolean): { [key: string]: [any] };
}
