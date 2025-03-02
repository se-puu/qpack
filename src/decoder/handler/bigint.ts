import { DataByte, Int64, Uint64 } from "../../lib/size-enum";
import { QDecoder } from "../decoder";

export function decodeInt64Sync(decoder: QDecoder): bigint {
    decoder.__bufferOffset+=DataByte.Header;
    const val=decoder.__view.getBigInt64(decoder.__bufferOffset, true);
    decoder.__bufferOffset+=Int64.Size;
    return val;
}
export function decodeUint64Sync(decoder: QDecoder): bigint {
    decoder.__bufferOffset+=DataByte.Header;
    const val=decoder.__view.getBigUint64(decoder.__bufferOffset, true);
    decoder.__bufferOffset+=Uint64.Size;
    return val;
}