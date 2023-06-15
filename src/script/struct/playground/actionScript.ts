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

const singleUint8ArgStruct = createStruct();
singleUint8ArgStruct.addMember('value').uint8();

const singleUint16ArgStruct = createStruct();
singleUint16ArgStruct.addMember('value').uint16();

const singleStringArgStruct = createStruct();
singleStringArgStruct.addMember('value').pointer().string();

const singleUint32ArgStruct = createStruct();
singleUint32ArgStruct.addMember('value').uint32();

const singleInt32ArgStruct = createStruct();
singleInt32ArgStruct.addMember('value').int32();

const singleFloatArgStruct = createStruct();
singleFloatArgStruct.addMember('value').float32();

const constantPoolStruct = createStruct();
constantPoolStruct.addMember('count').uint32();
constantPoolStruct.addMember('constants').pointer().array('count').uint32();

const defineFunctionStruct = createStruct();
defineFunctionStruct.addMember('name').pointer().string();
defineFunctionStruct.addMember('count').uint32();
defineFunctionStruct.addMember('args').pointer().array('count').pointer().string();
defineFunctionStruct.addMember('size').uint32();
defineFunctionStruct.addMember('signature1').uint32();
defineFunctionStruct.addMember('signature2').uint32();

const defineFunction2ArgStruct = createStruct();
defineFunction2ArgStruct.addMember('reg').uint32();
defineFunction2ArgStruct.addMember('name').pointer().string();

const defineFunction2Struct = createStruct();
defineFunction2Struct.addMember('name').pointer().string();
defineFunction2Struct.addMember('count').uint32();
defineFunction2Struct.addMember('flags').uint32();
defineFunction2Struct.addMember('args').pointer().array('count').struct(defineFunction2ArgStruct);
defineFunction2Struct.addMember('size').uint32();
defineFunction2Struct.addMember('signature1').uint32();
defineFunction2Struct.addMember('signature2').uint32();

const pushDataStruct = createStruct();
pushDataStruct.addMember('count').uint32();
pushDataStruct.addMember('data').pointer().array('count').uint32();

