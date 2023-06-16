import { CustomCallback } from '../../struct/types';
import { roundUp, getString } from '../../utilities/utilities';
import { ActionType, ActionScriptCallback } from './types';
import * as Struct from './structs';

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
        const singleInt32Arg = Struct.singleInt32ArgStruct.parse(view, currentOffset);
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
        const constantPool = Struct.constantPoolStruct.parse(view, currentOffset);
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
        const singleStringArg = Struct.singleStringArgStruct.parse(view, currentOffset);
        currentOffset += 4;
        script.push({
          type: ActionType[type],
          ...singleStringArg,
        });
        break;
      case ActionType.ACTION_DEFINEFUNCTION2:
        currentOffset = roundUp(currentOffset + 1, 4);
        const defineFunction2 = Struct.defineFunction2Struct.parse(view, currentOffset);
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
        const pushData = Struct.pushDataStruct.parse(view, currentOffset);
        currentOffset += 8;
        script.push({
          type: ActionType[type],
          ...pushData,
        });
        break;
      case ActionType.ACTION_DEFINEFUNCTION:
        currentOffset = roundUp(currentOffset + 1, 4);
        const defineFunction = Struct.defineFunctionStruct.parse(view, currentOffset);
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
        const singleUint16Arg = Struct.singleUint16ArgStruct.parse(view, currentOffset + 1);
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
        const singleUint8Arg = Struct.singleUint8ArgStruct.parse(view, currentOffset + 1);
        currentOffset += 2;
        script.push({
          type: ActionType[type],
          ...singleUint8Arg,
        });
        break;
      case ActionType.EA_PUSHFLOAT:
        const singleFloatArg = Struct.singleFloatArgStruct.parse(view, currentOffset + 1);
        currentOffset += 5;
        script.push({
          type: ActionType[type],
          ...singleFloatArg,
        });
        break;
      case ActionType.EA_PUSHLONG:
        const singleUint32Arg = Struct.singleUint32ArgStruct.parse(view, currentOffset + 1);
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
