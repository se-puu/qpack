import { Binary16, Binary24, Binary32, Binary8, DataByte } from "../../lib/size-enum";
import { QDecoder } from "../decoder";

export function decodeBinary8Sync(decoder: QDecoder): Uint8Array {
    decoder.__bufferOffset += DataByte.Header;
    const length = decoder.__view.getUint8(decoder.__bufferOffset);
    decoder.__bufferOffset += Binary8.Size;
    const data = new Uint8Array(decoder.__buffer.buffer, decoder.__buffer.byteOffset + decoder.__bufferOffset, length);
    decoder.__bufferOffset += length;
    return data;
}

export function decodeBinary16Sync(decoder: QDecoder): Uint8Array {
    decoder.__bufferOffset += DataByte.Header;
    const length = decoder.__view.getUint16(decoder.__bufferOffset, true);
    decoder.__bufferOffset += Binary16.Size;
    const data = new Uint8Array(decoder.__buffer.buffer, decoder.__buffer.byteOffset + decoder.__bufferOffset, length);
    decoder.__bufferOffset += length;
    return data;
}

export function decodeBinary24Sync(decoder: QDecoder): Uint8Array {
    decoder.__bufferOffset += DataByte.Header;
    const length = decoder.__buffer[decoder.__bufferOffset] | (decoder.__buffer[decoder.__bufferOffset + 1] << 8) | (decoder.__buffer[decoder.__bufferOffset + 2] << 16);
    decoder.__bufferOffset += Binary24.Size;
    const data = new Uint8Array(decoder.__buffer.buffer, decoder.__buffer.byteOffset + decoder.__bufferOffset, length);
    decoder.__bufferOffset += length;
    return data;
}

export function decodeBinary32Sync(decoder: QDecoder): Uint8Array {
    decoder.__bufferOffset += DataByte.Header;
    const length = decoder.__view.getUint32(decoder.__bufferOffset, true);
    decoder.__bufferOffset += Binary32.Size;
    const data = new Uint8Array(decoder.__buffer.buffer, decoder.__buffer.byteOffset + decoder.__bufferOffset, length);
    decoder.__bufferOffset += length;
    return data;
}