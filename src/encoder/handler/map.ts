import { FixedData } from "../../lib/data-enum";
import { DataByte, Map16, Map24, Map32, Map8 } from "../../lib/size-enum";
import { encodeSync } from "../encode-sync";
import { QEncoder } from "../encoder";
import { Encodeable } from "../handler-map";
import { encodeNull3Sync } from "./null";

export function encodeMapSync(encoder:QEncoder,data:Map<unknown,unknown>):boolean {
    if(Map8.Max>=data.size) {
        return encodeMap8Sync(encoder,data);
    }else if(Map16.Max>=data.size) {
        return encodeMap16Sync(encoder,data);
    }else if(Map24.Max>=data.size) {
        return encodeMap24Sync(encoder,data);
    }
    return encodeMap32Sync(encoder,data);
}

/* @__INLINE__ */
function encodeMap8Sync(encoder:QEncoder,data:Map<unknown,unknown>):boolean {
    if(Map8.TSize>(encoder.__buffer.length-encoder.__bufferOffset)) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Map8);
    encoder.__bufferOffset+=DataByte.Header;
    const tempOffset=encoder.__bufferOffset;
    encoder.__bufferOffset+=Map8.Size;
    const mapLen=data.size-encodeMapValueSync(encoder,data);
    encoder.__view.setUint8(tempOffset,mapLen);
    return true;
}

/* @__INLINE__ */
function encodeMap16Sync(encoder:QEncoder,data:Map<unknown,unknown>):boolean {
    if(Map16.TSize>(encoder.__buffer.length-encoder.__bufferOffset)) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Map16);
    encoder.__bufferOffset+=DataByte.Header;
    const tempOffset=encoder.__bufferOffset;
    encoder.__bufferOffset+=Map16.Size;
    const mapLen=data.size-encodeMapValueSync(encoder,data);
    encoder.__view.setUint16(tempOffset,mapLen,true);
    return true;
}

/* @__INLINE__ */
function encodeMap24Sync(encoder:QEncoder,data:Map<unknown,unknown>):boolean {
    if(Map24.TSize>(encoder.__buffer.length-encoder.__bufferOffset)) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Map24);
    encoder.__bufferOffset+=DataByte.Header;
    const tempOffset=encoder.__bufferOffset;
    encoder.__bufferOffset+=Map24.Size;
    const mapLen=data.size-encodeMapValueSync(encoder,data);
    encoder.__buffer[tempOffset] =mapLen & 0xFF;
    encoder.__buffer[tempOffset+1] =(mapLen>>8) & 0xFF;
    encoder.__buffer[tempOffset+2] =(mapLen>>16) & 0xFF;
    return true;
}

/* @__INLINE__ */
function encodeMap32Sync(encoder:QEncoder,data:Map<unknown,unknown>):boolean {
    if(Map32.TSize>(encoder.__buffer.length-encoder.__bufferOffset)) {
        encoder.__expand();
    }
    encoder.__view.setUint8(encoder.__bufferOffset, FixedData.Map32);
    encoder.__bufferOffset+=DataByte.Header;
    const tempOffset=encoder.__bufferOffset;
    encoder.__bufferOffset+=Map32.Size;
    const mapLen=data.size-encodeMapValueSync(encoder,data);
    encoder.__view.setUint32(tempOffset,mapLen,true);
    return true;
}

/* @__INLINE__ */
function encodeMapValueSync(encoder:QEncoder,data:Map<unknown,unknown>):number {
    let skipped=0;
    for(const [key,value] of data) {
        if(!encodeSync(encoder,key as Encodeable)){
            skipped++;
            continue;
        }
        if(!encodeSync(encoder,value as Encodeable)){
            encodeNull3Sync(encoder);
        }
    }
    return skipped;
}