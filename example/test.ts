import { testArraySync } from "./sync-test/array";
import { testBinarySync } from "./sync-test/binary";
import { testBooleanSync } from "./sync-test/boolean";
import { testExt } from "./sync-test/extension";
import { testMapSync } from "./sync-test/map";
import { testNull3Sync } from "./sync-test/null";
import { testNumberSync } from "./sync-test/number";
import { testObjectSync } from "./sync-test/object";
import { testStringSync } from "./sync-test/string";
import { testTimestamp } from "./sync-test/timestamp";

if (
    testNull3Sync() &&
    testBooleanSync() &&
    testNumberSync() &&
    testStringSync() &&
    testTimestamp() &&
    testBinarySync() &&
    testArraySync() &&
    testObjectSync() &&
    testMapSync() &&
    testExt() &&
    true
) {
    console.log("All tests passed");
    process.exit(0);
}
console.log("Some tests failed");
process.exit(1);