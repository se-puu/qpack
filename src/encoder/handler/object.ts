import { RangedData, FixedData } from "../../lib/data-enum";
import { DataByte, Object16, Object32, Object5, Object8 } from "../../lib/size-enum";
import { encodeSync } from "../encode-sync";
import { QEncoder } from "../encoder";
import { Encodeable } from "../handler-map";
import { encodeStringSync } from "./string";

type StringObject = { [key: string]: unknown };
export function encodeObjectSync(encoder: QEncoder, data: object): boolean {
    const keys = Object.keys(data);
    if (Object5.Max >= keys.length) {
        return encodeObject5Sync(encoder, data as StringObject, keys);
    } else if (Object8.Max >= keys.length) {
        return encodeObject8Sync(encoder, data as StringObject, keys);
    } else if (Object16.Max >= keys.length) {
        return encodeObject16Sync(encoder, data as StringObject, keys);
    }
    return encodeObject32Sync(encoder, data as StringObject, keys);
}

/*@__INLINE__*/
function encodeObject5Sync<T extends StringObject>(encoder: QEncoder, data: T, keys: (keyof T)[]): boolean {
    if (Object5.TSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand();
    }
    const tempOffset = encoder.__bufferOffset;
    encoder.__bufferOffset += DataByte.Header;
    if (keys.length === 0) {
        encoder.__view.setUint8(tempOffset, RangedData.Object5_Start);
        return true;
    }
    const objectLen = keys.length - encodeObjectValueSync(encoder, data, keys);
    encoder.__view.setUint8(tempOffset, RangedData.Object5_Start | objectLen);
    return true;
}

/*@__INLINE__*/
function encodeObject8Sync<T extends StringObject>(encoder: QEncoder, data: T, keys: (keyof T)[]): boolean {
    if (Object8.TSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Object8);
    encoder.__bufferOffset += DataByte.Header;
    const tempOffset = encoder.__bufferOffset;
    encoder.__bufferOffset += Object8.Size;
    const objectLen = keys.length - encodeObjectValueSync(encoder, data, keys);
    encoder.__view.setUint8(tempOffset, objectLen);
    return true;
}

/*@__INLINE__*/
function encodeObject16Sync<T extends StringObject>(encoder: QEncoder, data: T, keys: (keyof T)[]): boolean {
    if (Object16.TSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Object16);
    encoder.__bufferOffset += DataByte.Header;
    const tempOffset = encoder.__bufferOffset;
    encoder.__bufferOffset += Object16.Size;
    const objectLen = keys.length - encodeObjectValueSync(encoder, data, keys);
    encoder.__view.setUint16(tempOffset, objectLen, true);
    return true;
}

/*@__INLINE__*/
function encodeObject32Sync<T extends StringObject>(encoder: QEncoder, data: T, keys: (keyof T)[]): boolean {
    if (Object32.TSize > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Object32);
    encoder.__bufferOffset += DataByte.Header;
    const tempOffset = encoder.__bufferOffset;
    encoder.__bufferOffset += Object32.Size;
    const objectLen = keys.length - encodeObjectValueSync(encoder, data, keys);
    encoder.__view.setUint32(tempOffset, objectLen, true);
    return true;
}

/*@__INLINE__*/
function encodeObjectValueSync<T extends StringObject>(encoder: QEncoder, data: T, keys: (keyof T)[]): number {
    let count = 0;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (typeof key === "string") {
            const value = data[key] as Encodeable;
            encodeStringSync(encoder, key);
            encodeSync(encoder, value);
        } else {
            count++;
        }
    }
    return count;
}