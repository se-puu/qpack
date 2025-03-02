import { RangedData, FixedData } from "../../lib/data-enum";
import { Array16, Array24, Array32, Array5, Array8, DataByte } from "../../lib/size-enum";
import { encodeSync } from "../encode-sync";
import { QEncoder } from "../encoder";
import { Encodeable } from "../handler-map";
import { encodeNull3Sync } from "./null";

/**
 * encode array data into buffer synchronously
 * @param encoder encode instance
 * @param value encodeable data array.
 * @returns {boolean} return status of encode operation
 */
export function encodeArraySync(encoder: QEncoder, value: Encodeable[]): boolean {
    if(Array5.Max >= value.length) {
        return encodeArray5Sync(encoder, value);
    }else if(Array8.Max >= value.length) {
        return encodeArray8Sync(encoder, value);
    }else if(Array16.Max >= value.length) {
        return encodeArray16Sync(encoder, value);
    }else if(Array24.Max >= value.length) {
        return encodeArray24Sync(encoder, value);
    }
    return encodeArray32Sync(encoder, value);
}

/*@__INLINE__*/
function encodeArray5Sync(encoder: QEncoder, value: Encodeable[]): boolean {
    if(Array5.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, RangedData.Array5_Start | value.length);
    encoder.__bufferOffset += Array5.Size;
    return value.length > 0 ? encodeArrayValueSync(encoder, value) : true;
}

/*@__INLINE__*/
function encodeArray8Sync(encoder: QEncoder, value: Encodeable[]): boolean {
    if(Array8.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Array8);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setUint8(encoder.__bufferOffset, value.length);
    encoder.__bufferOffset += Array8.Size;
    return encodeArrayValueSync(encoder, value);
}

/*@__INLINE__*/
function encodeArray16Sync(encoder: QEncoder, value: Encodeable[]): boolean {
    if(Array16.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Array16);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setUint16(encoder.__bufferOffset, value.length,true);
    encoder.__bufferOffset += Array16.Size;
    return encodeArrayValueSync(encoder, value);
}

/*@__INLINE__*/
function encodeArray24Sync(encoder: QEncoder, value: Encodeable[]): boolean {
    if(Array24.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Array24);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__buffer[encoder.__bufferOffset] = value.length & 0xff;
    encoder.__buffer[encoder.__bufferOffset + 1] = (value.length >> 8) & 0xff;
    encoder.__buffer[encoder.__bufferOffset + 2] = (value.length >> 16) & 0xff;
    encoder.__bufferOffset += Array24.Size;
    return encodeArrayValueSync(encoder, value);
}

/*@__INLINE__*/
function encodeArray32Sync(encoder: QEncoder, value: Encodeable[]): boolean {
    if(Array32.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Array32);
    encoder.__bufferOffset += DataByte.Header;
    encoder.__view.setUint32(encoder.__bufferOffset, value.length,true);
    encoder.__bufferOffset += Array32.Size;
    return encodeArrayValueSync(encoder, value);
}

/*@__INLINE__*/
function encodeArrayValueSync(encoder: QEncoder, value: Encodeable[]): boolean {
    for(let i = 0; i < value.length; i++) {
        if(!encodeSync(encoder, value[i] as Encodeable)){
            encodeNull3Sync(encoder);
        }
    }
    return true;
}