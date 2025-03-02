import { RangedData, FixedData } from "../lib/data-enum";
import { QDecoder } from "./decoder";
import { decodeString16Sync, decodeString24Sync, decodeString32Sync, decodeString5Sync, decodeString8Sync } from "./handler/string";
import { decodeFloat32Sync, decodeFloat64Sync, decodeInt16Sync, decodeInt24Sync, decodeInt32Sync, decodeInt40Sync, decodeInt48Sync, decodeInt8Sync, decodeIntSafeSync, decodeNint5Sync, decodeUint16Sync, decodeUint24Sync, decodeUint32Sync, decodeUint40Sync, decodeUint48Sync, decodeUint6Sync, decodeUint8Sync } from "./handler/number";
import { decodeObject16Sync, decodeObject32Sync, decodeObject5Sync, decodeObject8Sync } from "./handler/object";
import { decodeArray16Sync, decodeArray24Sync, decodeArray32Sync, decodeArray5Sync, decodeArray8Sync } from "./handler/array";
import { decodeNull16Sync, decodeNull3Sync, decodeNull8Sync } from "./handler/null";
import { decodeBinary16Sync, decodeBinary24Sync, decodeBinary32Sync, decodeBinary8Sync } from "./handler/binary";
import { decodeTimestamp48Sync, decodeTimestamp64Sync } from "./handler/timestamp";
import { decodeFalseSync, decodeTrueSync } from "./handler/boolean";
import { decodeInt64Sync, decodeUint64Sync } from "./handler/bigint";
import { decodeMap16Sync, decodeMap24Sync, decodeMap32Sync, decodeMap8Sync } from "./handler/map";
import { decodeExtension16Sync, decodeExtension24Sync, decodeExtension32Sync, decodeExtension8Sync } from "./handler/extension";
import { ExtEntry } from "../lib/ext-registry";

export type DecoderSyncHandler = (decoder: QDecoder) => unknown;

export function createDecoder(): DecoderSyncHandler[] {
    const decoderSyncHandler = new Array(256) as DecoderSyncHandler[];
    let indexCounter = RangedData.Uint6_Start;
    for (; indexCounter <= RangedData.Uint6_End; indexCounter++) {
        decoderSyncHandler[indexCounter] = decodeUint6Sync;
    }
    indexCounter = RangedData.String5_Start;
    for (; indexCounter <= RangedData.String5_End; indexCounter++) {
        decoderSyncHandler[indexCounter] = decodeString5Sync;
    }
    indexCounter = RangedData.Object5_Start;
    for (; indexCounter <= RangedData.Object5_End; indexCounter++) {
        decoderSyncHandler[indexCounter] = decodeObject5Sync;
    }
    indexCounter = RangedData.Array5_Start;
    for (; indexCounter <= RangedData.Array5_End; indexCounter++) {
        decoderSyncHandler[indexCounter] = decodeArray5Sync;
    }
    indexCounter = RangedData.Null3_Start;
    for (; indexCounter <= RangedData.Null3_End; indexCounter++) {
        decoderSyncHandler[indexCounter] = decodeNull3Sync;
    }
    decoderSyncHandler[FixedData.Null8] = decodeNull8Sync;
    decoderSyncHandler[FixedData.Null16] = decodeNull16Sync;
    // continue with other handlers
    decoderSyncHandler[FixedData.Object8] = decodeObject8Sync;
    decoderSyncHandler[FixedData.Object16] = decodeObject16Sync;
    decoderSyncHandler[FixedData.Object32] = decodeObject32Sync;
    decoderSyncHandler[FixedData.IntSafe] = decodeIntSafeSync;
    decoderSyncHandler[FixedData.meta] = undefined as unknown as DecoderSyncHandler;
    decoderSyncHandler[FixedData.Binary8] = decodeBinary8Sync;
    decoderSyncHandler[FixedData.Binary16] = decodeBinary16Sync;
    decoderSyncHandler[FixedData.Binary24] = decodeBinary24Sync;
    decoderSyncHandler[FixedData.Binary32] = decodeBinary32Sync;
    decoderSyncHandler[FixedData.String8] = decodeString8Sync;
    decoderSyncHandler[FixedData.String16] = decodeString16Sync;
    decoderSyncHandler[FixedData.String24] = decodeString24Sync;
    decoderSyncHandler[FixedData.String32] = decodeString32Sync;
    decoderSyncHandler[FixedData.Array8] = decodeArray8Sync;
    decoderSyncHandler[FixedData.Array16] = decodeArray16Sync;
    decoderSyncHandler[FixedData.Array24] = decodeArray24Sync;
    decoderSyncHandler[FixedData.Array32] = decodeArray32Sync;
    decoderSyncHandler[FixedData.Map8] =decodeMap8Sync;
    decoderSyncHandler[FixedData.Map16] =decodeMap16Sync;
    decoderSyncHandler[FixedData.Map24] =decodeMap24Sync;
    decoderSyncHandler[FixedData.Map32] =decodeMap32Sync;
    decoderSyncHandler[FixedData.Extension8] = decodeExtension8Sync;
    decoderSyncHandler[FixedData.Extension16] = decodeExtension16Sync;
    decoderSyncHandler[FixedData.Extension24] = decodeExtension24Sync;
    decoderSyncHandler[FixedData.Extension32] = decodeExtension32Sync;
    decoderSyncHandler[FixedData.UnixTime48] = decodeTimestamp48Sync;
    decoderSyncHandler[FixedData.UnixTime64] = decodeTimestamp64Sync;
    decoderSyncHandler[FixedData.Float32] = decodeFloat32Sync;
    decoderSyncHandler[FixedData.Float64] = decodeFloat64Sync;
    decoderSyncHandler[FixedData.Uint8] = decodeUint8Sync;
    decoderSyncHandler[FixedData.Uint16] = decodeUint16Sync;
    decoderSyncHandler[FixedData.Uint24] = decodeUint24Sync;
    decoderSyncHandler[FixedData.Uint32] = decodeUint32Sync;
    decoderSyncHandler[FixedData.Uint40] = decodeUint40Sync;
    decoderSyncHandler[FixedData.Uint48] = decodeUint48Sync;
    decoderSyncHandler[FixedData.Uint64] = decodeUint64Sync;
    decoderSyncHandler[FixedData.Int8] = decodeInt8Sync;
    decoderSyncHandler[FixedData.Int16] = decodeInt16Sync;
    decoderSyncHandler[FixedData.Int24] = decodeInt24Sync;
    decoderSyncHandler[FixedData.Int32] = decodeInt32Sync;
    decoderSyncHandler[FixedData.Int40] = decodeInt40Sync;
    decoderSyncHandler[FixedData.Int48] = decodeInt48Sync;
    decoderSyncHandler[FixedData.Int64] = decodeInt64Sync;
    decoderSyncHandler[FixedData.False] = decodeFalseSync;
    decoderSyncHandler[FixedData.True] = decodeTrueSync;
    //end
    indexCounter = RangedData.Nint5_Start;
    for (; indexCounter <= RangedData.Nint5_End; indexCounter++) {
        decoderSyncHandler[indexCounter] = decodeNint5Sync;
    }
    return decoderSyncHandler;
}

export function createExtDecoder(): ExtEntry<object>[] {
    const ExtRegistry = new Array(65536) as ExtEntry<object>[];
    return ExtRegistry;
}