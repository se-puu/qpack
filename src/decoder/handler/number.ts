import { DataByte, Float32, Float64, Int16, Int24, Int32, Int40, Int48, Int8, Nint5 , Uint16, Uint24, Uint32, Uint40, Uint48, Uint8 } from "../../lib/size-enum";
import { QDecoder } from "../decoder";

export function decodeUint6Sync(decoder: QDecoder): number {
    const value = decoder.__buffer[decoder.__bufferOffset++];
    return value;
}

export function decodeNint5Sync(decoder: QDecoder): number {
    const value = decoder.__buffer[decoder.__bufferOffset++] & Nint5.Or;
    return -value;
}

export function decodeInt8Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = decoder.__view.getInt8(decoder.__bufferOffset);
    decoder.__bufferOffset += Int8.Size;
    return value;
}

export function decodeInt16Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = decoder.__view.getInt16(decoder.__bufferOffset, true);
    decoder.__bufferOffset += Int16.Size;
    return value;
}

export function decodeInt24Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const rawValue = decoder.__buffer[decoder.__bufferOffset] |
        (decoder.__buffer[decoder.__bufferOffset + 1] << 8) |
        (decoder.__buffer[decoder.__bufferOffset + 2] << 16);
    const value = (rawValue & 0x800000) !== 0 ? rawValue | 0xff000000 : rawValue;
    decoder.__bufferOffset += Int24.Size;
    return value;
}

export function decodeInt32Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = decoder.__view.getInt32(decoder.__bufferOffset, true);
    decoder.__bufferOffset += Int32.Size;
    return value;
}

export function decodeInt40Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;

    // Read signed 40-bit integer in little endian order using BigInt for proper sign handling
    const bigintValue =
        (BigInt(decoder.__buffer[decoder.__bufferOffset]) << 0n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 1]) << 8n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 2]) << 16n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 3]) << 24n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 4]) << 32n);
    const value = (bigintValue & 0x8000000000n)
        ? bigintValue - 0x10000000000n
        : bigintValue;
    decoder.__bufferOffset += Int40.Size;
    return Number(value);
}

export function decodeInt48Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    // by index
    const bigintValue =
        (BigInt(decoder.__buffer[decoder.__bufferOffset]) << 0n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 1]) << 8n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 2]) << 16n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 3]) << 24n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 4]) << 32n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 5]) << 40n);
    const value = (bigintValue & 0x800000000000n)
        ? bigintValue - 0x1000000000000n
        : bigintValue;
    decoder.__bufferOffset += Int48.Size;
    return Number(value);
}

export function decodeIntSafeSync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = decoder.__view.getBigInt64(decoder.__bufferOffset, true);
    decoder.__bufferOffset += DataByte.Eight;
    return Number(value);
}

export function decodeUint8Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = decoder.__buffer[decoder.__bufferOffset];
    decoder.__bufferOffset += Uint8.Size;
    return value;
}

export function decodeUint16Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = decoder.__view.getUint16(decoder.__bufferOffset, true);
    decoder.__bufferOffset += Uint16.Size;
    return value;
}

export function decodeUint24Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = decoder.__buffer[decoder.__bufferOffset] |
        (decoder.__buffer[decoder.__bufferOffset + 1] << 8) |
        (decoder.__buffer[decoder.__bufferOffset + 2] << 16);
    decoder.__bufferOffset += Uint24.Size;
    return value;
}

export function decodeUint32Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = decoder.__view.getUint32(decoder.__bufferOffset, true);
    decoder.__bufferOffset += Uint32.Size;
    return value;
}

export function decodeUint40Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = decoder.__view.getUint32(decoder.__bufferOffset, true) + (decoder.__buffer[decoder.__bufferOffset + 4] * 4294967296);
    decoder.__bufferOffset += Uint40.Size;
    return Number(value);
}

export function decodeUint48Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = (BigInt(decoder.__buffer[decoder.__bufferOffset]) << 0n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 1]) << 8n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 2]) << 16n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 3]) << 24n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 4]) << 32n) |
        (BigInt(decoder.__buffer[decoder.__bufferOffset + 5]) << 40n);
    decoder.__bufferOffset += Uint48.Size;
    return Number(value);
}

export function decodeFloat32Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = decoder.__view.getFloat32(decoder.__bufferOffset, true);
    decoder.__bufferOffset += Float32.Size;
    return value;
}

export function decodeFloat64Sync(decoder: QDecoder): number {
    decoder.__bufferOffset += DataByte.Header;
    const value = decoder.__view.getFloat64(decoder.__bufferOffset, true);
    decoder.__bufferOffset += Float64.Size;
    return value;
}