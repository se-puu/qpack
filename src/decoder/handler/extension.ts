import { DataByte, Extension16, Extension24, Extension32, Extension8 } from "../../lib/size-enum";
import { QDecoder } from "../decoder";

export function decodeExtension8Sync(decoder: QDecoder): unknown {
    decoder.__bufferOffset += DataByte.Header;
    const extCode = decoder.__view.getUint16(decoder.__bufferOffset, true);
    decoder.__bufferOffset += DataByte.Two;
    const ExtRegistryObj = decoder.__extRegistry.__ext[extCode];
    const dataSize = decoder.__view.getUint8(decoder.__bufferOffset);
    decoder.__bufferOffset += Extension8.Size;
    if (!ExtRegistryObj) {
        decoder.__bufferOffset += dataSize;
        return undefined;
    }
    const buffer = new Uint8Array(decoder.__buffer.buffer, decoder.__buffer.byteOffset + decoder.__bufferOffset, dataSize);
    decoder.__bufferOffset += dataSize;
    const subDecoder = QDecoder.create({extRegistry:decoder.__extRegistry});
    subDecoder.setBuffer(buffer);
    return ExtRegistryObj.decode(subDecoder);
}


export function decodeExtension16Sync(decoder: QDecoder): unknown {
    decoder.__bufferOffset += DataByte.Header;
    const extCode = decoder.__view.getUint16(decoder.__bufferOffset, true);
    decoder.__bufferOffset += DataByte.Two;
    const ExtRegistryObj = decoder.__extRegistry.__ext[extCode];
    const dataSize = decoder.__view.getUint16(decoder.__bufferOffset, true);
    decoder.__bufferOffset += Extension16.Size;
    if (!ExtRegistryObj) {
        decoder.__bufferOffset += dataSize;
        return undefined;
    }
    const buffer = new Uint8Array(decoder.__buffer.buffer, decoder.__buffer.byteOffset + decoder.__bufferOffset, dataSize);
    decoder.__bufferOffset += dataSize;
    const subDecoder = QDecoder.create({extRegistry:decoder.__extRegistry});
    subDecoder.setBuffer(buffer);
    return ExtRegistryObj.decode(subDecoder);
}


export function decodeExtension24Sync(decoder: QDecoder): unknown {
    decoder.__bufferOffset += DataByte.Header;
    const extCode = decoder.__view.getUint16(decoder.__bufferOffset, true);
    decoder.__bufferOffset += DataByte.Two;
    // read 24 bit number from decoder.buffer by index in little endian
    const dataSize =
        decoder.__buffer[decoder.__bufferOffset] |
        (decoder.__buffer[decoder.__bufferOffset + 1] << 8) |
        (decoder.__buffer[decoder.__bufferOffset + 2] << 16);
    decoder.__bufferOffset += Extension24.Size;
    const ExtRegistryObj = decoder.__extRegistry.__ext[extCode];
    if (!ExtRegistryObj) {
        decoder.__bufferOffset += dataSize;
        return undefined;
    }
    const buffer = new Uint8Array(decoder.__buffer.buffer, decoder.__buffer.byteOffset + decoder.__bufferOffset, dataSize);
    decoder.__bufferOffset += dataSize;
    const subDecoder = QDecoder.create({extRegistry:decoder.__extRegistry});
    subDecoder.setBuffer(buffer);
    return ExtRegistryObj.decode(subDecoder);
}

export function decodeExtension32Sync(decoder: QDecoder): unknown {
    decoder.__bufferOffset += DataByte.Header;
    const extCode = decoder.__view.getUint16(decoder.__bufferOffset, true);
    decoder.__bufferOffset += DataByte.Two;
    const ExtRegistryObj = decoder.__extRegistry.__ext[extCode];
    const dataSize = decoder.__view.getUint32(decoder.__bufferOffset, true);
    decoder.__bufferOffset += Extension32.Size;
    if (!ExtRegistryObj) {
        decoder.__bufferOffset += dataSize;
        return undefined;
    }
    const buffer = new Uint8Array(decoder.__buffer.buffer, decoder.__buffer.byteOffset + decoder.__bufferOffset, dataSize);
    decoder.__bufferOffset += dataSize;
    const subDecoder = QDecoder.create({extRegistry:decoder.__extRegistry});
    subDecoder.setBuffer(buffer);
    return ExtRegistryObj.decode(subDecoder);
}