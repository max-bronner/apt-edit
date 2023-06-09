export type Offset = number | null;

export type ParserCallback = (view: DataView, offset: Offset, data: { [key: string]: any }) => any;
export type CustomCallback = (view: DataView, offset: number, data: { [key: string]: any }) => any;

export interface Member {
  name: string;
  byteSize: number;
  callbacks: ParserCallback[];
  pointer(allowNullPointer?: boolean): Member;
  uint32(): void;
  string(): void;
  struct(struct: Struct): void;
  array(count: number | string): Member;
  custom(customCallback: CustomCallback, byteSize: number): Member;
  parse(view: DataView, offset: number, structData: { [key: string]: any }): number;
}

export interface Struct {
  members: Member[];
  getCurrentOffset(): number;
  setCurrentOffset(offset: number): void;
  addMember(name: string): Member;
  parse(view: DataView, offset?: number, reset?: boolean): { [key: string]: [any] };
}
