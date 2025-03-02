import { FixedData } from "../../lib/data-enum";
import { DataByte, Int64 } from "../../lib/size-enum";
import { QEncoder } from "../encoder";


export function encodeBigIntSync(encoder: QEncoder, data: bigint): boolean {
    if(Int64.TSize > (encoder.__buffer.length - encoder.__bufferOffset)){
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Int64);
    encoder.__bufferOffset+=DataByte.Header;
    encoder.__view.setBigInt64(encoder.__bufferOffset, data, true);
    encoder.__bufferOffset+=Int64.Size;
    return true;
}