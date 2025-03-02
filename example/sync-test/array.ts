import { QDecoder } from "../../src/decoder/decoder";
import { QEncoder } from "../../src/encoder/encoder";
import { Array16, Array24, Array32, Array5, Array8, String5 } from "../../src/lib/size-enum";
import { isEqual, logTextMaker, maxStrLen, randomHeavyArray, randomLightArray, randomPositiveIntBetween, runGc } from "../lib";

function _testArraySync(data: unknown[]): boolean {
    const encoder = QEncoder.create();
    const buf = encoder.encode(data);
    if (!buf) {
        return false;
    }
    const decoder = QDecoder.create();
    const decode = decoder.decode<undefined>(buf);
    if (decode === undefined) {
        return false;
    }
    return isEqual(data, decode, encoder.__extRegistry);
}
function testArray5bitSync(): boolean {
    let ranVal = 0;
    let outputText = "Array5\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testArraySync([]) ? status &&= true : status = false, `min Len:0`, "✓", "✗");
    outputText += logTextMaker(_testArraySync(randomHeavyArray(Array5.Max)) ? status &&= true : status = false, `max Len:${String5.Max}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(0, Array5.Max);
    outputText += logTextMaker(_testArraySync(randomHeavyArray(ranVal)) ? status &&= true : status = false, `random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testArray8bitSync(): boolean {
    let ranVal = 0;
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testArraySync(randomHeavyArray(Array5.Max + 1)) ? status &&= true : status = false, `min Len:${Array5.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testArraySync(randomLightArray(Array8.Max)) ? status &&= true : status = false, `max Len:${Array8.Max}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(Array5.Max + 1, Array8.Max);
    outputText += logTextMaker(_testArraySync(randomHeavyArray(ranVal)) ? status &&= true : status = false, `random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testArray16bitSync(): boolean {
    let ranVal = 0;
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testArraySync(randomLightArray(Array8.Max + 1)) ? status &&= true : status = false, `min Len:${Array8.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testArraySync(randomLightArray(Array16.Max)) ? status &&= true : status = false, `max Len:${Array16.Max}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(Array8.Max + 1, Array16.Max);
    outputText += logTextMaker(_testArraySync(randomLightArray(ranVal)) ? status &&= true : status = false, `random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testArray24bitSync(): boolean {
    let ranVal = 0;
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testArraySync(randomLightArray(Array16.Max + 1)) ? status &&= true : status = false, `min Len:${Array16.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testArraySync(randomLightArray(Array24.Max)) ? status &&= true : status = false, `max Len:${Array24.Max}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(Array16.Max + 1, Array24.Max);
    outputText += logTextMaker(_testArraySync(randomLightArray(ranVal)) ? status &&= true : status = false, `random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testArray32bitSync(): boolean {
    let ranVal = 0;
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testArraySync(randomLightArray(Array24.Max + 1)) ? status &&= true : status = false, `min Len:${Array24.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testArraySync(randomLightArray(Math.floor(Array32.Max / 200))) ? status &&= true : status = false, `max Len:${Math.floor(Array32.Max / 200)}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(Array24.Max + 1, Math.floor(Array32.Max / 200));
    outputText += logTextMaker(_testArraySync(randomLightArray(ranVal)) ? status &&= true : status = false, `random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
export function testArraySync(): boolean {
    const status=testArray5bitSync() && testArray8bitSync();
    return status;
}
export function testArraySyncHeavy(): boolean {
    const status=testArray5bitSync() && testArray8bitSync() && testArray16bitSync() && testArray24bitSync() && testArray32bitSync();
    return status;
}