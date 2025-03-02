import { isEqual } from "..";
import { ExtRegistry } from "../../../src/lib/ext-registry";
export function isEqualObject(a: object, b: object,handler:ExtRegistry): boolean {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
        return false;
    }
    for (const key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(b, key)) {
            return false;
        }
        if (!isEqual(a[key], b[key],handler)) {
            return false;
        }
    }
    return true;
}