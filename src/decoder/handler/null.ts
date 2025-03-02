import { DataByte } from "../../lib/size-enum";
import { QDecoder } from "../decoder";

export function decodeNull3Sync(decoder:QDecoder): undefined {
    decoder.__bufferOffset += DataByte.Header;
    return undefined;
}
export function decodeNull8Sync(decoder:QDecoder): undefined {
    decoder.__bufferOffset += DataByte.Header;
    return undefined;
}
export function decodeNull16Sync(decoder:QDecoder): undefined {
    decoder.__bufferOffset += DataByte.Header;
    return undefined;
}