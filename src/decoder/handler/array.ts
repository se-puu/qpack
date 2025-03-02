import { Array16, Array24, Array32, Array5, Array8, DataByte } from "../../lib/size-enum";
import { decodeSync } from "../decode-sync";
import { QDecoder } from "../decoder";

export function decodeArray5Sync(decoder: QDecoder): unknown[] {
    const len=decoder.__view.getUint8(decoder.__bufferOffset) & Array5.Max;
    decoder.__bufferOffset += DataByte.Header;
    return len > 0 ? decodeArrayValueSync(decoder,len) : [];
}

export function decodeArray8Sync(decoder: QDecoder): unknown[] {
    decoder.__bufferOffset += DataByte.Header;
    const len=decoder.__view.getUint8(decoder.__bufferOffset);
    decoder.__bufferOffset += Array8.Size;
    return decodeArrayValueSync(decoder,len);
}

export function decodeArray16Sync(decoder: QDecoder): unknown[] {
    decoder.__bufferOffset += DataByte.Header;
    const len=decoder.__view.getUint16(decoder.__bufferOffset,true);
    decoder.__bufferOffset += Array16.Size;
    return decodeArrayValueSync(decoder,len);
}

export function decodeArray24Sync(decoder: QDecoder): unknown[] {
    decoder.__bufferOffset += DataByte.Header;
    const len = decoder.__buffer[decoder.__bufferOffset] | (decoder.__buffer[decoder.__bufferOffset + 1] << 8) | (decoder.__buffer[decoder.__bufferOffset + 2] << 16);
    decoder.__bufferOffset += Array24.Size;
    return decodeArrayValueSync(decoder,len);
}

export function decodeArray32Sync(decoder: QDecoder): unknown[] {
    decoder.__bufferOffset += DataByte.Header;
    const len=decoder.__view.getUint32(decoder.__bufferOffset,true);
    decoder.__bufferOffset += Array32.Size;
    return decodeArrayValueSync(decoder,len);
}

/* @__INLINE__ */
function decodeArrayValueSync(decoder: QDecoder, len: number): unknown[] {
    const retArr=new Array(len);
    for(let i=0;i<len;i++) {
        const val=decodeSync(decoder);
        retArr[i]=val;
        // console.log("array",i,val)
    }
    return retArr;
}