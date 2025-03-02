import { RangedData, FixedData } from "../../lib/data-enum";
import { String16, String24, String32, String5, String8 } from "../../lib/size-enum";
import { QEncoder } from "../encoder";

/*@__INLINE__*/
export function encodeStringSync(encoder: QEncoder, data: string): boolean {
    const estimatedLen = data.length * 4;
    if (String5.Max >= estimatedLen) {
        return encodeString5Sync(encoder, data, estimatedLen);
    } else if (String8.Max >= estimatedLen) {
        return encodeString8Sync(encoder, data, estimatedLen);
    } else if (String16.Max >= estimatedLen) {
        return encodeString16Sync(encoder, data, estimatedLen);;
    } else if (String24.Max >= estimatedLen) {
        return encodeString24Sync(encoder, data, estimatedLen);;
    } else if (String32.Max >= estimatedLen) {
        return encodeString32Sync(encoder, data, estimatedLen);;
    }
    return false;
}

/*@__INLINE__*/
function encodeString5Sync(encoder: QEncoder, data: string, estimatedLen: number): boolean {
    const requiredSize = String5.TSize + estimatedLen;
    if (requiredSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand();
    }
    const written = encodeInto(encoder.__buffer, encoder.__bufferOffset + String5.TSize, data);
    if (written === -1) {
        return false;
    }
    encoder.__view.setUint8(encoder.__bufferOffset, RangedData.String5_Start | written);
    encoder.__bufferOffset += String5.TSize + written;
    return true;
}

/*@__INLINE__*/
function encodeString8Sync(encoder: QEncoder, data: string, estimatedLen: number): boolean {
    const requiredSize = String8.TSize + estimatedLen;
    if (requiredSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand(requiredSize);
    }
    const written = encodeInto(encoder.__buffer, encoder.__bufferOffset + String8.TSize, data);
    if (written === -1) {
        return false;
    }
    encoder.__view.setUint8(encoder.__bufferOffset++, FixedData.String8);
    encoder.__view.setUint8(encoder.__bufferOffset, written);
    encoder.__bufferOffset += String8.Size + written;
    return true;
}

/*@__INLINE__*/
function encodeString16Sync(encoder: QEncoder, data: string, estimatedLen: number): boolean {
    const requiredSize = String16.TSize + estimatedLen;
    if (requiredSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand(requiredSize);
    }
    let { written } = encoder.__encoder.encodeInto(data, encoder.__buffer.subarray(encoder.__bufferOffset + String16.TSize));
    if (written === 0) {
        written = encodeInto(encoder.__buffer, encoder.__bufferOffset + String16.TSize, data);
        if(written === -1){
            return false;
        }
    }
    encoder.__view.setUint8(encoder.__bufferOffset++, FixedData.String16);
    encoder.__view.setUint16(encoder.__bufferOffset, written, true);
    encoder.__bufferOffset += String16.Size + written;
    return true;
}

/*@__INLINE__*/
function encodeString24Sync(encoder: QEncoder, data: string, estimatedLen: number): boolean {
    const requiredSize = String24.TSize + estimatedLen;
    if (requiredSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand(requiredSize);
    }
    let { written } = encoder.__encoder.encodeInto(data, encoder.__buffer.subarray(encoder.__bufferOffset + String24.TSize));
    if (written === 0) {
        written = encodeInto(encoder.__buffer, encoder.__bufferOffset + String24.TSize, data);
        if(written === -1){
            return false;
        }
    }
    encoder.__view.setUint8(encoder.__bufferOffset++, FixedData.String24);
    // write little endian 24 bit length
    encoder.__buffer[encoder.__bufferOffset] = written & 0xff;
    encoder.__buffer[encoder.__bufferOffset + 1] = (written >> 8) & 0xff;
    encoder.__buffer[encoder.__bufferOffset + 2] = (written >> 16) & 0xff;
    encoder.__bufferOffset += String24.Size + written;
    return true;
}

/*@__INLINE__*/
function encodeString32Sync(encoder: QEncoder, data: string, estimatedLen: number): boolean {
    const requiredSize = String32.TSize + estimatedLen;
    if (requiredSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand(requiredSize);
    }
    let { written } = encoder.__encoder.encodeInto(data, encoder.__buffer.subarray(encoder.__bufferOffset + String32.TSize));
    if (written === 0) {
        written = encodeInto(encoder.__buffer, encoder.__bufferOffset + String32.TSize, data);
        if(written === -1){
            return false;
        }
    }
    encoder.__view.setUint8(encoder.__bufferOffset++, FixedData.String32);
    encoder.__view.setUint32(encoder.__bufferOffset, written, true);
    encoder.__bufferOffset += String32.Size + written;
    return true;
}

/*@__INLINE__*/
function encodeInto(buffer: Uint8Array, dataOffset: number, data: string): number {
    // encode utf8 string from js string by js implementation by looping
    let offset = dataOffset;
    for (let i = 0; i < data.length; i++) {
        const codePoint = data.codePointAt(i);
        if (codePoint === undefined) {
            return -1;
        }
        if (codePoint <= 0x7F) {
            buffer[offset++] = codePoint;
        } else if (codePoint <= 0x7FF) {
            buffer[offset++] = 0xC0 | (codePoint >> 6);
            buffer[offset++] = 0x80 | (codePoint & 0x3F);
        } else if (codePoint <= 0xFFFF) {
            buffer[offset++] = 0xE0 | (codePoint >> 12);
            buffer[offset++] = 0x80 | ((codePoint >> 6) & 0x3F);
            buffer[offset++] = 0x80 | (codePoint & 0x3F);
        } else {
            buffer[offset++] = 0xF0 | (codePoint >> 18);
            buffer[offset++] = 0x80 | ((codePoint >> 12) & 0x3F);
            buffer[offset++] = 0x80 | ((codePoint >> 6) & 0x3F);
            buffer[offset++] = 0x80 | (codePoint & 0x3F);
            i++; // skip the next code unit
        }
    }
    return offset - dataOffset;
}