import { FixedData } from "../../lib/data-enum";
import { Binary16, Binary24, Binary32, Binary8 } from "../../lib/size-enum";
import { QEncoder } from "../encoder";

/* @__INLINE__ */
export function encodeArrayBufferSync(encoder: QEncoder, buf: ArrayBuffer): boolean {
    const data=new Uint8Array(buf);
    if(Binary8.Max >= data.length) {
        return encodeBinary8Sync(encoder, data);
    }else if(Binary16.Max >= data.length) {
        return encodeBinary16Sync(encoder, data);
    }else if(Binary24.Max >= data.length) {
        return encodeBinary24Sync(encoder, data);
    }else if(Binary32.Max >= data.length) {
        return encodeBinary32Sync(encoder, data);
    }
    return false;
}

/* @__INLINE__ */
export function encodeUint8Sync(encoder: QEncoder, data: Uint8Array): boolean {
    if(Binary8.Max >= data.length) {
        return encodeBinary8Sync(encoder, data);
    }else if(Binary16.Max >= data.length) {
        return encodeBinary16Sync(encoder, data);
    }else if(Binary24.Max >= data.length) {
        return encodeBinary24Sync(encoder, data);
    }else if(Binary32.Max >= data.length) {
        return encodeBinary32Sync(encoder, data);
    }
    return false;
}

/* @__INLINE__ */
export function encodeBinarySync(encoder: QEncoder, _data: Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array | DataView): boolean {
    const data=new Uint8Array(_data.buffer,_data.byteOffset,_data.byteLength);
    if(Binary8.Max >= data.length) {
        return encodeBinary8Sync(encoder, data);
    }else if(Binary16.Max >= data.length) {
        return encodeBinary16Sync(encoder, data);
    }else if(Binary24.Max >= data.length) {
        return encodeBinary24Sync(encoder, data);
    }else if(Binary32.Max >= data.length) {
        return encodeBinary32Sync(encoder, data);
    }
    return false;
}

/* @__INLINE__ */
function encodeBinary8Sync(encoder: QEncoder, data: Uint8Array): boolean {
    const requiredSize = Binary8.TSize + data.length;
    if (requiredSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand(requiredSize);
    }
    encoder.__view.setUint8(encoder.__bufferOffset++, FixedData.Binary8);
    encoder.__view.setUint8(encoder.__bufferOffset, data.length);
    encoder.__bufferOffset+=Binary8.Size;
    encoder.__buffer.set(data, encoder.__bufferOffset);
    encoder.__bufferOffset += data.length;
    return true;
}

/* @__INLINE__ */
function encodeBinary16Sync(encoder: QEncoder, data: Uint8Array): boolean {
    const requiredSize = Binary16.TSize + data.length;
    if (requiredSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand(requiredSize);
    }
    encoder.__view.setUint8(encoder.__bufferOffset++, FixedData.Binary16);
    encoder.__view.setUint16(encoder.__bufferOffset, data.length,true);
    encoder.__bufferOffset += Binary16.Size;
    encoder.__buffer.set(data, encoder.__bufferOffset);
    encoder.__bufferOffset += data.length;
    return true;
}

/* @__INLINE__ */
function encodeBinary24Sync(encoder: QEncoder, data: Uint8Array): boolean {
    const requiredSize = Binary24.TSize + data.length;
    if (requiredSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand(requiredSize);
    }
    encoder.__view.setUint8(encoder.__bufferOffset++, FixedData.Binary24);
    encoder.__view.setUint32(encoder.__bufferOffset, data.length,true);
    encoder.__bufferOffset += Binary24.Size;
    encoder.__buffer.set(data, encoder.__bufferOffset);
    encoder.__bufferOffset += data.length;
    return true;
}

/* @__INLINE__ */
function encodeBinary32Sync(encoder: QEncoder, data: Uint8Array): boolean {
    const requiredSize = Binary32.TSize + data.length;
    if (requiredSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand(requiredSize);
    }
    encoder.__view.setUint8(encoder.__bufferOffset++, FixedData.Binary32);
    encoder.__view.setUint32(encoder.__bufferOffset, data.length,true);
    encoder.__bufferOffset += Binary32.Size;
    encoder.__buffer.set(data, encoder.__bufferOffset);
    encoder.__bufferOffset += data.length;
    return true;
}