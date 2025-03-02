import { DataByte } from "../../lib/size-enum";
import { QDecoder } from "../decoder";

export function decodeTrueSync(decoder: QDecoder): boolean {
    decoder.__bufferOffset += DataByte.Header;
    return true;
}
export function decodeFalseSync(decoder: QDecoder): boolean {
    decoder.__bufferOffset += DataByte.Header;
    return false;
}