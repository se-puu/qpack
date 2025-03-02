import { FixedData } from "../../lib/data-enum";
import { ExtEntry } from "../../lib/ext-registry";
import { Extension16, Extension24, Extension32, Extension8 } from "../../lib/size-enum";
import { QEncoder } from "../encoder";


export function encodeExtensionSync(encoder: QEncoder, data: {constructor:ExtEntry<object>}): boolean {
    if (Extension32.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    const startOffset = encoder.__bufferOffset;
    encoder.__bufferOffset += Extension32.TSize;
    const dataOffset = encoder.__bufferOffset;
    data.constructor.encode(encoder, data);
    const dataSize = encoder.__bufferOffset - dataOffset;
    encoder.__view.setUint16(startOffset + 1, data.constructor.extCode, true);
    if (Extension8.Max >= dataSize) {
        encoder.__view.setUint8(startOffset, FixedData.Extension8);
        encoder.__view.setUint8(startOffset + 3, dataSize);
        copyAndPaste(encoder, dataOffset, dataSize, Extension8.Minus);
        return true;
    } else if (Extension16.Max >= dataSize) {
        encoder.__view.setUint8(startOffset, FixedData.Extension16);
        encoder.__view.setUint16(startOffset + 3, dataSize, true);
        copyAndPaste(encoder, dataOffset, dataSize, Extension16.Minus);
        return true;
    } else if (Extension24.Max >= dataSize) {
        encoder.__view.setUint8(startOffset, FixedData.Extension24);
        // write 24 bit number to encoder.__buffer by index
        encoder.__buffer[startOffset + 3] = dataSize & 0xff;
        encoder.__buffer[startOffset + 4] = (dataSize >> 8) & 0xff;
        encoder.__buffer[startOffset + 5] = (dataSize >> 16) & 0xff;
        copyAndPaste(encoder, dataOffset, dataSize, Extension24.Minus);
        return true;
    } else if (Extension32.Max >= dataSize) {
        encoder.__view.setUint8(startOffset, FixedData.Extension32);
        encoder.__view.setUint32(startOffset + 3, dataSize, true);
        return true;
    }
    return false;
}

/*@__INLINE__*/
function copyAndPaste(encoder: QEncoder, offset: number, size: number, minus: number): void {
    const tempBuffer = new Uint8Array(encoder.__buffer.buffer, encoder.__buffer.byteOffset + offset, size);
    encoder.__buffer.set(tempBuffer, offset - minus);
    encoder.__bufferOffset -= minus;
}