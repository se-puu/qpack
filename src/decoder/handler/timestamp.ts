import { DataByte, Timestamp48, Timestamp64 } from "../../lib/size-enum";
import { QDecoder } from "../decoder";

export function decodeTimestamp48Sync(decoder:QDecoder) {
    decoder.__bufferOffset+=DataByte.Header;
    const lo = decoder.__view.getUint32(decoder.__bufferOffset, true);
    const hi = decoder.__view.getUint16(decoder.__bufferOffset+4, true);
    decoder.__bufferOffset+=Timestamp48.Size;
    return new Date((hi * 4294967296) + lo);
}
export function decodeTimestamp64Sync(decoder:QDecoder) {
    decoder.__bufferOffset+=DataByte.Header;
    const value = decoder.__view.getBigUint64(decoder.__bufferOffset, true);
    decoder.__bufferOffset+=Timestamp64.Size;
    return new Date(Number(value));
}