const parseActionScript: ActionScriptCallback = (view, offset, data, size) => {
  const script = [];
  let currentOffset = offset;
  let isEnd = false;
  do {
    const type = view.getUint8(currentOffset);
    switch (type) {
      case ActionType.ACTION_END:
        // Align after action script
        currentOffset = roundUp(currentOffset + 1, 4);
        script.push({ type: ActionType[type] });
        break;
      case ActionType.ACTION_NEXTFRAME:
      case ActionType.ACTION_PREVFRAME:
      case ActionType.ACTION_PLAY:
      case ActionType.ACTION_STOP:
      case ActionType.ACTION_TOGGLEQUALITY:
      case ActionType.ACTION_STOPSOUNDS:
      case ActionType.ACTION_ADD:
      case ActionType.ACTION_SUBTRACT:
      case ActionType.ACTION_MULTIPLY:
      case ActionType.ACTION_DIVIDE:
      case ActionType.ACTION_EQUAL:
      case ActionType.ACTION_LESSTHAN:
      case ActionType.ACTION_LOGICALAND:
      case ActionType.ACTION_LOGICALOR:
      case ActionType.ACTION_LOGICALNOT:
      case ActionType.ACTION_STRINGEQ:
      case ActionType.ACTION_STRINGLENGTH:
      case ActionType.ACTION_SUBSTRING:
      case ActionType.ACTION_POP:
      case ActionType.ACTION_INT:
      case ActionType.ACTION_GETVARIABLE:
      case ActionType.ACTION_SETVARIABLE:
      case ActionType.ACTION_SETTARGETEXPRESSION:
      case ActionType.ACTION_STRINGCONCAT:
      case ActionType.ACTION_GETPROPERTY:
      case ActionType.ACTION_SETPROPERTY:
      case ActionType.ACTION_DUPLICATECLIP:
      case ActionType.ACTION_REMOVECLIP:
      case ActionType.ACTION_TRACE:
      case ActionType.ACTION_STARTDRAGMOVIE:
      case ActionType.ACTION_STOPDRAGMOVIE:
      case ActionType.ACTION_STRINGCOMPARE:
      case ActionType.ACTION_THROW:
      case ActionType.ACTION_CASTOP:
      case ActionType.ACTION_IMPLEMENTSOP:
      case ActionType.ACTION_RANDOM:
      case ActionType.ACTION_MBLENGTH:
      case ActionType.ACTION_ORD:
      case ActionType.ACTION_CHR:
      case ActionType.ACTION_GETTIMER:
      case ActionType.ACTION_MBSUBSTRING:
      case ActionType.ACTION_MBORD:
      case ActionType.ACTION_MBCHR:
      case ActionType.ACTION_DELETE:
      case ActionType.ACTION_DELETE2:
      case ActionType.ACTION_DEFINELOCAL:
      case ActionType.ACTION_CALLFUNCTION:
      case ActionType.ACTION_RETURN:
      case ActionType.ACTION_MODULO:
      case ActionType.ACTION_NEW:
      case ActionType.ACTION_VAR:
      case ActionType.ACTION_INITARRAY:
      case ActionType.ACTION_INITOBJECT:
      case ActionType.ACTION_TYPEOF:
      case ActionType.ACTION_TARGETPATH:
      case ActionType.ACTION_ENUMERATE:
      case ActionType.ACTION_NEWADD:
      case ActionType.ACTION_NEWLESSTHAN:
      case ActionType.ACTION_NEWEQUALS:
      case ActionType.ACTION_TONUMBER:
      case ActionType.ACTION_TOSTRING:
      case ActionType.ACTION_DUP:
      case ActionType.ACTION_SWAP:
      case ActionType.ACTION_GETMEMBER:
      case ActionType.ACTION_SETMEMBER:
      case ActionType.ACTION_INCREMENT:
      case ActionType.ACTION_DECREMENT:
      case ActionType.ACTION_CALLMETHOD:
      case ActionType.ACTION_NEWMETHOD:
      case ActionType.ACTION_INSTANCEOF:
      case ActionType.ACTION_ENUM2:
      case ActionType.EA_ACTION56:
      case ActionType.EA_ACTION58:
      case ActionType.EA_PUSHZERO:
      case ActionType.EA_PUSHONE:
      case ActionType.EA_CALLFUNCTIONPOP:
      case ActionType.EA_CALLFUNCTION:
      case ActionType.EA_CALLMETHODPOP:
      case ActionType.EA_CALLMETHOD:
      case ActionType.ACTION_BITWISEAND:
      case ActionType.ACTION_BITWISEOR:
      case ActionType.ACTION_BITWISEXOR:
      case ActionType.ACTION_SHIFTLEFT:
      case ActionType.ACTION_SHIFTRIGHT:
      case ActionType.ACTION_SHIFTRIGHT2:
      case ActionType.ACTION_STRICTEQ:
      case ActionType.ACTION_GREATER:
      case ActionType.ACTION_STRINGGREATER:
      case ActionType.ACTION_EXTENDS:
      case ActionType.EA_PUSHTHIS:
      case ActionType.EA_PUSHGLOBAL:
      case ActionType.EA_ZEROVARIABLE:
      case ActionType.EA_PUSHTRUE:
      case ActionType.EA_PUSHFALSE:
      case ActionType.EA_PUSHNULL:
      case ActionType.EA_PUSHUNDEFINED:
      case ActionType.EA_ACTION77:
      case ActionType.ACTION_WAITFORFRAME:
      case ActionType.ACTION_WAITFORFRAMEEXPRESSION:
      case ActionType.ACTION_TRY:
      case ActionType.ACTION_GETURL2:
      case ActionType.ACTION_CALLFRAME:
        currentOffset++;
        script.push({ type: ActionType[type] });
        break;
      case ActionType.ACTION_GOTOFRAME:
      case ActionType.ACTION_SETREGISTER:
      case ActionType.ACTION_BRANCHALWAYS:
      case ActionType.ACTION_BRANCHIFTRUE:
      case ActionType.ACTION_GOTOEXPRESSION:
      case ActionType.EA_BRANCHIFFALSE:
        currentOffset = roundUp(currentOffset + 1, 4);
        const singleInt32Arg = singleInt32ArgStruct.parse(view, currentOffset);
        currentOffset += 4;
        script.push({
          type: ActionType[type],
          ...singleInt32Arg,
        });
        break;
      case ActionType.ACTION_GETURL:
        currentOffset = roundUp(currentOffset + 1, 4);
        const str1 = getString(view, view.getUint32(currentOffset, true));
        currentOffset += 4;
        const str2 = getString(view, view.getUint32(currentOffset, true));
        currentOffset += 4;
        script.push({
          type: ActionType[type],
          str1,
          str2,
        });
        currentOffset++;
        break;
      case ActionType.ACTION_CONSTANTPOOL:
        currentOffset = roundUp(currentOffset + 1, 4);
        const constantPool = constantPoolStruct.parse(view, currentOffset);
        currentOffset += 8;
        script.push({
          type: ActionType[type],
          ...constantPool,
        });
        break;
      case ActionType.ACTION_SETTARGET:
      case ActionType.ACTION_GOTOLABEL:
      case ActionType.ACTION_WITH:
      case ActionType.EA_PUSHSTRING:
      case ActionType.EA_GETSTRINGVAR:
      case ActionType.EA_GETSTRINGMEMBER:
      case ActionType.EA_SETSTRINGVAR:
      case ActionType.EA_SETSTRINGMEMBER:
        currentOffset = roundUp(currentOffset + 1, 4);
        const singleStringArg = singleStringArgStruct.parse(view, currentOffset);
        currentOffset += 4;
        script.push({
          type: ActionType[type],
          ...singleStringArg,
        });
        break;
      case ActionType.ACTION_DEFINEFUNCTION2:
        currentOffset = roundUp(currentOffset + 1, 4);
        const defineFunction2 = defineFunction2Struct.parse(view, currentOffset);
        currentOffset += 16;
        const defineFunction2Script = parseActionScript(
          view,
          currentOffset,
          data,
          defineFunction2.size as unknown as number,
        );
        currentOffset += defineFunction2Script.byteSize + 12;
        script.push({
          type: ActionType[type],
          ...defineFunction2,
          body: defineFunction2Script.result,
        });
        break;
      case ActionType.ACTION_PUSHDATA:
        currentOffset = roundUp(currentOffset + 1, 4);
        const pushData = pushDataStruct.parse(view, currentOffset);
        currentOffset += 8;
        script.push({
          type: ActionType[type],
          ...pushData,
        });
        break;
      case ActionType.ACTION_DEFINEFUNCTION:
        currentOffset = roundUp(currentOffset + 1, 4);
        const defineFunction = defineFunctionStruct.parse(view, currentOffset);
        currentOffset += 24;
        const defineFunctionScript = parseActionScript(
          view,
          currentOffset,
          data,
          defineFunction.size as unknown as number,
        );
        currentOffset += defineFunctionScript.byteSize;
        script.push({
          type: ActionType[type],
          ...defineFunction,
          body: defineFunctionScript.result,
        });
        break;
      case ActionType.EA_PUSHWORDCONSTANT:
      case ActionType.EA_PUSHSHORT:
        const singleUint16Arg = singleUint16ArgStruct.parse(view, currentOffset + 1);
        currentOffset += 2;
        script.push({
          type: ActionType[type],
          ...singleUint16Arg,
        });
        break;
      case ActionType.EA_PUSHCONSTANT:
      case ActionType.EA_PUSHVALUEOFVAR:
      case ActionType.EA_GETNAMEDMEMBER:
      case ActionType.EA_CALLNAMEDFUNCTIONPOP:
      case ActionType.EA_CALLNAMEDFUNCTION:
      case ActionType.EA_CALLNAMEDMETHODPOP:
      case ActionType.EA_CALLNAMEDMETHOD:
      case ActionType.EA_PUSHBYTE:
      case ActionType.EA_PUSHREGISTER:
        const singleUint8Arg = singleUint8ArgStruct.parse(view, currentOffset + 1);
        currentOffset += 2;
        script.push({
          type: ActionType[type],
          ...singleUint8Arg,
        });
        break;
      case ActionType.EA_PUSHFLOAT:
        const singleFloatArg = singleFloatArgStruct.parse(view, currentOffset + 1);
        currentOffset += 5;
        script.push({
          type: ActionType[type],
          ...singleFloatArg,
        });
        break;
      case ActionType.EA_PUSHLONG:
        const singleUint32Arg = singleUint32ArgStruct.parse(view, currentOffset + 1);
        currentOffset += 5;
        script.push({
          type: ActionType[type],
          ...singleUint32Arg,
        });
        break;
      default:
        isEnd = true;
        break;
    }

    if (size === currentOffset - offset || type === ActionType.ACTION_END) {
      isEnd = true;
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
