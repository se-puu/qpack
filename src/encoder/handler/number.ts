import { RangedData, FixedData } from "../../lib/data-enum";
import { DataByte, Float32, Float64, Int16, Int24, Int32, Int40, Int48, IntSafe, Int8, Nint5, Uint6, Uint8, Uint16, Uint24, Uint32, Uint40, Uint48 } from "../../lib/size-enum";
import { QAsyncEncoder, QEncoder } from "../encoder";
import { encodeNull3Sync } from "./null";

export function encodeNumberSync(encoder: QEncoder, data: number): boolean {
    //TODO implement encoder for Uint6
    if (Number.isInteger(data) && Number.isSafeInteger(data)) {
        // int
        return encodeIntegerSync(encoder, data);
    } else if (!Number.isFinite(data)) {
        // Nan
        return encodeNull3Sync(encoder);
    }
    // float
    return encodeFloatSync(encoder, data);
}

//eslint-disable-next-line
export function encodeNumberStream(encoder: QAsyncEncoder, data: number): boolean {
    return true;
}

/*@__INLINE__*/
function encodeIntegerSync(encoder: QEncoder, data: number): boolean {
    if (data < 0) {
        // negative
        if (Nint5.Min <= data) {
            return encodeNint5Sync(encoder, data);
        }else if (Int8.Min <= data) {
            return encodeInt8Sync(encoder, data);
        }else if(Int16.Min <= data){
            return encodeInt16Sync(encoder, data);
        }else if(Int24.Min <= data){
            return encodeInt24Sync(encoder, data);
        }else if(Int32.Min <= data){
            return encodeInt32Sync(encoder, data);
        }else if(Int40.Min <= data){
            return encodeInt40Sync(encoder, data);
        }else if(Int48.Min <= data){
            return encodeInt48Sync(encoder, data);
        }
    } else {
        // positive
        if (Uint6.Max >= data) {
            // uint6
            return encodeUint6Sync(encoder, data);
        }else if(Uint8.Max >= data){
            return encodeUint8Sync(encoder, data);
        }else if(Uint16.Max >= data){
            return encodeUint16Sync(encoder, data);
        }else if(Uint24.Max >= data){
            return encodeUint24Sync(encoder, data);
        }else if(Uint32.Max >= data){
            return encodeUint32Sync(encoder, data);
        }else if(Uint40.Max >= data){
            return encodeUint40Sync(encoder, data);
        }else if(Uint48.Max >= data){
            return encodeUint48Sync(encoder, data);
        }
    }
    return encodeIntSafe(encoder, data);
}

/*@__INLINE__*/
function encodeNint5Sync(encoder: QEncoder, data: number): boolean {
    if (Nint5.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, RangedData.Nint5_Start | Math.abs(data));
    encoder.__bufferOffset++;
    return true;
}

