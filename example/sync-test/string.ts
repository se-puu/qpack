import { QDecoder } from "../../src/decoder/decoder";
import { QEncoder } from "../../src/encoder/encoder";
import { String16, String24, String5, String8 } from "../../src/lib/size-enum";
import { isEqual, logTextMaker, maxStrLen, randomPositiveInt, randomPositiveIntBetween, runGc, toString } from "../lib";

function _testStringSync(data: string): boolean {
    const encoder = QEncoder.create();
    const buf = encoder.encode(data);
    if (!buf) {
        return false;
    }
    const decoder = QDecoder.create();
    const decode = decoder.decode<string>(buf);
    if (decode === undefined) {
        return false;
    }
    return isEqual(data, decode, encoder.__extRegistry);;
}
function testString5bitSync(): boolean {
    let outputText = "Utf-8 String\t>>>";
    let status = true;
    outputText += logTextMaker(_testStringSync("") ? status &&= true : status = false, `blank`, "✓", "✗");
    outputText += logTextMaker(_testStringSync(toString(String5.Max)) ? status &&= true : status = false, `5bit max Len:${String5.Max}`, "✓", "✗");
    outputText += logTextMaker(_testStringSync(toString(randomPositiveInt(String5.Max))) ? status &&= true : status = false, `5bit random`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testString8bitSync(): boolean {
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testStringSync(toString(String5.Max + 1)) ? status &&= true : status = false, `8bit min Len:${String5.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testStringSync(toString(String8.Max)) ? status &&= true : status = false, `8bit max Len:${String8.Max}`, "✓", "✗");
    outputText += logTextMaker(_testStringSync(toString(randomPositiveIntBetween(String5.Max + 1, String8.Max))) ? status &&= true : status = false, `8bit random`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testString16bitSync(): boolean {
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testStringSync(toString(String8.Max + 1)) ? status &&= true : status = false, `16bit min Len:${String8.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testStringSync(toString(String16.Max)) ? status &&= true : status = false, `16bit max Len:${String16.Max}`, "✓", "✗");
    outputText += logTextMaker(_testStringSync(toString(randomPositiveIntBetween(String8.Max + 1, String16.Max))) ? status &&= true : status = false, `16bit random`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testString24bitSync(): boolean {
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testStringSync(toString(String16.Max + 1)) ? status &&= true : status = false, `24bit min Len:${String16.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testStringSync(toString(String24.Max)) ? status &&= true : status = false, `24bit max Len:${String24.Max}`, "✓", "✗");
    outputText += logTextMaker(_testStringSync(toString(randomPositiveIntBetween(String16.Max + 1, String24.Max))) ? status &&= true : status = false, `24bit random`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testString32bitSync(): boolean {
    let outputText = "\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testStringSync(toString(String24.Max + 1)) ? status &&= true : status = false, `32bit min Len:${String24.Max + 1}`, "✓", "✗");
    outputText += logTextMaker(_testStringSync(toString(maxStrLen)) ? status &&= true : status = false, `32bit max Len:${maxStrLen}`, "✓", "✗");
    outputText += logTextMaker(_testStringSync(toString(randomPositiveIntBetween(String24.Max + 1, maxStrLen))) ? status &&= true : status = false, `32bit random`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function testStringSyncCustom(): boolean {
    let status = true;
    let outputText = "\t\t>>>";
    const realString = "👨‍🚀ă👩🏾‍💻✨µ⚡".repeat(Math.floor(maxStrLen / 10 / 4));
    outputText += logTextMaker(_testStringSync(realString) ? status &&= true : status = false, `random bit test`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
export function testStringSyncHeavy(): boolean {
    const status = testString5bitSync() && testString8bitSync() && testString16bitSync() && testString24bitSync() && testString32bitSync() && testStringSyncCustom();
    return status;
}
export function testStringSync(): boolean {
    const status = testString5bitSync() && testString8bitSync();
    return status;
}
// export function testStringSyncHeavya(): boolean {
//     let outputText = "Utf-8 String\t>>>";
//     let status = true;
//     outputText += logTextMaker(_testStringSync("") ? status &&= true : status = false, `blank`, "✓", "✗");
//     outputText += logTextMaker(_testStringSync(toString(String5.Max)) ? status &&= true : status = false, `5bit max Len:${String5.Max}`, "✓", "✗");
//     outputText += logTextMaker(_testStringSync(toString(randomPositiveInt(String5.Max))) ? status &&= true : status = false, `5bit random`, "✓", "✗");
//     console.log(outputText);
//     runGc();
//     outputText = "\t\t>>>";
//     outputText += logTextMaker(_testStringSync(toString(String5.Max + 1)) ? status &&= true : status = false, `8bit min Len:${String5.Max + 1}`, "✓", "✗");
//     outputText += logTextMaker(_testStringSync(toString(String8.Max)) ? status &&= true : status = false, `8bit max Len:${String8.Max}`, "✓", "✗");
//     outputText += logTextMaker(_testStringSync(toString(randomPositiveIntBetween(String5.Max + 1, String8.Max))) ? status &&= true : status = false, `8bit random`, "✓", "✗");
//     console.log(outputText);
//     runGc();
//     outputText = "\t\t>>>";
//     outputText += logTextMaker(_testStringSync(toString(String8.Max + 1)) ? status &&= true : status = false, `16bit min Len:${String8.Max + 1}`, "✓", "✗");
//     outputText += logTextMaker(_testStringSync(toString(String16.Max)) ? status &&= true : status = false, `16bit max Len:${String16.Max}`, "✓", "✗");
//     outputText += logTextMaker(_testStringSync(toString(randomPositiveIntBetween(String8.Max + 1, String16.Max))) ? status &&= true : status = false, `16bit random`, "✓", "✗");
//     console.log(outputText);
//     runGc();
//     outputText = "\t\t>>>";
//     outputText += logTextMaker(_testStringSync(toString(String16.Max + 1)) ? status &&= true : status = false, `24bit min Len:${String16.Max + 1}`, "✓", "✗");
//     outputText += logTextMaker(_testStringSync(toString(String24.Max)) ? status &&= true : status = false, `24bit max Len:${String24.Max}`, "✓", "✗");
//     outputText += logTextMaker(_testStringSync(toString(randomPositiveIntBetween(String16.Max + 1, String24.Max))) ? status &&= true : status = false, `24bit random`, "✓", "✗");
//     console.log(outputText);
//     runGc();
//     outputText = "\t\t>>>";
//     outputText += logTextMaker(_testStringSync(toString(String24.Max + 1)) ? status &&= true : status = false, `32bit min Len:${String24.Max + 1}`, "✓", "✗");
//     outputText += logTextMaker(_testStringSync(toString(maxStrLen)) ? status &&= true : status = false, `32bit max Len:${maxStrLen}`, "✓", "✗");
//     outputText += logTextMaker(_testStringSync(toString(randomPositiveIntBetween(String24.Max + 1, maxStrLen))) ? status &&= true : status = false, `32bit random`, "✓", "✗");
//     console.log(outputText);
//     runGc();
//     outputText = "\t\t>>>";
//     const realString = "👨‍🚀ă👩🏾‍💻✨µ⚡".repeat(Math.floor(maxStrLen / 10 / 4));
//     outputText += logTextMaker(_testStringSync(realString) ? status &&= true : status = false, `random bit test`, "✓", "✗");
//     console.log(outputText);
//     runGc();
//     return status;
// }