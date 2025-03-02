import { QEncoder } from "./encoder";
import { Encodeable, EncoderSyncHandler } from "./handler-map";
import { encodeNull3Sync } from "./handler/null";

export function encodeSync(encoder:QEncoder, data:Encodeable): boolean {
    if(data===null || data===undefined) {
        // encode as Nill
        return encodeNull3Sync(encoder);
    }
    const cb=encoder.__extRegistry.__encoder.get(data.constructor) as EncoderSyncHandler<Encodeable>;
    if(cb) {
        return cb(encoder,data);
    }
    return false;
}