import { FixedData } from "../../lib/data-enum";
import { DataByte } from "../../lib/size-enum";
import { QEncoder } from "../encoder";


export function encodeBooleanSync(encoder: QEncoder, data: boolean): boolean {
    if (DataByte.Header > (encoder.__buffer.length - encoder.__bufferOffset)) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, data ? FixedData.True : FixedData.False);
    encoder.__bufferOffset += DataByte.Header;
    return true;
}