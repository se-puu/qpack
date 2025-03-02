import { testArraySync, testArraySyncHeavy } from "./sync-test/array";
import { testBinarySync } from "./sync-test/binary";
import { testBooleanSync } from "./sync-test/boolean";
import { testExt, testExtHeavy } from "./sync-test/extension";
import { testMapSyncHeavy } from "./sync-test/map";
import { testNull3Sync } from "./sync-test/null";
import { testNumberSync } from "./sync-test/number";
import { testObjectSyncHeavy } from "./sync-test/object";
import { testStringSyncHeavy } from "./sync-test/string";
import { testTimestamp } from "./sync-test/timestamp";
if (
    testNull3Sync() &&
    testBooleanSync() &&
    testNumberSync() &&
    testStringSyncHeavy() &&
    testTimestamp() &&
    testBinarySync() &&
    testArraySyncHeavy() &&
    testObjectSyncHeavy() &&
    testMapSyncHeavy() &&
    testExtHeavy() &&
    true
) {
    console.log("All tests passed");
    process.exit(0);
}
console.log("Some tests failed");
process.exit(1);