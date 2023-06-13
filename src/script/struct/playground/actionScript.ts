import { CustomCallback } from '../types';
import { roundUp, getString } from '../../utilities/utilities';
import { createStruct } from '../createStruct';

type ActionScriptCallback = CustomCallback extends (...params: infer U) => infer R
  ? (...params: [...U, number?]) => R
  : never;

enum ActionType {
  ACTION_END = 0x00,
  ACTION_NEXTFRAME = 0x04,
  ACTION_PREVFRAME = 0x05,
  ACTION_PLAY = 0x06,
  ACTION_STOP = 0x07,
  ACTION_TOGGLEQUALITY = 0x08,
  ACTION_STOPSOUNDS = 0x09,
  ACTION_ADD = 0x0a,
  ACTION_SUBTRACT = 0x0b,
  ACTION_MULTIPLY = 0x0c,
  ACTION_DIVIDE = 0x0d,
  ACTION_EQUAL = 0x0e,
  ACTION_LESSTHAN = 0x0f,
  ACTION_LOGICALAND = 0x10,
  ACTION_LOGICALOR = 0x11,
  ACTION_LOGICALNOT = 0x12,
  ACTION_STRINGEQ = 0x13,
  ACTION_STRINGLENGTH = 0x14,
  ACTION_SUBSTRING = 0x15,
  ACTION_POP = 0x17,
  ACTION_INT = 0x18,
  ACTION_GETVARIABLE = 0x1c,
  ACTION_SETVARIABLE = 0x1d,
  ACTION_SETTARGETEXPRESSION = 0x20,
  ACTION_STRINGCONCAT = 0x21,
  ACTION_GETPROPERTY = 0x22,
  ACTION_SETPROPERTY = 0x23,
  ACTION_DUPLICATECLIP = 0x24,
  ACTION_REMOVECLIP = 0x25,
  ACTION_TRACE = 0x26,
  ACTION_STARTDRAGMOVIE = 0x27,
  ACTION_STOPDRAGMOVIE = 0x28,
  ACTION_STRINGCOMPARE = 0x29,
  ACTION_THROW = 0x2a,
  ACTION_CASTOP = 0x2b,
  ACTION_IMPLEMENTSOP = 0x2c,
  ACTION_RANDOM = 0x30,
  ACTION_MBLENGTH = 0x31,
  ACTION_ORD = 0x32,
  ACTION_CHR = 0x33,
  ACTION_GETTIMER = 0x34,
  ACTION_MBSUBSTRING = 0x35,
  ACTION_MBORD = 0x36,
  ACTION_MBCHR = 0x37,
  ACTION_DELETE = 0x3a,
  ACTION_DELETE2 = 0x3b,
  ACTION_DEFINELOCAL = 0x3c,
  ACTION_CALLFUNCTION = 0x3d,
  ACTION_RETURN = 0x3e,
  ACTION_MODULO = 0x3f,
  ACTION_NEW = 0x40,
  ACTION_VAR = 0x41,
  ACTION_INITARRAY = 0x42,
  ACTION_INITOBJECT = 0x43,
  ACTION_TYPEOF = 0x44,
  ACTION_TARGETPATH = 0x45,
  ACTION_ENUMERATE = 0x46,
  ACTION_NEWADD = 0x47,
  ACTION_NEWLESSTHAN = 0x48,
  ACTION_NEWEQUALS = 0x49,
  ACTION_TONUMBER = 0x4a,
  ACTION_TOSTRING = 0x4b,
  ACTION_DUP = 0x4c,
  ACTION_SWAP = 0x4d,
  ACTION_GETMEMBER = 0x4e,
  ACTION_SETMEMBER = 0x4f,
  ACTION_INCREMENT = 0x50,
  ACTION_DECREMENT = 0x51,
  ACTION_CALLMETHOD = 0x52,
  ACTION_NEWMETHOD = 0x53,
  ACTION_INSTANCEOF = 0x54,
  ACTION_ENUM2 = 0x55,
  EA_ACTION56 = 0x56,
  EA_ACTION58 = 0x58,
  EA_PUSHZERO = 0x59,
  EA_PUSHONE = 0x5a,
  EA_CALLFUNCTIONPOP = 0x5b,
  EA_CALLFUNCTION = 0x5c,
  EA_CALLMETHODPOP = 0x5d,
  EA_CALLMETHOD = 0x5e,
  ACTION_BITWISEAND = 0x60,
  ACTION_BITWISEOR = 0x61,
  ACTION_BITWISEXOR = 0x62,
  ACTION_SHIFTLEFT = 0x63,
  ACTION_SHIFTRIGHT = 0x64,
  ACTION_SHIFTRIGHT2 = 0x65,
  ACTION_STRICTEQ = 0x66,
  ACTION_GREATER = 0x67,
  ACTION_STRINGGREATER = 0x68,
  ACTION_EXTENDS = 0x69,
  EA_PUSHTHIS = 0x70,
  EA_PUSHGLOBAL = 0x71,
  EA_ZEROVARIABLE = 0x72,
  EA_PUSHTRUE = 0x73,
  EA_PUSHFALSE = 0x74,
  EA_PUSHNULL = 0x75,
  EA_PUSHUNDEFINED = 0x76,
  EA_ACTION77 = 0x77,
  ACTION_GOTOFRAME = 0x81,
  ACTION_GETURL = 0x83,
  ACTION_SETREGISTER = 0x87,
  ACTION_CONSTANTPOOL = 0x88,
  ACTION_WAITFORFRAME = 0x8a,
  ACTION_SETTARGET = 0x8b,
  ACTION_GOTOLABEL = 0x8c,
  ACTION_WAITFORFRAMEEXPRESSION = 0x8d,
  ACTION_DEFINEFUNCTION2 = 0x8e,
  ACTION_TRY = 0x8f,
  ACTION_WITH = 0x94,
  ACTION_PUSHDATA = 0x96,
  ACTION_BRANCHALWAYS = 0x99,
  ACTION_GETURL2 = 0x9a,
  ACTION_DEFINEFUNCTION = 0x9b,
  ACTION_BRANCHIFTRUE = 0x9d,
  ACTION_CALLFRAME = 0x9e,
  ACTION_GOTOEXPRESSION = 0x9f,
  EA_PUSHSTRING = 0xa1,
  EA_PUSHCONSTANT = 0xa2,
  EA_PUSHWORDCONSTANT = 0xa3,
  EA_GETSTRINGVAR = 0xa4,
  EA_GETSTRINGMEMBER = 0xa5,
  EA_SETSTRINGVAR = 0xa6,
  EA_SETSTRINGMEMBER = 0xa7,
  EA_PUSHVALUEOFVAR = 0xae,
  EA_GETNAMEDMEMBER = 0xaf,
  EA_CALLNAMEDFUNCTIONPOP = 0xb0,
  EA_CALLNAMEDFUNCTION = 0xb1,
  EA_CALLNAMEDMETHODPOP = 0xb2,
  EA_CALLNAMEDMETHOD = 0xb3,
  EA_PUSHFLOAT = 0xb4,
  EA_PUSHBYTE = 0xb5,
  EA_PUSHSHORT = 0xb6,
  EA_PUSHLONG = 0xb7,
  EA_BRANCHIFFALSE = 0xb8,
  EA_PUSHREGISTER = 0xb9,
}

const parseActionScript: ActionScriptCallback = (view, offset, data, size) => {
  const script = [];
  let currentOffset = offset;
  let isEnd = false;
  do {
    const type = view.getUint8(currentOffset);
    switch (type) {
      default:
        isEnd = true;
        break;
    }
  } while (!isEnd);
  const result = script;
  const byteSize = currentOffset - offset;
  return {
    byteSize,
    result,
  };
};

export const parseActions: CustomCallback = (view, offset, data) => {
  return parseActionScript(view, offset, data);
};
