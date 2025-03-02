// check number is inline check
// string is inline check
// boolean is inline check

import { randomBytes } from "crypto";
import { Encodeable } from "../../src/encoder/handler-map";
import { Binary16, Binary8, Float32, Int16, Int24, Int32, Int40, Int48, Int8, Nint5, String16, String24, String5, String8, Uint16, Uint24, Uint32, Uint40, Uint48, Uint6, Uint8 } from "../../src/lib/size-enum";
import { checkerMap } from "./handler-map";
import { ExtRegistry } from "../../src/lib/ext-registry";
import { isEqualObject } from "./handler/object";

export const randomBuf = randomBytes(2 ** 31 - 1);
export const maxStrLen = 2**28-1;
const random29Char = Array.from({ length: 29 }, () => String.fromCharCode(Math.floor(Math.random() * 52) + (Math.random() > 0.5 ? 65 : 97))).join('');
const randomStr = random29Char.repeat(maxStrLen / 29);
export function toString(length: number): string {
    return randomStr.substring(0, length);
}
export function isEqual(a: unknown, b: unknown, handler: ExtRegistry): boolean {
    const typeA = typeof a;
    const typeB = typeof b;
    if (typeA !== typeB) {
        return false;
    }
    if (a === null || a === undefined) {
        return a === b;
    }
    const cb = checkerMap.get(a.constructor);
    if (!cb) {
        if (a instanceof Object && b instanceof Object) {
            return isEqualObject(a, b, handler);
        }
        return false;
    }
    return cb(a, b, handler);
}
export function logTextMaker(status: boolean, name: string, success: string, fail: string): string {
    if (status) {
        // console name in no color and success in green color
        return `( ${name} ${'\x1b[32m'}${success} ${'\x1b[0m'}) `;
    } else {
        // console name in no color and fail in red color
        return `( ${name} ${'\x1b[31m'}${fail} ${'\x1b[0m'}) `;
    }
}
export function randomPositiveInt(max: number): number {
    return Math.floor(Math.random() * max);
}
export function randomPositiveIntBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}
export function randomNegativeInt(min: number): number {
    return Math.floor(Math.random() * min);
}
export function randomNegativeIntBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (min - max) + max);
}
export function randomString(length: number): string {
    // may be 2^53-1 length string. write optimized code. maybe utf16 or ascii
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let output = "";
    for (let i = 0; i < length; i++) {
        output += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return output;
}
export function randomFloat(max: number): number {
    return Math.random() * max;
}
export function randomFloatBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}
export function randomHeavyArray(length: number): Encodeable[] {
    const output: Encodeable[] = new Array(length);
    for (let i = 0; i < length; i++) {
        // random boolean, negative int(one, two, three, four, five, six, eight byte) , uint(one, two, three, four, five, six, eight byte), float(32bit, 64bit), string(0 to 5bit len, 5bit + 1 to 8bit len , to 16bit, to 24bit, to 32bit),
        // null, undefined, NaN
        output[i] = getHeavyValue();
        // output[i] = toString(randomPositiveIntBetween(String24.Max + 1, maxStrLen));
    }
    return output;
}

export function randomLightArray(length: number): Encodeable[] {
    const output: Encodeable[] = new Array(length);
    for (let i = 0; i < length; i++) {
        // random boolean, negative int(one, two, three, four, five, six, eight byte) , uint(one, two, three, four, five, six, eight byte), float(32bit, 64bit), string(0 to 5bit len, 5bit + 1 to 8bit len , to 16bit, to 24bit, to 32bit),
        // null, undefined, NaN
        output[i] = getLightValue();
    }
    return output;
}

export function randomHeavyObject(length: number): object {
    const output: object = {};
    for (let i = 0; i < length; i++) {
        // random boolean, negative int(one, two, three, four, five, six, eight byte) , uint(one, two, three, four, five, six, eight byte), float(32bit, 64bit), string(0 to 5bit len, 5bit + 1 to 8bit len , to 16bit, to 24bit, to 32bit),
        // null, undefined, NaN
        output["key" + i] = getHeavyValue();
    }
    return output;
}

