import { QDecoder } from "../../src/decoder/decoder";
import { QEncoder } from "../../src/encoder/encoder";
import { isEqual, logTextMaker } from "../lib";

function _testBooleanSync(data:boolean): boolean {
    const encoder = QEncoder.create();
    const buf = encoder.encode(data);
    if (!buf) {
        return false;
    }
    const decoder=QDecoder.create();
        const decode = decoder.decode<undefined>(buf);
    if(decode===undefined){
        return false;
    }
    return isEqual(data, decode,encoder.__extRegistry);;
}
export function testBooleanSync(): boolean {
    let outputText = "Boolean\t\t>>>";
    let status=true;
    outputText+=logTextMaker(_testBooleanSync(true) ? status&&=true : status=false,"true","✓","✗");
    outputText+=logTextMaker(_testBooleanSync(false) ? status&&=true : status=false,"false","✓","✗");
    console.log(outputText);
    return status;
}