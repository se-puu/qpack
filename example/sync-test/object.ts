import { QDecoder } from "../../src/decoder/decoder";
import { QEncoder } from "../../src/encoder/encoder";
import { Object16,  Object5, Object8 } from "../../src/lib/size-enum";
import { isEqual, logTextMaker, randomHeavyObject, randomLightObject, randomPositiveIntBetween, runGc } from "../lib";

function _testObjectSync(data: object): boolean {
    const encoder = QEncoder.create();
    const buf = encoder.encode(data);
    if (!buf) {
        return false;
    }
    // console.log("object",buf.__bufferOffset,((new TextEncoder()).encode(JSON.stringify(data))).length);
    const decoder=QDecoder.create();
        const decode = decoder.decode<undefined>(buf);
    if (decode === undefined) {
        return false;
    }
    return isEqual(data, decode,encoder.__extRegistry);;
}

export function testObject5bitSync(): boolean {
    let ranVal = 0;
    let outputText = "Object\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testObjectSync({}) ? status &&= true : status = false, `5bit min Len:0`, "✓", "✗");
    outputText += logTextMaker(_testObjectSync(randomHeavyObject(Object5.Max)) ? status &&= true : status = false, `5bit max Len:${Object5.Max}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(0, Object5.Max);
    outputText += logTextMaker(_testObjectSync(randomHeavyObject(ranVal)) ? status &&= true : status = false, `5bit random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}

export function testObject8bitSync(): boolean {
    let ranVal = 0;
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testObjectSync(randomLightObject(Object5.Max + 1)) ? status &&= true : status = false, `8bit min Len:${Object5.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testObjectSync(randomLightObject(Object8.Max)) ? status &&= true : status = false, `8bit max Len:${Object8.Max}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(Object5.Max + 1, Object8.Max);
    outputText += logTextMaker(_testObjectSync(randomLightObject(ranVal)) ? status &&= true : status = false, `8bit random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}

export function testObject16bitSync(): boolean {
    let ranVal = 0;
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testObjectSync(randomLightObject(Object8.Max + 1)) ? status &&= true : status = false, `16bit min Len:${Object8.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testObjectSync(randomLightObject(Object16.Max)) ? status &&= true : status = false, `16bit max Len:${Object16.Max}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(Object8.Max + 1, Object16.Max);
    outputText += logTextMaker(_testObjectSync(randomLightObject(ranVal)) ? status &&= true : status = false, `16bit random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}

export function testObject32bitSync(): boolean {
    let ranVal = 0;
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testObjectSync(randomLightObject(Object16.Max + 1)) ? status &&= true : status = false, `32bit min Len:${Object16.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testObjectSync(randomLightObject(2**20)) ? status &&= true : status = false, `32bit max Len:${2**20}`, "✓", "✗");
    ranVal = randomPositiveIntBetween(Object16.Max + 1, 2**20);
    outputText += logTextMaker(_testObjectSync(randomLightObject(ranVal)) ? status &&= true : status = false, `32bit random Len:${ranVal}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}

export function testObjectSync(): boolean {
    const status = testObject5bitSync() && testObject8bitSync();
    return status;
}
export function testObjectSyncHeavy(): boolean {
    const status = testObject5bitSync() && testObject8bitSync() && testObject16bitSync() && testObject32bitSync();
    return status;
}
// export function testObjectSyncHeavya(): boolean {
//     let ranVal = 0;
//     let outputText = "Object\t\t>>>";
//     let status = true;
//     outputText += logTextMaker(_testObjectSync({}) ? status &&= true : status = false, `5bit min Len:0`, "✓", "✗");
//     outputText += logTextMaker(_testObjectSync(randomHeavyObject(Object5.Max)) ? status &&= true : status = false, `5bit max Len:${Object5.Max}`, "✓", "✗");
//     ranVal = randomPositiveIntBetween(0, Object5.Max);
//     outputText += logTextMaker(_testObjectSync(randomHeavyObject(ranVal)) ? status &&= true : status = false, `5bit random Len:${ranVal}`, "✓", "✗");
//     console.log(outputText);
//     runGc();
//     outputText = "\t\t>>>";
//     outputText += logTextMaker(_testObjectSync(randomLightObject(Object5.Max + 1)) ? status &&= true : status = false, `8bit min Len:${Object5.Max + 1}`, "✓", "✗");
//     outputText += logTextMaker(_testObjectSync(randomLightObject(Object8.Max + 1)) ? status &&= true : status = false, `8bit max Len:${Object8.Max}`, "✓", "✗");
//     ranVal = randomPositiveIntBetween(Object5.Max + 1, Object8.Max);
//     outputText += logTextMaker(_testObjectSync(randomLightObject(ranVal)) ? status &&= true : status = false, `8bit random Len:${ranVal}`, "✓", "✗");
//     console.log(outputText);
//     runGc();
//     outputText = "\t\t>>>";
//     outputText += logTextMaker(_testObjectSync(randomLightObject(Object8.Max + 1)) ? status &&= true : status = false, `16bit min Len:${Object8.Max + 1}`, "✓", "✗");
//     outputText += logTextMaker(_testObjectSync(randomLightObject(Object16.Max)) ? status &&= true : status = false, `16bit max Len:${Object16.Max}`, "✓", "✗");
//     ranVal = randomPositiveIntBetween(Object8.Max + 1, Object16.Max);
//     outputText += logTextMaker(_testObjectSync(randomLightObject(ranVal)) ? status &&= true : status = false, `16bit random Len:${ranVal}`, "✓", "✗");
//     console.log(outputText);
//     runGc();
//     outputText = "\t\t>>>";
//     outputText += logTextMaker(_testObjectSync(randomLightObject(Object16.Max + 1)) ? status &&= true : status = false, `32bit min Len:${Object16.Max + 1}`, "✓", "✗");
//     outputText += logTextMaker(_testObjectSync(randomLightObject(2**20)) ? status &&= true : status = false, `32bit max Len:${2**20}`, "✓", "✗");
//     ranVal = randomPositiveIntBetween(Object16.Max + 1, 2**20);
//     outputText += logTextMaker(_testObjectSync(randomLightObject(ranVal)) ? status &&= true : status = false, `32bit random Len:${ranVal}`, "✓", "✗");
//     console.log(outputText);
//     runGc();
//     outputText = "\t\t>>>";
//     outputText += logTextMaker(_testObjectSync({1:23,valuea:randomLightObject(322),te:"st",valueb:randomLightObject(10),nest:{data:randomLightObject(100)}}) ? status &&= true : status = false, `nested`, "✓", "✗"); 
//     console.log(outputText);
//     runGc();
//     return status;
// }