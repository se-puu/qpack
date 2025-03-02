import { QDecoder } from "../../src/decoder/decoder";
import { QEncoder } from "../../src/encoder/encoder";
import { isEqual, logTextMaker, randomPositiveInt } from "../lib";

function _testTimestamp(data: Date): boolean {
    const encoder = QEncoder.create();
    const buf = encoder.encode(data);
    if (!buf) {
        return false;
    }
    const decoder=QDecoder.create();
        const decode = decoder.decode<Date>(buf);
    if (decode === undefined) {
        return false;
    }
    return isEqual(data, decode,encoder.__extRegistry);;
}
export function testTimestamp(): boolean {
    let outputText = "timestamp\t>>>";
    let status=true;
    outputText += logTextMaker(_testTimestamp(new Date(0)) ? status&&=true :status=false, `min`, "✓", "✗");
    outputText += logTextMaker(_testTimestamp(new Date()) ? status&&=true :status=false, `current`, "✓", "✗");
    outputText += logTextMaker(_testTimestamp(new Date(randomPositiveInt(2**50))) ? status&&=true :status=false, `random`, "✓", "✗");
    outputText += logTextMaker(_testTimestamp(new Date(2**40)) ? status&&=true :status=false, `6byte`, "✓", "✗");
    outputText += logTextMaker(_testTimestamp(new Date(2**50)) ? status&&=true :status=false, `8byte`, "✓", "✗");
    console.log(outputText);
    return status;
}