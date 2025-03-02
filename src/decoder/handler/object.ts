import { DataByte, Object16, Object32, Object5, Object8 } from "../../lib/size-enum";
import { decodeSync } from "../decode-sync";
import { QDecoder } from "../decoder";

export function decodeObject5Sync(decoder: QDecoder): object {
    const len=decoder.__view.getUint8(decoder.__bufferOffset) & Object5.Max;
    decoder.__bufferOffset += DataByte.Header;
    return len > 0 ? decodeObjectValueSync(decoder,len) : {};
}

export function decodeObject8Sync(decoder: QDecoder): object {
    decoder.__bufferOffset += DataByte.Header;
    const len=decoder.__view.getUint8(decoder.__bufferOffset);
    decoder.__bufferOffset += Object8.Size;
    return decodeObjectValueSync(decoder,len);
}

export function decodeObject16Sync(decoder: QDecoder): object {
    decoder.__bufferOffset += DataByte.Header;
    const len=decoder.__view.getUint16(decoder.__bufferOffset,true);
    decoder.__bufferOffset += Object16.Size;
    return decodeObjectValueSync(decoder,len);
}

export function decodeObject32Sync(decoder: QDecoder): object {
    decoder.__bufferOffset += DataByte.Header;
    const len=decoder.__view.getUint32(decoder.__bufferOffset,true);
    decoder.__bufferOffset += Object32.Size;
    return decodeObjectValueSync(decoder,len);
}

/* @__INLINE__ */
function decodeObjectValueSync(decoder: QDecoder, len: number): object {
    const retObj: Record<string, unknown> = {};
    for (let i = 0; i < len; i++) {
        const key = decodeSync(decoder) as string;
        const val = decodeSync(decoder);
        retObj[key] = val;
    }
    return retObj;
}