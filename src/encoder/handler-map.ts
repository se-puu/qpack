import { ExtEntry } from "../lib/ext-registry";
import { QEncoder } from "./encoder";
import { encodeArraySync } from "./handler/array";
import { encodeBigIntSync } from "./handler/bigint";
import { encodeBinarySync, encodeUint8Sync } from "./handler/binary";
import { encodeBooleanSync } from "./handler/boolean";
import { encodeMapSync } from "./handler/map";
import { encodeNumberSync } from "./handler/number";
import { encodeObjectSync } from "./handler/object";
import { encodeStringSync } from "./handler/string";
import { encodeTimestampSync } from "./handler/timestamp";

/**
 * encodeable binary data type
 */
export type EncodeableBinary = Uint8ClampedArray | Uint8Array | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array | DataView;
/**
 * encodeable data type that supported by QEncoder
 */
export type Encodeable = Date | number | string | boolean | object | bigint | undefined | null | EncodeableBinary | {constructor:ExtEntry<object>};

/**
 * encoder sync handler
 */
export type EncoderSyncHandler<T> = (encoder: QEncoder, data: T) => boolean;
export type _EncoderSyncHandler<T> = T extends Encodeable ? EncoderSyncHandler<T> : never;

/**
 * create encoder handler map
 * @returns encoder handler map
 */
export function createEncoder(): WeakMap<object, _EncoderSyncHandler<Encodeable> | _EncoderSyncHandler<Encodeable[]> | _EncoderSyncHandler<Map<unknown, unknown>>> {
    const handler = new WeakMap();
    handler.set(Number, encodeNumberSync);
    handler.set(String, encodeStringSync);
    handler.set(Boolean, encodeBooleanSync);
    handler.set(Object, encodeObjectSync);
    handler.set(BigInt, encodeBigIntSync);
    handler.set(Date, encodeTimestampSync);
    handler.set(Array, encodeArraySync);
    handler.set(Map, encodeMapSync);

    /**binary data */
    handler.set(Uint8Array, encodeUint8Sync);
    handler.set(Uint16Array, encodeBinarySync);
    handler.set(Uint32Array, encodeBinarySync);
    handler.set(BigUint64Array, encodeBinarySync);
    handler.set(Int8Array, encodeBinarySync);
    handler.set(Int16Array, encodeBinarySync);
    handler.set(Int32Array, encodeBinarySync);
    handler.set(BigInt64Array, encodeBinarySync);
    handler.set(Float32Array, encodeBinarySync);
    handler.set(Float64Array, encodeBinarySync);
    handler.set(DataView, encodeBinarySync);
    handler.set(Uint8ClampedArray, encodeBinarySync);
    return handler;
}