import { createStruct } from '../../struct/createStruct';

export const singleUint8ArgStruct = createStruct();
singleUint8ArgStruct.addMember('value').uint8();

export const singleUint16ArgStruct = createStruct();
singleUint16ArgStruct.addMember('value').uint16();

export const singleStringArgStruct = createStruct();
singleStringArgStruct.addMember('value').pointer().string();

export const singleUint32ArgStruct = createStruct();
singleUint32ArgStruct.addMember('value').uint32();

export const singleInt32ArgStruct = createStruct();
singleInt32ArgStruct.addMember('value').int32();

export const singleFloatArgStruct = createStruct();
singleFloatArgStruct.addMember('value').float32();

export const constantPoolStruct = createStruct();
constantPoolStruct.addMember('count').uint32();
constantPoolStruct.addMember('constants').pointer().array('count').uint32();

export const defineFunctionStruct = createStruct();
defineFunctionStruct.addMember('name').pointer().string();
defineFunctionStruct.addMember('count').uint32();
defineFunctionStruct.addMember('args').pointer().array('count').pointer().string();
defineFunctionStruct.addMember('size').uint32();
defineFunctionStruct.addMember('signature1').uint32();
defineFunctionStruct.addMember('signature2').uint32();

const defineFunction2ArgStruct = createStruct();
defineFunction2ArgStruct.addMember('reg').uint32();
defineFunction2ArgStruct.addMember('name').pointer().string();

export const defineFunction2Struct = createStruct();
defineFunction2Struct.addMember('name').pointer().string();
defineFunction2Struct.addMember('count').uint32();
defineFunction2Struct.addMember('flags').uint32();
defineFunction2Struct.addMember('args').pointer().array('count').struct(defineFunction2ArgStruct);
defineFunction2Struct.addMember('size').uint32();
defineFunction2Struct.addMember('signature1').uint32();
defineFunction2Struct.addMember('signature2').uint32();

export const pushDataStruct = createStruct();
pushDataStruct.addMember('count').uint32();
pushDataStruct.addMember('data').pointer().array('count').uint32();