export function randomLightObject(length: number): object {
    const output: object = {};
    for (let i = 0; i < length; i++) {
        // random boolean, negative int(one, two, three, four, five, six, eight byte) , uint(one, two, three, four, five, six, eight byte), float(32bit, 64bit), string(0 to 5bit len, 5bit + 1 to 8bit len , to 16bit, to 24bit, to 32bit),
        // null, undefined, NaN
        output["key" + i] = getLightValue();
    }
    return output;
}

export function randomHeavyMap(length: number): Map<Encodeable, Encodeable> {
    const output: Map<Encodeable, Encodeable> = new Map();
    for (let i = 0; i < length; i++) {
        // random boolean, negative int(one, two, three, four, five, six, eight byte) , uint(one, two, three, four, five, six, eight byte), float(32bit, 64bit), string(0 to 5bit len, 5bit + 1 to 8bit len , to 16bit, to 24bit, to 32bit),
        // null, undefined, NaN
        let key = getHeavyValue();
        while (output.has(key)) {
            key = getHeavyValue();
        }
        output.set(key, getHeavyValue());
    }
    return output;
}

export function randomLightMap(length: number): Map<Encodeable, Encodeable> {
    const output: Map<Encodeable, Encodeable> = new Map();
    for (let i = 0; i < length; i++) {
        // random boolean, negative int(one, two, three, four, five, six, eight byte) , uint(one, two, three, four, five, six, eight byte), float(32bit, 64bit), string(0 to 5bit len, 5bit + 1 to 8bit len , to 16bit, to 24bit, to 32bit),
        // null, undefined, NaN
        let key = getLightKey();
        while (output.has(key)) {
            key = getLightKey();
        }
        output.set(key, getLightValue());
    }
    return output;
}

function getHeavyValue(): Encodeable {
    const random = randomPositiveInt(28);
    switch (random) {
        case 0: {
            const outVal = Math.random() > 0.5;
            return outVal;
        }
        case 1: {
            const outVal = randomNegativeIntBetween(Nint5.Max, Nint5.Min);
            return outVal;
        }
        case 2: {
            const outVal = randomNegativeIntBetween(Nint5.Min - 1, Int8.Min);
            return outVal;
        }
        case 3: {
            const outVal = randomNegativeIntBetween(Int8.Min - 1, Int16.Min);
            return outVal;
        }
        case 4: {
            const outVal = randomNegativeIntBetween(Int16.Min - 1, Int24.Min);
            return outVal;
        }
        case 5: {
            const outVal = randomNegativeIntBetween(Int24.Min - 1, Int32.Min);
            return outVal;
        }
        case 6: {
            const outVal = randomNegativeIntBetween(Int32.Min - 1, Int40.Min);
            return outVal;
        }
        case 7: {
            const outVal = randomNegativeIntBetween(Int40.Min - 1, Int48.Min);
            return outVal;
        }
        case 8: {
            const outVal = randomNegativeIntBetween(Int48.Min - 1, Number.MIN_SAFE_INTEGER);
            return outVal;
        }
        case 9: {
            const outVal = randomPositiveIntBetween(0, Uint6.Max);
            return outVal;
        }
        case 10: {
            const outVal = randomPositiveIntBetween(Uint6.Max + 1, Uint8.Max);
            return outVal;
        }
        case 11: {
            const outVal = randomPositiveIntBetween(Uint8.Max + 1, Uint16.Max);
            return outVal;
        }
        case 12: {
            const outVal = randomPositiveIntBetween(Uint16.Max + 1, Uint24.Max);
            return outVal;
        }
        case 13: {
            const outVal = randomPositiveIntBetween(Uint24.Max + 1, Uint32.Max);
            return outVal;
        }
        case 14: {
            const outVal = randomPositiveIntBetween(Uint32.Max + 1, Uint40.Max);
            return outVal;
        }
        case 15: {
            const outVal = randomPositiveIntBetween(Uint40.Max + 1, Uint48.Max);
            return outVal;
        }
        case 16: {
            const outVal = randomPositiveIntBetween(Uint48.Max + 1, Number.MAX_SAFE_INTEGER);
            return outVal;
        }
        case 17: {
            const outVal = randomFloatBetween(Float32.Min, Float32.Max);
            return outVal;
        }
        case 18: {
            const outVal = randomFloatBetween(Number.MIN_VALUE, Number.MAX_VALUE);
            return outVal;
        }
        case 19: {
            const outVal = toString(randomPositiveIntBetween(1, String5.Max));
            return outVal;
        }
        case 20: {
            const outVal = toString(randomPositiveIntBetween(String5.Max + 1, String8.Max));
            return outVal;
        }
        case 21: {
            const outVal = toString(randomPositiveIntBetween(String8.Max + 1, String16.Max));
            return outVal;
        }
        case 22: {
            const outVal = toString(randomPositiveIntBetween(String16.Max + 1, String24.Max));
            return outVal;
        }
        case 23: {
            const outVal = toString(randomPositiveIntBetween(String24.Max + 1, maxStrLen));
            return outVal;
        }
        case 24: {
            const outVal = undefined;
            return outVal;
        }
        case 25: {
            const outVal = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
            return outVal;
        }
        case 26: {
            const outVal = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, Binary8.Max);
            return outVal;
        }
        case 27: {
            const outVal = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, Binary16.Max);
            return outVal;
        }
        case 28: {
            const outVal = Date.now();
            return outVal;
        }
    }
}

