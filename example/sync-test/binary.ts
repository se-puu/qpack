import { QDecoder } from "../../src/decoder/decoder";
import { QEncoder } from "../../src/encoder/encoder";
import { Binary16, Binary24,  Binary8, Uint16, Uint32 } from "../../src/lib/size-enum";
import { isEqual, logTextMaker, randomBuf, runGc } from "../lib";

export function _testBinary8Sync(binary: Uint8Array | Uint16Array | Uint32Array | BigUint64Array | Int8Array | Int16Array | Int32Array | BigInt64Array | Float32Array | Float64Array | DataView): boolean {
    const data=new Uint8Array(binary.buffer,binary.byteOffset,binary.byteLength);
    const encoder = QEncoder.create();
    const buf = encoder.encode(binary);
    if (!buf) {
        return false;
    }
    const decoder=QDecoder.create();
        const decode = decoder.decode<Uint8Array>(buf);
    if(!decode){
        return false;
    }
    return isEqual(data, decode,encoder.__extRegistry);;
}


export function testBinarySyncHeavy(): boolean {
    let outputText = "Binary\t\t>>>";
    let status=true;
    // uint8
    outputText += logTextMaker(_testBinary8Sync(new Uint8Array()) ? status&&=true : status=false, `blank Uint8`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint8Array(randomBuf.buffer,randomBuf.byteOffset,Binary8.Max)) ? status&&=true : status=false, `binary8 Uint8 Len:${Binary8.Max}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint8Array(randomBuf.buffer,randomBuf.byteOffset,Binary16.Max)) ? status&&=true : status=false, `binary16 Uint8 Len:${Binary16.Max}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint8Array(randomBuf.buffer,randomBuf.byteOffset,Binary24.Max)) ? status&&=true : status=false, `binary24 Uint8 Len:${Binary24.Max}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint8Array(randomBuf.buffer,randomBuf.byteOffset,randomBuf.length)) ? status&&=true : status=false, `binary32 Uint8 Len:${randomBuf.length}`, "✓", "✗");
    console.log(outputText);
    runGc();
    outputText = "\t\t>>>";
    // uint16
    outputText += logTextMaker(_testBinary8Sync(new Uint16Array()) ? status&&=true : status=false, `blank Uint16`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint16Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Uint16.Size))) ? status&&=true : status=false, `binary8 Uint16 Len:${to8Len(Binary8.Max,Uint16.Size)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint16Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary16.Max,Uint16.Size))) ? status&&=true : status=false, `binary16 Uint16 Len:${to8Len(Binary16.Max,Uint16.Size)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint16Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary24.Max,Uint16.Size))) ? status&&=true : status=false, `binary24 Uint16 Len:${to8Len(Binary24.Max,Uint16.Size)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint16Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(randomBuf.length,Uint16.Size))) ? status&&=true : status=false, `binary32 Uint16 Len:${to8Len(randomBuf.length,Uint16.Size)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //unint32
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Uint32Array()) ? status&&=true : status=false, `blank Uint32`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Uint32.Size))) ? status&&=true : status=false, `binary8 Uint32 Len:${to8Len(Binary8.Max,Uint32.Size)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary16.Max,Uint32.Size))) ? status&&=true : status=false, `binary16 Uint32 Len:${to8Len(Binary16.Max,Uint32.Size)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary24.Max,Uint32.Size))) ? status&&=true : status=false, `binary24 Uint32 Len:${to8Len(Binary24.Max,Uint32.Size)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(randomBuf.length,Uint32.Size))) ? status&&=true : status=false, `binary32 Uint32 Len:${to8Len(randomBuf.length,Uint32.Size)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //biguint64
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new BigUint64Array()) ? status&&=true : status=false, `blank BigUint64`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new BigUint64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,BigUint64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 BigUint64 Len:${to8Len(Binary8.Max,BigUint64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new BigUint64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary16.Max,BigUint64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary16 BigUint64 Len:${to8Len(Binary16.Max,BigUint64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new BigUint64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary24.Max,BigUint64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary24 BigUint64 Len:${to8Len(Binary24.Max,BigUint64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new BigUint64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(randomBuf.length,BigUint64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary32 BigUint64 Len:${to8Len(randomBuf.length,BigUint64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //int8
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Int8Array()) ? status&&=true : status=false, `blank Int8`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int8Array(randomBuf.buffer,randomBuf.byteOffset,Binary8.Max)) ? status&&=true : status=false, `binary8 Int8 Len:${Binary8.Max}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int8Array(randomBuf.buffer,randomBuf.byteOffset,Binary16.Max)) ? status&&=true : status=false, `binary16 Int8 Len:${Binary16.Max}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int8Array(randomBuf.buffer,randomBuf.byteOffset,Binary24.Max)) ? status&&=true : status=false, `binary24 Int8 Len:${Binary24.Max}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int8Array(randomBuf.buffer,randomBuf.byteOffset,randomBuf.length)) ? status&&=true : status=false, `binary32 Int8 Len:${randomBuf.length}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //int16
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Int16Array()) ? status&&=true : status=false, `blank Int16`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int16Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Int16Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 Int16 Len:${to8Len(Binary8.Max,Int16Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int16Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary16.Max,Int16Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary16 Int16 Len:${to8Len(Binary16.Max,Int16Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int16Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary24.Max,Int16Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary24 Int16 Len:${to8Len(Binary24.Max,Int16Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int16Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(randomBuf.length,Int16Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary32 Int16 Len:${to8Len(randomBuf.length,Int16Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //int32
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Int32Array()) ? status&&=true : status=false, `blank Int32`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Int32Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 Int32 Len:${to8Len(Binary8.Max,Int32Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary16.Max,Int32Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary16 Int32 Len:${to8Len(Binary16.Max,Int32Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary24.Max,Int32Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary24 Int32 Len:${to8Len(Binary24.Max,Int32Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(randomBuf.length,Int32Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary32 Int32 Len:${to8Len(randomBuf.length,Int32Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //bigint64
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new BigInt64Array()) ? status&&=true : status=false, `blank BigInt64`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new BigInt64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,BigInt64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 BigInt64 Len:${to8Len(Binary8.Max,BigInt64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new BigInt64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary16.Max,BigInt64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary16 BigInt64 Len:${to8Len(Binary16.Max,BigInt64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new BigInt64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary24.Max,BigInt64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary24 BigInt64 Len:${to8Len(Binary24.Max,BigInt64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new BigInt64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(randomBuf.length,BigInt64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary32 BigInt64 Len:${to8Len(randomBuf.length,BigInt64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //float32
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Float32Array()) ? status&&=true : status=false, `blank Float32`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Float32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Float32Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 Float32 Len:${to8Len(Binary8.Max,Float32Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Float32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary16.Max,Float32Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary16 Float32 Len:${to8Len(Binary16.Max,Float32Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Float32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary24.Max,Float32Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary24 Float32 Len:${to8Len(Binary24.Max,Float32Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Float32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(randomBuf.length,Float32Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary32 Float32 Len:${to8Len(randomBuf.length,Float32Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //float64
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Float64Array()) ? status&&=true : status=false, `blank Float64`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Float64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Float64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 Float64 Len:${to8Len(Binary8.Max,Float64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Float64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary16.Max,Float64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary16 Float64 Len:${to8Len(Binary16.Max,Float64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Float64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary24.Max,Float64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary24 Float64 Len:${to8Len(Binary24.Max,Float64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Float64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(randomBuf.length,Float64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary32 Float64 Len:${to8Len(randomBuf.length,Float64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //dataview
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new DataView(new ArrayBuffer(0))) ? status&&=true : status=false, `blank DataView`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new DataView(randomBuf.buffer,randomBuf.byteOffset,Binary8.Max)) ? status&&=true : status=false, `binary8 DataView Len:${Binary8.Max}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new DataView(randomBuf.buffer,randomBuf.byteOffset,Binary16.Max)) ? status&&=true : status=false, `binary16 DataView Len:${Binary16.Max}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new DataView(randomBuf.buffer,randomBuf.byteOffset,Binary24.Max)) ? status&&=true : status=false, `binary24 DataView Len:${Binary24.Max}`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new DataView(randomBuf.buffer,randomBuf.byteOffset,randomBuf.length)) ? status&&=true : status=false, `binary32 DataView Len:${randomBuf.length}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
export function testBinarySync(): boolean {
    let outputText = "Binary\t\t>>>";
    let status=true;
    // uint8
    outputText += logTextMaker(_testBinary8Sync(new Uint8Array()) ? status&&=true : status=false, `blank Uint8`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint8Array(randomBuf.buffer,randomBuf.byteOffset,Binary8.Max)) ? status&&=true : status=false, `binary8 Uint8 Len:${Binary8.Max}`, "✓", "✗");
    console.log(outputText);
    runGc();
    outputText = "\t\t>>>";
    // uint16
    outputText += logTextMaker(_testBinary8Sync(new Uint16Array()) ? status&&=true : status=false, `blank Uint16`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint16Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Uint16.Size))) ? status&&=true : status=false, `binary8 Uint16 Len:${to8Len(Binary8.Max,Uint16.Size)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //unint32
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Uint32Array()) ? status&&=true : status=false, `blank Uint32`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Uint32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Uint32.Size))) ? status&&=true : status=false, `binary8 Uint32 Len:${to8Len(Binary8.Max,Uint32.Size)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //biguint64
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new BigUint64Array()) ? status&&=true : status=false, `blank BigUint64`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new BigUint64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,BigUint64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 BigUint64 Len:${to8Len(Binary8.Max,BigUint64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //int8
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Int8Array()) ? status&&=true : status=false, `blank Int8`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int8Array(randomBuf.buffer,randomBuf.byteOffset,Binary8.Max)) ? status&&=true : status=false, `binary8 Int8 Len:${Binary8.Max}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //int16
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Int16Array()) ? status&&=true : status=false, `blank Int16`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int16Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Int16Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 Int16 Len:${to8Len(Binary8.Max,Int16Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //int32
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Int32Array()) ? status&&=true : status=false, `blank Int32`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Int32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Int32Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 Int32 Len:${to8Len(Binary8.Max,Int32Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //bigint64
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new BigInt64Array()) ? status&&=true : status=false, `blank BigInt64`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new BigInt64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,BigInt64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 BigInt64 Len:${to8Len(Binary8.Max,BigInt64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //float32
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Float32Array()) ? status&&=true : status=false, `blank Float32`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Float32Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Float32Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 Float32 Len:${to8Len(Binary8.Max,Float32Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //float64
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new Float64Array()) ? status&&=true : status=false, `blank Float64`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new Float64Array(randomBuf.buffer,randomBuf.byteOffset,to8Len(Binary8.Max,Float64Array.BYTES_PER_ELEMENT))) ? status&&=true : status=false, `binary8 Float64 Len:${to8Len(Binary8.Max,Float64Array.BYTES_PER_ELEMENT)}`, "✓", "✗");
    console.log(outputText);
    runGc();
    //dataview
    outputText = "\t\t>>>";
    outputText += logTextMaker(_testBinary8Sync(new DataView(new ArrayBuffer(0))) ? status&&=true : status=false, `blank DataView`, "✓", "✗");
    outputText += logTextMaker(_testBinary8Sync(new DataView(randomBuf.buffer,randomBuf.byteOffset,Binary8.Max)) ? status&&=true : status=false, `binary8 DataView Len:${Binary8.Max}`, "✓", "✗");
    console.log(outputText);
    runGc();
    return status;
}
function to8Len(len:number,size:number):number{
    return Math.floor((len-1)/size);
}
