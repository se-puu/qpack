import { ExtRegistry } from "../../src/lib/ext-registry";
import { isEqualArray } from "./handler/array";
import { isEqualBigInt } from "./handler/bigint";
import { isEqualBinary } from "./handler/binary";
import { isEqualBoolean } from "./handler/boolean";
import { isEqualMap } from "./handler/map";
import { isEqualNumber } from "./handler/number";
import { isEqualObject } from "./handler/object";
import { isEqualString } from "./handler/string";
import { isEqualTimestamp } from "./handler/timestamp";

type Handler=(a:unknown,b:unknown,handler:ExtRegistry)=>boolean;
export const checkerMap:WeakMap<object,Handler>=new WeakMap();
checkerMap.set(Number,isEqualNumber as Handler);
checkerMap.set(String,isEqualString as Handler);
checkerMap.set(Uint8Array,isEqualBinary as Handler);
checkerMap.set(Date,isEqualTimestamp as Handler);
checkerMap.set(Boolean,isEqualBoolean as Handler);
checkerMap.set(Array,isEqualArray as Handler);
checkerMap.set(BigInt,isEqualBigInt as Handler);
checkerMap.set(Object,isEqualObject as Handler);
checkerMap.set(Map,isEqualMap as Handler);