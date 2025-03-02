import { RangedData } from "../../lib/data-enum";
import { Null3 } from "../../lib/size-enum";
import { QEncoder } from "../encoder";

export function encodeNull3Sync(encoder: QEncoder): boolean {
    if (Null3.TSize > encoder.__buffer.length - encoder.__bufferOffset) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, RangedData.Null3_Start);
    encoder.__bufferOffset += Null3.TSize;
    return true;
}