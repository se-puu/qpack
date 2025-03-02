import { QDecoder } from '../../src/decoder/decoder';
import { QEncoder } from '../../src/encoder/encoder';
import { Float32, Int16, Int24, Int32, Int40, Int48, Int8, Nint5, Uint6, Uint16, Uint24, Uint32, Uint40, Uint48, Uint8} from '../../src/lib/size-enum';
import { isEqual, logTextMaker, randomFloat, randomNegativeIntBetween, randomPositiveIntBetween } from '../lib';

function _testNumber(data: number): boolean {
    const encoder = QEncoder.create();
    const buf = encoder.encode(data);
    if (!buf) {
        return false;
    }
    const decoder=QDecoder.create();
        const decode = decoder.decode<number>(buf);
    if (decode === undefined) {
        return false;
    }
    return isEqual(data, decode,encoder.__extRegistry);;
}

function testUintSync(): boolean {
    let ranVal=0;
    let outputText = "Uint\t\t>>>";
    let status=true;
    outputText += logTextMaker(_testNumber(Uint6.Min) ? status&&=true : status=false, `6bit min:${Uint6.Min}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Uint6.Max) ? status&&=true : status=false, `6bit max:${Uint6.Max}`, "✓", "✗");
    ranVal=randomPositiveIntBetween(Uint6.Min,Uint6.Max);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `6bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testNumber(Uint6.Max + 1) ? status&&=true : status=false, `8bit min:${Uint6.Max+1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Uint8.Max) ? status&&=true : status=false, `8bit max:${Uint8.Max}`, "✓", "✗");
    ranVal=randomPositiveIntBetween(Uint6.Max + 1,Uint8.Max);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `8bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testNumber(Uint8.Max + 1) ? status&&=true : status=false, `16bit min:${Uint8.Max+1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Uint16.Max) ? status&&=true : status=false, `16bit max:${Uint16.Max}`, "✓", "✗");
    ranVal=randomPositiveIntBetween(Uint8.Max + 1,Uint16.Max);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `16bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testNumber(Uint16.Max + 1) ? status&&=true : status=false, `24bit min:${Uint16.Max+1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Uint24.Max) ? status&&=true : status=false, `24bit max:${Uint24.Max}`, "✓", "✗");
    ranVal=randomPositiveIntBetween(Uint16.Max + 1,Uint24.Max);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `24bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText="\t\t>>>";
    outputText += logTextMaker(_testNumber(Uint24.Max + 1) ? status&&=true : status=false, `32bit min:${Uint24.Max+1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Uint32.Max) ? status&&=true : status=false, `32bit max:${Uint32.Max}`, "✓", "✗");
    ranVal=randomPositiveIntBetween(Uint24.Max + 1,Uint32.Max);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `32bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText="\t\t>>>";
    outputText += logTextMaker(_testNumber(Uint32.Max + 1) ? status&&=true : status=false, `40bit min:${Uint32.Max+1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Uint40.Max) ? status&&=true : status=false, `40bit max:${Uint40.Max}`, "✓", "✗");
    ranVal=randomPositiveIntBetween(Uint32.Max + 1,Uint40.Max);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `40bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText="\t\t>>>";
    outputText += logTextMaker(_testNumber(Uint40.Max + 1) ? status&&=true : status=false, `48bit min:${Uint40.Max+1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Uint48.Max) ? status&&=true : status=false, `48bit max:${Uint48.Max}`, "✓", "✗");
    ranVal=randomPositiveIntBetween(Uint40.Max + 1,Uint48.Max);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `48bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText="\t\t>>>";
    outputText += logTextMaker(_testNumber(Uint48.Max + 1) ? status&&=true : status=false, `safeUint min:${Uint48.Max+1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Number.MAX_SAFE_INTEGER) ? status&&=true : status=false, `safeUint max:${Number.MAX_SAFE_INTEGER}`, "✓", "✗");
    ranVal=randomPositiveIntBetween(Uint48.Max + 1,Number.MAX_SAFE_INTEGER);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `safeUint random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    return status;
}
function testIntSync(): boolean {
    let ranVal=0;
    let outputText = "Int\t\t>>>";
    let status=true;
    outputText += logTextMaker(_testNumber(Nint5.Max) ? status&&=true : status=false, `nint5 max:${Nint5.Max}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Nint5.Min) ? status&&=true : status=false, `nint5 min:${Nint5.Min}`, "✓", "✗");
    ranVal=randomNegativeIntBetween(Nint5.Min,Nint5.Max);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `nint5 random${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testNumber(Nint5.Min -1 ) ? status&&=true : status=false, `8bit max:${Nint5.Min-1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Int8.Min) ? status&&=true : status=false, `8bit min:${Nint5.Min}`, "✓", "✗");
    ranVal=randomNegativeIntBetween(Nint5.Min - 1,Int8.Min);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `8bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testNumber(Int8.Min - 1) ? status&&=true : status=false, `16bit max:${Int8.Min-1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Int16.Min) ? status&&=true : status=false, `16bit min:${Int16.Min}`, "✓", "✗");
    ranVal=randomNegativeIntBetween(Int8.Min - 1,Int16.Min);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `16bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testNumber(Int16.Min - 1) ? status&&=true : status=false, `24bit max:${Int16.Min-1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Int24.Min) ? status&&=true : status=false, `24bit min:${Int24.Min}`, "✓", "✗");
    ranVal=randomNegativeIntBetween(Int16.Min - 1,Int24.Min);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `24bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText="\t\t>>>";
    outputText += logTextMaker(_testNumber(Int24.Min - 1) ? status&&=true : status=false, `32bit max:${Int24.Min-1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Int32.Min) ? status&&=true : status=false, `32bit min:${Int32.Min}`, "✓", "✗");
    ranVal=randomNegativeIntBetween(Int24.Min - 1,Int32.Min);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `32bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText="\t\t>>>";
    outputText += logTextMaker(_testNumber(Int32.Min - 1) ? status&&=true : status=false, `40bit max:${Int32.Min-1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Int40.Min) ? status&&=true : status=false, `40bit min:${Int40.Min}`, "✓", "✗");
    ranVal=randomNegativeIntBetween(Int32.Min - 1,Int40.Min);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `40bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText="\t\t>>>";
    outputText += logTextMaker(_testNumber(Int40.Min - 1) ? status&&=true : status=false, `48bit max:${Int40.Min-1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Int48.Min) ? status&&=true : status=false, `48bit min:${Int48.Min}`, "✓", "✗");
    ranVal=randomNegativeIntBetween(Int40.Min - 1,Int48.Min);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `48bit random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    outputText="\t\t>>>";
    outputText += logTextMaker(_testNumber(Int48.Min - 1) ? status&&=true : status=false, `safeInt max:${Int48.Min-1}`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Number.MIN_SAFE_INTEGER) ? status&&=true : status=false, `safeInt min:${Number.MIN_SAFE_INTEGER}`, "✓", "✗");
    ranVal=randomNegativeIntBetween(Int48.Min - 1,Number.MIN_SAFE_INTEGER);
    outputText += logTextMaker(_testNumber(ranVal) ? status&&=true : status=false, `safeInt random:${ranVal}`, "✓", "✗");
    console.log(outputText);
    return status;
}

function testFloat32Sync(): boolean {
    let outputText = "Float\t\t>>>";
    let status=true;
    outputText += logTextMaker(_testNumber(0) ? status&&=true : status=false, `32bit min`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Float32.Max/1) ? status&&=true : status=false, `32bit max`, "✓", "✗");
    outputText += logTextMaker(_testNumber(randomFloat(Float32.Max)) ? status&&=true : status=false, `32bit random`, "✓", "✗");
    console.log(outputText);
    return status;
}
function testFloat64Sync(): boolean {
    let outputText = "\t\t>>>";
    let status=true;
    outputText += logTextMaker(_testNumber(0) ? status&&=true : status=false, `64bit min`, "✓", "✗");
    outputText += logTextMaker(_testNumber(Number.MAX_VALUE) ? status&&=true : status=false, `64bit max`, "✓", "✗");
    outputText += logTextMaker(_testNumber(randomFloat(Number.MAX_VALUE)) ? status&&=true : status=false, `64bit random`, "✓", "✗");
    console.log(outputText);
    return status;
}
export function testNumberSync(): boolean {
    return (
        testUintSync() &&
        testIntSync() &&
        testFloat32Sync() &&
        testFloat64Sync()
    );
}
