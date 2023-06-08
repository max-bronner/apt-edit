export type ParserCallback = (view: DataView, offset: number, data: { [key: string]: any }) => any;
export type CustomCallback = (view: DataView, offset: number, data: { [key: string]: any }) => any;

export interface Member {
  name: string;
  byteSize: number;
  callbacks: ParserCallback[];
  uint32(): Member;
  string(): Member;
  pointer(): Member;
  struct(struct: Struct): Member;
  array(struct: Struct, count: number | string): void;
  arrayAlt(count: number | string): Member;
  custom(customCallback: CustomCallback, byteSize: number): Member;
  parse(view: DataView, offset: number, structData: { [key: string]: any }): number;
}

export interface Struct {
  getCurrentOffset(): number;
  setCurrentOffset(offset: number): void;
  addMember(name: string): Member;
  parse(view: DataView, offset?: number): { [key: string]: [any] };
}
