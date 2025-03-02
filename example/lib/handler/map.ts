import { isEqual } from "..";
import { ExtRegistry } from "../../../src/lib/ext-registry";

// b may be decoded value that neglect novalue like function and symbol.
export function isEqualMap(src:Map<unknown,unknown>,dest:Map<unknown,unknown>,handler:ExtRegistry):boolean {
    let skipped=0;
    const srcIte = src.entries();
    let srcResult = srcIte.next();
    const destIte = dest.entries();
    let destResult = destIte.next();
    while (!srcResult.done && !destResult.done) {
        const [srcKey, srcVal] = srcResult.value;
        if (srcKey !== null && srcKey !== undefined) {
            if (!handler.__encoder.has(srcKey.constructor)) {
                skipped++;
                srcResult = srcIte.next();
                continue;
            }
        }
        const [destKey, destVal] = destResult.value;
        if(!isEqual(srcKey,destKey,handler)) {
            return false;
        }
        if(!isEqual(srcVal,destVal,handler)) {
            return false;
        }
        destResult = destIte.next();
        srcResult = srcIte.next();
    }
    if((src.size-skipped)!==dest.size) {
        return false;
    }
    return true;
}