import { DataByte, String16, String24, String32, String5, String8 } from "../../lib/size-enum";
import { QDecoder } from "../decoder";

export function decodeString5Sync(decoder: QDecoder): string {
    const length = decoder.__buffer[decoder.__bufferOffset++] & String5.Max;
    if (length === DataByte.Null) {
        return "";
    }
    // const subarray = decoder.buffer.subarray(decoder.offset, decoder.offset + length);
    // decoder.offset += length;
    // return decoder.__decoder.decode(subarray);
    decoder.__bufferOffset += length;
    return decodeUTF8String(decoder.__buffer, decoder.__bufferOffset - length, length);
}
export function decodeString8Sync(decoder: QDecoder): string {
    decoder.__bufferOffset += DataByte.Header;
    const length = decoder.__view.getUint8(decoder.__bufferOffset);
    decoder.__bufferOffset += String8.Size;
    if (length === DataByte.Null) {
        return "";
    }
    // const subarray = decoder.buffer.subarray(decoder.offset, decoder.offset + length);
    // decoder.offset += length;
    // return decoder.__decoder.decode(subarray);
    decoder.__bufferOffset += length;
    return decodeUTF8String(decoder.__buffer,decoder.__bufferOffset-length,length);
}
export function decodeString16Sync(decoder: QDecoder): string {
    decoder.__bufferOffset += DataByte.Header;
    const length = decoder.__view.getUint16(decoder.__bufferOffset, true);
    decoder.__bufferOffset += String16.Size;
    if (length === DataByte.Null) {
        return "";
    }
    const subarray = decoder.__buffer.subarray(decoder.__bufferOffset, decoder.__bufferOffset + length);
    decoder.__bufferOffset += length;
    return decoder.__decoder.decode(subarray);
}
export function decodeString24Sync(decoder: QDecoder): string {
    decoder.__bufferOffset += DataByte.Header;
    const length = decoder.__buffer[decoder.__bufferOffset] | (decoder.__buffer[decoder.__bufferOffset + 1] << 8) | (decoder.__buffer[decoder.__bufferOffset + 2] << 16);
    decoder.__bufferOffset += String24.Size;
    if (length === DataByte.Null) {
        return "";
    }
    const subarray = decoder.__buffer.subarray(decoder.__bufferOffset, decoder.__bufferOffset + length);
    decoder.__bufferOffset += length;
    return decoder.__decoder.decode(subarray);
}
export function decodeString32Sync(decoder: QDecoder): string {
    decoder.__bufferOffset += DataByte.Header;
    const length = decoder.__view.getUint32(decoder.__bufferOffset, true);
    decoder.__bufferOffset += String32.Size;
    if (length === DataByte.Null) {
        return "";
    }
    const subarray = decoder.__buffer.subarray(decoder.__bufferOffset, decoder.__bufferOffset + length);
    decoder.__bufferOffset += length;
    return decoder.__decoder.decode(subarray);
}

/*@__INLINE__*/
function decodeUTF8String(bytes: Uint8Array, inputOffset: number, byteLength: number): string {
    let offset = inputOffset;
    const end = offset + byteLength;

    const units: Array<number> = [];
    while (offset < end) {
        const byte1 = bytes[offset++]!;
        if ((byte1 & 0x80) === 0) {
            // 1 byte
            units.push(byte1);
        } else if ((byte1 & 0xe0) === 0xc0) {
            // 2 bytes
            const byte2 = bytes[offset++]! & 0x3f;
            units.push(((byte1 & 0x1f) << 6) | byte2);
        } else if ((byte1 & 0xf0) === 0xe0) {
            // 3 bytes
            const byte2 = bytes[offset++]! & 0x3f;
            const byte3 = bytes[offset++]! & 0x3f;
            units.push(((byte1 & 0x1f) << 12) | (byte2 << 6) | byte3);
        } else if ((byte1 & 0xf8) === 0xf0) {
            // 4 bytes
            const byte2 = bytes[offset++]! & 0x3f;
            const byte3 = bytes[offset++]! & 0x3f;
            const byte4 = bytes[offset++]! & 0x3f;
            let unit = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0c) | (byte3 << 0x06) | byte4;
            if (unit > 0xffff) {
                unit -= 0x10000;
                units.push(((unit >>> 10) & 0x3ff) | 0xd800);
                unit = 0xdc00 | (unit & 0x3ff);
            }
            units.push(unit);
        } else {
            units.push(byte1);
        }

    }
    return String.fromCharCode(...units);
}
