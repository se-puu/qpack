import { QDecoder } from "../../src/decoder/decoder";
import { QEncoder } from "../../src/encoder/encoder";
import { ExtRegistry, ExtEntry } from "../../src/lib/ext-registry";
import { isEqual, logTextMaker, runGc } from "../lib";
import { TestExt16_1 } from "./extension-16";
import { TestExt24_1 } from "./extension-24";
import { TestExt32_1, TestExt32_2 } from "./extension-32";
import { TestExt8_1 } from "./extension-8";

function _testExt(classD: unknown,extRegistry:ExtRegistry): boolean {
    const data = new (classD as ExtEntry<object> & {new()})();
    if(!extRegistry.register(classD as ExtEntry<object>)){
        return false;
    }
    const encoder = QEncoder.create({extRegistry});
    const buf = encoder.encode(data);
    if (!buf) {
        return false;
    }
    const decoder = QDecoder.create({extRegistry});
    const decode = decoder.decode<typeof classD>(buf);
    if (decode === undefined) {
        return false;
    }
    return isEqual(data, decode, encoder.__extRegistry);
}
export function testExtHeavy(): boolean {
    let outputText = "Extension\t>>>";
    let status = true;
    const extRegistry = ExtRegistry.create();
    outputText += logTextMaker(_testExt(TestExt8_1,extRegistry) ? status &&= true : status = false, `Extension8 test1`, "✓", "✗");
    outputText += logTextMaker(_testExt(TestExt16_1,extRegistry) ? status &&= true : status = false, `Extension16 test1`, "✓", "✗");
    outputText += logTextMaker(_testExt(TestExt24_1,extRegistry) ? status &&= true : status = false, `Extension24 test1`, "✓", "✗");
    outputText += logTextMaker(_testExt(TestExt32_1,extRegistry) ? status &&= true : status = false, `Extension32 test1`, "✓", "✗");
    outputText += logTextMaker(_testExt(TestExt32_2,extRegistry) ? status &&= true : status = false, `Extension32 test2`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
export function testExt(): boolean {
    let outputText = "Extension\t>>>";
    let status = true;
    const extRegistry = ExtRegistry.create();
    outputText += logTextMaker(_testExt(TestExt8_1,extRegistry) ? status &&= true : status = false, `Extension8 test1`, "✓", "✗");
    outputText += logTextMaker(_testExt(TestExt16_1,extRegistry) ? status &&= true : status = false, `Extension16 test1`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}