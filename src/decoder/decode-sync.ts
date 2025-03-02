import { QDecoder } from "./decoder";

export function decodeSync(decoder:QDecoder): unknown {
    if(decoder.__bufferOffset>=decoder.__buffer.length){
        return undefined
    }
    const code=decoder.__buffer[decoder.__bufferOffset];
    const handler=decoder.__extRegistry.__decoder[code];
    if(handler){
        return handler(decoder);
    }
    return null;
}