function getLightValue(): Encodeable {
    const random = randomPositiveInt(22);
    switch (random) {
        case 0: {
            const outVal = Math.random() > 0.5;
            return outVal;
        }
        case 1: {
            const outVal = randomNegativeIntBetween(Nint5.Max, Nint5.Min);
            return outVal;
        }
        case 2: {
            const outVal = randomNegativeIntBetween(Nint5.Min - 1, Int8.Min);
            return outVal;
        }
        case 3: {
            const outVal = randomNegativeIntBetween(Int8.Min - 1, Int16.Min);
            return outVal;
        }
        case 4: {
            const outVal = randomNegativeIntBetween(Int16.Min - 1, Int24.Min);
            return outVal;
        }
        case 5: {
            const outVal = randomNegativeIntBetween(Int24.Min - 1, Int32.Min);
            return outVal;
        }
        case 6: {
            const outVal = randomNegativeIntBetween(Int32.Min - 1, Int40.Min);
            return outVal;
        }
        case 7: {
            const outVal = randomNegativeIntBetween(Int40.Min - 1, Int48.Min);
            return outVal;
        }
        case 8: {
            const outVal = randomNegativeIntBetween(Int48.Min - 1, Number.MIN_SAFE_INTEGER);
            return outVal;
        }
        case 9: {
            const outVal = randomPositiveIntBetween(0, Uint6.Max);
            return outVal;
        }
        case 10: {
            const outVal = randomPositiveIntBetween(Uint6.Max + 1, Uint8.Max);
            return outVal;
        }
        case 11: {
            const outVal = randomPositiveIntBetween(Uint8.Max + 1, Uint16.Max);
            return outVal;
        }
        case 12: {
            const outVal = randomPositiveIntBetween(Uint16.Max + 1, Uint24.Max);
            return outVal;
        }
        case 13: {
            const outVal = randomPositiveIntBetween(Uint24.Max + 1, Uint32.Max);
            return outVal;
        }
        case 14: {
            const outVal = randomPositiveIntBetween(Uint32.Max + 1, Uint40.Max);
            return outVal;
        }
        case 15: {
            const outVal = randomPositiveIntBetween(Uint40.Max + 1, Uint48.Max);
            return outVal;
        }
        case 16: {
            const outVal = randomPositiveIntBetween(Uint48.Max + 1, Number.MAX_SAFE_INTEGER);
            return outVal;
        }
        case 17: {
            const outVal = randomFloatBetween(Float32.Min, Float32.Max);
            return outVal;
        }
        case 18: {
            const outVal = randomFloatBetween(Number.MIN_VALUE, Number.MAX_VALUE);
            return outVal;
        }
        case 19: {
            const outVal = toString(randomPositiveIntBetween(1, String5.Max));
            return outVal;
        }
        case 20: {
            const outVal = toString(randomPositiveIntBetween(String5.Max + 1, String8.Max));
            return outVal;
        }
        case 21: {
            const outVal = undefined;
            return outVal;
        }
        case 22: {
            const outVal = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
            return outVal;
        }
    }
}

