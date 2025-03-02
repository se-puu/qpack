import { DataByte, Map16, Map24, Map32, Map8 } from "../../lib/size-enum";
import { decodeSync } from "../decode-sync";
import { QDecoder } from "../decoder";

export function decodeMap8Sync(decoder: QDecoder): Map<unknown,unknown> {
    decoder.__bufferOffset += DataByte.Header;
    const len=decoder.__view.getUint8(decoder.__bufferOffset);
    decoder.__bufferOffset += Map8.Size;
    return len > 0 ? decodeMapValueSync(decoder,len) : new Map();
}

/* @__INLINE__ */
export function decodeMap16Sync(decoder: QDecoder): Map<unknown,unknown> {
    decoder.__bufferOffset += DataByte.Header;
    const len=decoder.__view.getUint16(decoder.__bufferOffset,true);
    decoder.__bufferOffset += Map16.Size;
    return decodeMapValueSync(decoder,len);
}

/* @__INLINE__ */
export function decodeMap24Sync(decoder: QDecoder): Map<unknown,unknown> {
    decoder.__bufferOffset += DataByte.Header;
    const len=decoder.__buffer[decoder.__bufferOffset] | (decoder.__buffer[decoder.__bufferOffset+1] << 8) | (decoder.__buffer[decoder.__bufferOffset+2] << 16);
    decoder.__bufferOffset += Map24.Size;
    return decodeMapValueSync(decoder,len);
}

/* @__INLINE__ */
export function decodeMap32Sync(decoder: QDecoder): Map<unknown,unknown> {
    decoder.__bufferOffset += DataByte.Header;
    const len=decoder.__view.getUint32(decoder.__bufferOffset,true);
    decoder.__bufferOffset += Map32.Size;
    return decodeMapValueSync(decoder,len);
}

/* @__INLINE__ */
function decodeMapValueSync(decoder: QDecoder, len: number): Map<unknown, unknown> {
    const retMap = new Map<unknown, unknown>();
    for (let i = 0; i < len; i++) {
        retMap.set(decodeSync(decoder), decodeSync(decoder));
    }
    return retMap;
}