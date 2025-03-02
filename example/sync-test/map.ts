import { QDecoder } from "../../src/decoder/decoder";
import { QEncoder } from "../../src/encoder/encoder";
import { Float32, Map16, Map24, Map8 } from "../../src/lib/size-enum";
import { isEqual, logTextMaker, randomHeavyMap, randomLightMap, randomPositiveIntBetween, runGc } from "../lib";

function _testMapSync(data: Map<unknown, unknown>): boolean {
    const encoder = QEncoder.create();
    const buf = encoder.encode(data);
    if (!buf) {
        return false;
    }
    // console.log("object",buf.__bufferOffset,((new TextEncoder()).encode(JSON.stringify(data))).length);
    const bufferData = buf;
    const decoder = QDecoder.create();
    const decode = decoder.decode<undefined>(bufferData);
    if (decode === undefined) {
        return false;
    }
    const status = isEqual(data, decode, encoder.__extRegistry);
    return status;
}
function testMapSyncCustom(): boolean {
    let outputText = "Map\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testMapSync(new Map()) ? status &&= true : status = false, `empty`, "✓", "✗");
    const customMap = new Map();
    customMap.set("Number.MIN_SAFE_INTEGER+1000kjdfklsdjaklfjaslkdjflkasjdflkjaslkdjflkajsdflkjdkdkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", Number.MAX_VALUE);
    customMap.set(Symbol("data"), Number.MAX_VALUE);
    customMap.set(Float32.Max - 1, Number.MAX_VALUE);
    customMap.set(1.4127410342700995e+38, "ACEGIKMOQSACEGIKMOQSACEGIKMO");
    customMap.set(Number.MIN_SAFE_INTEGER + 1000, Number.MAX_VALUE);
    customMap.set(Number.MAX_SAFE_INTEGER - 1000, true);
    outputText += logTextMaker(_testMapSync(customMap) ? status &&= true : status = false, `custom`, "✓", "✗");
    outputText += logTextMaker(_testMapSync(randomHeavyMap(5)) ? status &&= true : status = false, `heavy map Len:5`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testMap8bitSync(): boolean {
    let ranVal = 0;
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testMapSync(randomLightMap(Map8.Max)) ? status &&= true : status = false, `8bit max Len:${Map8.Max}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(0, Map8.Max);
    outputText += logTextMaker(_testMapSync(randomLightMap(ranVal)) ? status &&= true : status = false, `8bit random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testMap16bitSync(): boolean {
    let ranVal = 0;
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testMapSync(randomLightMap(Map8.Max + 1)) ? status &&= true : status = false, `16bit min Len:${Map8.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testMapSync(randomLightMap(Map16.Max)) ? status &&= true : status = false, `16bit max Len:${Map16.Max}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(Map8.Max + 1, Map16.Max);
    outputText += logTextMaker(_testMapSync(randomLightMap(ranVal)) ? status &&= true : status = false, `16bit random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testMap24bitSync(): boolean {
    let ranVal = 0;
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testMapSync(randomLightMap(Map16.Max + 1)) ? status &&= true : status = false, `24bit min Len:${Map16.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testMapSync(randomLightMap(Map24.Max)) ? status &&= true : status = false, `24bit max Len:${Map24.Max}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(Map16.Max + 1, Map24.Max);
    outputText += logTextMaker(_testMapSync(randomLightMap(ranVal)) ? status &&= true : status = false, `24bit random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testMap32bitSync(): boolean {
    let ranVal = 0;
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testMapSync(randomLightMap(Map24.Max + 1)) ? status &&= true : status = false, `32bit min Len:${Map24.Max + 1}`, "✓", "✗");
    // max map is Map24.Max + 1
    ranVal = randomPositiveIntBetween(Map24.Max + 1, Map24.Max + 1);
    outputText += logTextMaker(_testMapSync(randomLightMap(ranVal)) ? status &&= true : status = false, `32bit random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
export function testMapSyncHeavy(): boolean {
    const status = testMapSyncCustom() && testMap8bitSync() && testMap16bitSync() && testMap24bitSync() && testMap32bitSync();
    return status;
}
export function testMapSync(): boolean {
    const status = testMapSyncCustom() && testMap8bitSync();
    return status;
}