function getLightKey(): Encodeable {
    const random = randomPositiveIntBetween(1, 21);
    switch (random) {
        case 1: {
            const outVal = randomNegativeIntBetween(Nint5.Max, Nint5.Min);
            return outVal;
        }
        case 2: {
            const outVal = randomNegativeIntBetween(Nint5.Min - 1, Int8.Min);
            return outVal;
        }
        case 3: {
            const outVal = randomNegativeIntBetween(Int8.Min - 1, Int16.Min);
            return outVal;
        }
        case 4: {
            const outVal = randomNegativeIntBetween(Int16.Min - 1, Int24.Min);
            return outVal;
        }
        case 5: {
            const outVal = randomNegativeIntBetween(Int24.Min - 1, Int32.Min);
            return outVal;
        }
        case 6: {
            const outVal = randomNegativeIntBetween(Int32.Min - 1, Int40.Min);
            return outVal;
        }
        case 7: {
            const outVal = randomNegativeIntBetween(Int40.Min - 1, Int48.Min);
            return outVal;
        }
        case 8: {
            const outVal = randomNegativeIntBetween(Int48.Min - 1, Number.MIN_SAFE_INTEGER);
            return outVal;
        }
        case 9: {
            const outVal = randomPositiveIntBetween(0, Uint6.Max);
            return outVal;
        }
        case 10: {
            const outVal = randomPositiveIntBetween(Uint6.Max + 1, Uint8.Max);
            return outVal;
        }
        case 11: {
            const outVal = randomPositiveIntBetween(Uint8.Max + 1, Uint16.Max);
            return outVal;
        }
        case 12: {
            const outVal = randomPositiveIntBetween(Uint16.Max + 1, Uint24.Max);
            return outVal;
        }
        case 13: {
            const outVal = randomPositiveIntBetween(Uint24.Max + 1, Uint32.Max);
            return outVal;
        }
        case 14: {
            const outVal = randomPositiveIntBetween(Uint32.Max + 1, Uint40.Max);
            return outVal;
        }
        case 15: {
            const outVal = randomPositiveIntBetween(Uint40.Max + 1, Uint48.Max);
            return outVal;
        }
        case 16: {
            const outVal = randomPositiveIntBetween(Uint48.Max + 1, Number.MAX_SAFE_INTEGER);
            return outVal;
        }
        case 17: {
            const outVal = randomFloatBetween(Float32.Min, Float32.Max);
            return outVal;
        }
        case 18: {
            const outVal = randomFloatBetween(Number.MIN_VALUE, Number.MAX_VALUE);
            return outVal;
        }
        case 19: {
            const outVal = toString(randomPositiveIntBetween(1, String5.Max));
            return outVal;
        }
        case 20: {
            const outVal = toString(randomPositiveIntBetween(String5.Max + 1, String8.Max));
            return outVal;
        }
        case 21: {
            const outVal = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
            return outVal;
        }
    }
}

export function runGc(): void {
    if (global.gc) {
        global.gc();
    }
}