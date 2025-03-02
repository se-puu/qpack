import { FixedData } from "../../lib/data-enum";
import { DataByte, Timestamp48, Timestamp64 } from "../../lib/size-enum";
import { QEncoder } from "../encoder";

export function encodeTimestampSync(encoder: QEncoder, value: Date): boolean {
    const milliseconds = value.getTime();
    if (milliseconds < Timestamp48.Max) {
        return encodeTimestamp48Sync(encoder, milliseconds);
    }
    return encodeTimestamp64Sync(encoder, milliseconds);
}
function encodeTimestamp48Sync(encoder: QEncoder, value: number): boolean {
    if (Timestamp48.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.UnixTime48);
    encoder.__bufferOffset += DataByte.Header;
    // wirte 48 bit number to encoder.buffer with little endian
    const lo = value >>> 0;
    const hi = (value / 4294967296) >>> 0;
    encoder.__view.setUint32(encoder.__bufferOffset, lo, true);
    encoder.__view.setUint16(encoder.__bufferOffset + 4, hi, true);
    encoder.__bufferOffset += Timestamp48.Size;
    return true;
}
function encodeTimestamp64Sync(encoder: QEncoder, value: number): boolean {
    if (Timestamp64.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.UnixTime64);
    encoder.__bufferOffset += DataByte.Header;
    // wirte 64 bit number to encoder.buffer
    encoder.__view.setBigUint64(encoder.__bufferOffset, BigInt(value), true);
    encoder.__bufferOffset += Timestamp64.Size;
    return true;
}