/*@__INLINE__*/
function encodeInt8Sync(encoder: QEncoder, data: number): boolean {
    if (Int8.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setInt8(encoder.__bufferOffset, FixedData.Int8);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setInt8(encoder.__bufferOffset, data);
    encoder.__bufferOffset+=Int8.Size;
    return true;
}

/*@__INLINE__*/
function encodeInt16Sync(encoder: QEncoder, data: number): boolean {
    if (Int16.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setInt8(encoder.__bufferOffset, FixedData.Int16);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setInt16(encoder.__bufferOffset, data,true);
    encoder.__bufferOffset += Int16.Size;
    return true;
}

/*@__INLINE__*/
function encodeInt24Sync(encoder: QEncoder, data: number): boolean {
    if (Int24.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setInt8(encoder.__bufferOffset, FixedData.Int24);
    encoder.__bufferOffset += DataByte.Header;
    // with index
    encoder.__buffer[encoder.__bufferOffset] = data & 0xFF;
    encoder.__buffer[encoder.__bufferOffset + 1] = (data >> 8) & 0xFF;
    encoder.__buffer[encoder.__bufferOffset + 2] = (data >> 16) & 0xFF;
    encoder.__bufferOffset += Int24.Size;
    return true;
}

/*@__INLINE__*/
function encodeInt32Sync(encoder: QEncoder, data: number): boolean {
    if (Int32.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setInt8(encoder.__bufferOffset, FixedData.Int32);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setInt32(encoder.__bufferOffset, data,true);
    encoder.__bufferOffset += Int32.Size;
    return true;
}

/*@__INLINE__*/
function encodeInt40Sync(encoder: QEncoder, data: number): boolean {
    if (Int40.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setInt8(encoder.__bufferOffset, FixedData.Int40);
    encoder.__bufferOffset += DataByte.Header;
    // with index
    const signed = BigInt.asIntN(40, BigInt(data));
    const n = BigInt.asUintN(40, signed);
    encoder.__buffer[encoder.__bufferOffset] = Number(n & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 1] = Number((n >> 8n) & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 2] = Number((n >> 16n) & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 3] = Number((n >> 24n) & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 4] = Number((n >> 32n) & 0xffn);
    encoder.__bufferOffset += Int40.Size;
    return true;
}

/*@__INLINE__*/
function encodeInt48Sync(encoder: QEncoder, data: number): boolean {
    if (Int48.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setInt8(encoder.__bufferOffset, FixedData.Int48);
    encoder.__bufferOffset += DataByte.Header;
    // with index
    const signed = BigInt.asIntN(48, BigInt(data));
    const n = BigInt.asUintN(48, signed);
    encoder.__buffer[encoder.__bufferOffset] = Number(n & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 1] = Number((n >> 8n) & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 2] = Number((n >> 16n) & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 3] = Number((n >> 24n) & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 4] = Number((n >> 32n) & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 5] = Number((n >> 40n) & 0xffn);
    encoder.__bufferOffset += Int48.Size;
    return true;
}

/*@__INLINE__*/
function encodeIntSafe(encoder: QEncoder, data: number): boolean {
    if (IntSafe.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setInt8(encoder.__bufferOffset, FixedData.IntSafe);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setBigInt64(encoder.__bufferOffset, BigInt(data),true);
    encoder.__bufferOffset += IntSafe.Size;
    return true;
}

/*@__INLINE__*/
function encodeUint6Sync(encoder: QEncoder, data: number): boolean {
    if (Uint6.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, data);
    encoder.__bufferOffset++;
    return true;
}

/*@__INLINE__*/
function encodeUint8Sync(encoder: QEncoder, data: number): boolean {
    if (Uint8.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Uint8);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setUint8(encoder.__bufferOffset, data);
    encoder.__bufferOffset += Uint8.Size;
    return true;
}

/*@__INLINE__*/
function encodeUint16Sync(encoder: QEncoder, data: number): boolean {
    if (Uint16.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Uint16);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setUint16(encoder.__bufferOffset, data,true);
    encoder.__bufferOffset += Uint16.Size;
    return true;
}

/*@__INLINE__*/
function encodeUint24Sync(encoder: QEncoder, data: number): boolean {
    if (Uint24.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Uint24);
    encoder.__bufferOffset += DataByte.Header;
    // with index
    encoder.__buffer[encoder.__bufferOffset] = data & 0xFF;
    encoder.__buffer[encoder.__bufferOffset + 1] = (data >> 8) & 0xFF;
    encoder.__buffer[encoder.__bufferOffset + 2] = (data >> 16) & 0xFF;
    encoder.__bufferOffset += Uint24.Size;
    return true;
}

/*@__INLINE__*/
function encodeUint32Sync(encoder: QEncoder, data: number): boolean {
    if (Uint32.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Uint32);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setUint32(encoder.__bufferOffset, data,true);
    encoder.__bufferOffset += Uint32.Size;
    return true;
}

/*@__INLINE__*/
function encodeUint40Sync(encoder: QEncoder, data: number): boolean {
    if (Uint40.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Uint40);
    encoder.__bufferOffset += DataByte.Header;
    // with index
    encoder.__buffer[encoder.__bufferOffset] = data & 0xFF;
    encoder.__buffer[encoder.__bufferOffset + 1] = (data >> 8) & 0xFF;
    encoder.__buffer[encoder.__bufferOffset + 2] = (data >> 16) & 0xFF;
    encoder.__buffer[encoder.__bufferOffset + 3] = (data >> 24) & 0xFF;
    encoder.__buffer[encoder.__bufferOffset + 4] = Math.floor(data / 0x100000000) & 0xFF;
    encoder.__bufferOffset += Uint40.Size;
    return true;
}

/*@__INLINE__*/
function encodeUint48Sync(encoder: QEncoder, data: number): boolean {
    if (Uint48.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Uint48);
    encoder.__bufferOffset += DataByte.Header;
    // with index
    const n = BigInt(data);
    encoder.__buffer[encoder.__bufferOffset] = Number(n & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 1] = Number((n >> 8n) & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 2] = Number((n >> 16n) & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 3] = Number((n >> 24n) & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 4] = Number((n >> 32n) & 0xffn);
    encoder.__buffer[encoder.__bufferOffset + 5] = Number((n >> 40n) & 0xffn);
    encoder.__bufferOffset += Uint48.Size;
    return true;
}

/*@__INLINE__*/
function encodeFloatSync(encoder: QEncoder, data: number): boolean {
    // if (data >=Float32.Min && data <= Float32.Max) {
    //     return encodeFloat32Sync(encoder, data);
    // }
    return encodeFloat64Sync(encoder, data);
}

/*@__INLINE__*/
//eslint-disable-next-line
function encodeFloat32Sync(encoder: QEncoder, data: number): boolean {
    if (Float32.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Float32);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setFloat32(encoder.__bufferOffset, data,true);
    encoder.__bufferOffset += Float32.Size;
    return true;
}

/*@__INLINE__*/
function encodeFloat64Sync(encoder: QEncoder, data: number): boolean {
    if (Float64.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Float64);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setFloat64(encoder.__bufferOffset, data,true);
    encoder.__bufferOffset += Float64.Size;
    return true;
}