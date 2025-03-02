import { QDecoder } from "../../src/decoder/decoder";
import { QEncoder } from "../../src/encoder/encoder";
import { isEqual, logTextMaker, runGc } from "../lib";

function _testNull3Sync(data: undefined | null | typeof NaN): boolean {
    const encoder = QEncoder.create();
    const buf = encoder.encode(data);
    if (!buf) {
        return false;
    }
    const decoder = QDecoder.create();
    const decode = decoder.decode<undefined>(buf);
    return isEqual(undefined, decode, encoder.__extRegistry);
}
export function testNull3Sync(): boolean {
    let outputText = "Null3\t\t>>>";
    let status = true;
    outputText += logTextMaker(_testNull3Sync(undefined) ? status &&= true : status = false, "undefined", "✓", "✗");
    outputText += logTextMaker(_testNull3Sync(null) ? status &&= true : status = false, "null", "✓", "✗");
    outputText += logTextMaker(_testNull3Sync(NaN) ? status &&= true : status = false, "NaN", "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}