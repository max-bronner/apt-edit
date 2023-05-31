export type ParserCallback = (view: DataView, offset: number, data: { [key: string]: any }) => any;

export interface Member {
  name: string;
  byteSize: number;
  callbacks: ParserCallback[];
  uint32(): Member;
  string(): Member;
  pointer(): Member;
  parse(view: DataView, offset: number, structData: { [key: string]: any }): number;
}

export interface Struct {
  addMember(name: string): Member;
  parse(view: DataView, offset?: number): { [key: string]: [any] };
}
