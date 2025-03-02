import { QDecoder } from "../../src/decoder/decoder";
import { QEncoder } from "../../src/encoder/encoder";
import { Array5, Array8, Array16, Array24, Binary8, Binary16, Binary24, Uint6, Uint8, Uint16, Uint24, Uint32, Uint40, Uint48, Nint5, Int8, Int16, Int24, Int32, Int40, Int48, Object5, Object8, Object16, String5, String8, String16, String24 } from "../../src/lib/size-enum";
import { randomLightArray, randomPositiveIntBetween, randomBuf, randomNegativeIntBetween, randomLightObject, toString } from "../lib";

export class TestExt32_1 {
    static readonly extCode = 1200;
    arr5Min = [];
    arr5Random = randomLightArray(randomPositiveIntBetween(0, Array5.Max));
    arr5Max = randomLightArray(Array5.Max);
    arr8Min = randomLightArray(Array5.Max + 1);
    arr8Random = randomLightArray(randomPositiveIntBetween(Array5.Max + 1, Array8.Max));
    arr8Max = randomLightArray(Array8.Max);
    arr16Min = randomLightArray(Array8.Max + 1);
    arr16Random = randomLightArray(randomPositiveIntBetween(Array8.Max + 1, Array16.Max));
    arr16Max = randomLightArray(Array16.Max);
    arr24Min = randomLightArray(Array16.Max + 1);
    arr24Random = randomLightArray(randomPositiveIntBetween(Array16.Max + 1, Array24.Max));
    arr24Max = randomLightArray(Array24.Max);
    bin8Min = new Uint8Array(0);
    bin8Random = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, randomPositiveIntBetween(0, Binary8.Max));
    bin8Max = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, Binary8.Max);
    bin16Min = new Uint8Array(Binary8.Max + 1);
    bin16Random = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, randomPositiveIntBetween(Binary8.Max + 1, Binary16.Max));
    bin16Max = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, Binary16.Max);
    bin24Min = new Uint8Array(Binary16.Max + 1);
    bin24Random = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, randomPositiveIntBetween(Binary16.Max + 1, Binary24.Max));
    bin24Max = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, Binary24.Max);
    bool = Math.random() > 0.5;
    nul = undefined;
    num6Min = 0;
    num6Random = randomPositiveIntBetween(0, Uint6.Max);
    num6Max = Uint6.Max;
    num8Min = Uint6.Max + 1;
    num8Random = randomPositiveIntBetween(Uint6.Max + 1, Uint8.Max);
    num8Max = Uint8.Max;
    num16Min = Uint8.Max + 1;
    num16Random = randomPositiveIntBetween(Uint8.Max + 1, Uint16.Max);
    num16Max = Uint16.Max;
    num24Min = Uint16.Max + 1;
    num24Random = randomPositiveIntBetween(Uint16.Max + 1, Uint24.Max);
    num24Max = Uint24.Max;
    num32Min = Uint24.Max + 1;
    num32Random = randomPositiveIntBetween(Uint24.Max + 1, Uint32.Max);
    num32Max = Uint32.Max;
    num40Min = Uint32.Max + 1;
    num40Random = randomPositiveIntBetween(Uint32.Max + 1, Uint40.Max);
    num40Max = Uint40.Max;
    num48Min = Uint40.Max + 1;
    num48Random = randomPositiveIntBetween(Uint40.Max + 1, Uint48.Max);
    num48Max = Uint48.Max;
    numMin = Uint48.Max + 1;
    numRandom = randomPositiveIntBetween(Uint48.Max + 1, Number.MAX_SAFE_INTEGER);
    numMax = Number.MAX_SAFE_INTEGER;
    mnum5Min = -1;
    mnum5Random = randomNegativeIntBetween(-1, Nint5.Min);
    mnum5Max = Nint5.Min;
    mnum8Min = Nint5.Min - 1;
    mnum8Random = randomNegativeIntBetween(Nint5.Min - 1, Int8.Min);
    mnum8Max = Int8.Min;
    mnum16Min = Int8.Min - 1;
    mnum16Random = randomNegativeIntBetween(Int8.Min - 1, Int16.Min);
    mnum16Max = Int16.Min;
    mnum24Min = Int16.Min - 1;
    mnum24Random = randomNegativeIntBetween(Int16.Min - 1, Int24.Min);
    mnum24Max = Int24.Min;
    mnum32Min = Int24.Min - 1;
    mnum32Random = randomNegativeIntBetween(Int24.Min - 1, Int32.Min);
    mnum32Max = Int32.Min;
    mnum40Min = Int32.Min - 1;
    mnum40Random = randomNegativeIntBetween(Int32.Min - 1, Int40.Min);
    mnum40Max = Int40.Min;
    mnum48Min = Int40.Min - 1;
    mnum48Random = randomNegativeIntBetween(Int40.Min - 1, Int48.Min);
    mnum48Max = Int48.Min;
    mnumMin = Int48.Min - 1;
    mnumRandom = randomNegativeIntBetween(Int48.Min - 1, Number.MIN_SAFE_INTEGER);
    mnumMax = Number.MIN_SAFE_INTEGER;
    obj5Min = {};
    obj5Random = randomLightObject(randomPositiveIntBetween(0, Object5.Max));
    obj5Max = randomLightObject(Object5.Max);
    obj8Min = randomLightObject(Object5.Max + 1);
    obj8Random = randomLightObject(randomPositiveIntBetween(Object5.Max + 1, Object8.Max));
    obj8Max = randomLightObject(Object8.Max);
    obj16Min = randomLightObject(Object8.Max + 1);
    obj16Random = randomLightObject(randomPositiveIntBetween(Object8.Max + 1, Object16.Max));
    obj16Max = randomLightObject(Object16.Max);
    string5Min = "";
    string5Random = toString(randomPositiveIntBetween(0, String5.Max));
    string5Max = toString(String5.Max);
    string8Min = toString(String5.Max + 1);
    string8Random = toString(randomPositiveIntBetween(String5.Max + 1, String8.Max));
    string8Max = toString(String8.Max);
    string16Min = toString(String8.Max + 1);
    string16Random = toString(randomPositiveIntBetween(String8.Max + 1, String16.Max));
    string16Max = toString(String16.Max);
    string24Min = toString(String16.Max + 1);
    string24Random = toString(randomPositiveIntBetween(String16.Max + 1, String24.Max));
    string24Max = toString(String24.Max);
    string32Min = toString(String24.Max + 1);
    string32Random = toString(randomPositiveIntBetween(String24.Max + 1, String24.Max + 1000));
    string32Max = toString(String24.Max + 1000);
    time = Date.now();
    static encode(encoder: QEncoder, data: TestExt32_1): void {
        encoder.write(data.arr5Min);
        encoder.write(data.arr5Random);
        encoder.write(data.arr5Max);
        encoder.write(data.arr8Min);
        encoder.write(data.arr8Random);
        encoder.write(data.arr8Max);
        encoder.write(data.arr16Min);
        encoder.write(data.arr16Random);
        encoder.write(data.arr16Max);
        encoder.write(data.arr24Min);
        encoder.write(data.arr24Random);
        encoder.write(data.arr24Max);
        encoder.write(data.bin8Min);
        encoder.write(data.bin8Random);
        encoder.write(data.bin8Max);
        encoder.write(data.bin16Min);
        encoder.write(data.bin16Random);
        encoder.write(data.bin16Max);
        encoder.write(data.bin24Min);
        encoder.write(data.bin24Random);
        encoder.write(data.bin24Max);
        encoder.write(data.bool);
        encoder.write(data.nul);
        encoder.write(data.num6Min);
        encoder.write(data.num6Random);
        encoder.write(data.num6Max);
        encoder.write(data.num8Min);
        encoder.write(data.num8Random);
        encoder.write(data.num8Max);
        encoder.write(data.num16Min);
        encoder.write(data.num16Random);
        encoder.write(data.num16Max);
        encoder.write(data.num24Min);
        encoder.write(data.num24Random);
        encoder.write(data.num24Max);
        encoder.write(data.num32Min);
        encoder.write(data.num32Random);
        encoder.write(data.num32Max);
        encoder.write(data.num40Min);
        encoder.write(data.num40Random);
        encoder.write(data.num40Max);
        encoder.write(data.num48Min);
        encoder.write(data.num48Random);
        encoder.write(data.num48Max);
        encoder.write(data.numMin);
        encoder.write(data.numRandom);
        encoder.write(data.numMax);
        encoder.write(data.mnum5Min);
        encoder.write(data.mnum5Random);
        encoder.write(data.mnum5Max);
        encoder.write(data.mnum8Min);
        encoder.write(data.mnum8Random);
        encoder.write(data.mnum8Max);
        encoder.write(data.mnum16Min);
        encoder.write(data.mnum16Random);
        encoder.write(data.mnum16Max);
        encoder.write(data.mnum24Min);
        encoder.write(data.mnum24Random);
        encoder.write(data.mnum24Max);
        encoder.write(data.mnum32Min);
        encoder.write(data.mnum32Random);
        encoder.write(data.mnum32Max);
        encoder.write(data.mnum40Min);
        encoder.write(data.mnum40Random);
        encoder.write(data.mnum40Max);
        encoder.write(data.mnum48Min);
        encoder.write(data.mnum48Random);
        encoder.write(data.mnum48Max);
        encoder.write(data.mnumMin);
        encoder.write(data.mnumRandom);
        encoder.write(data.mnumMax);
        encoder.write(data.obj5Min);
        encoder.write(data.obj5Random);
        encoder.write(data.obj5Max);
        encoder.write(data.obj8Min);
        encoder.write(data.obj8Random);
        encoder.write(data.obj8Max);
        encoder.write(data.obj16Min);
        encoder.write(data.obj16Random);
        encoder.write(data.obj16Max);
        encoder.write(data.string5Min);
        encoder.write(data.string5Random);
        encoder.write(data.string5Max);
        encoder.write(data.string8Min);
        encoder.write(data.string8Random);
        encoder.write(data.string8Max);
        encoder.write(data.string16Min);
        encoder.write(data.string16Random);
        encoder.write(data.string16Max);
        encoder.write(data.string24Min);
        encoder.write(data.string24Random);
        encoder.write(data.string24Max);
        encoder.write(data.string32Min);
        encoder.write(data.string32Random);
        encoder.write(data.string32Max);
        encoder.write(data.time);
        return;
    }
    static decode(decoder: QDecoder): TestExt32_1 {
        const retObj = new TestExt32_1();
        retObj.arr5Min = decoder.read();
        retObj.arr5Random = decoder.read();
        retObj.arr5Max = decoder.read();
        retObj.arr8Min = decoder.read();
        retObj.arr8Random = decoder.read();
        retObj.arr8Max = decoder.read();
        retObj.arr16Min = decoder.read();
        retObj.arr16Random = decoder.read();
        retObj.arr16Max = decoder.read();
        retObj.arr24Min = decoder.read();
        retObj.arr24Random = decoder.read();
        retObj.arr24Max = decoder.read();
        retObj.bin8Min = decoder.read();
        retObj.bin8Random = decoder.read();
        retObj.bin8Max = decoder.read();
        retObj.bin16Min = decoder.read();
        retObj.bin16Random = decoder.read();
        retObj.bin16Max = decoder.read();
        retObj.bin24Min = decoder.read();
        retObj.bin24Random = decoder.read();
        retObj.bin24Max = decoder.read();
        retObj.bool = decoder.read();
        retObj.nul = decoder.read();
        retObj.num6Min = decoder.read();
        retObj.num6Random = decoder.read();
        retObj.num6Max = decoder.read();
        retObj.num8Min = decoder.read();
        retObj.num8Random = decoder.read();
        retObj.num8Max = decoder.read();
        retObj.num16Min = decoder.read();
        retObj.num16Random = decoder.read();
        retObj.num16Max = decoder.read();
        retObj.num24Min = decoder.read();
        retObj.num24Random = decoder.read();
        retObj.num24Max = decoder.read();
        retObj.num32Min = decoder.read();
        retObj.num32Random = decoder.read();
        retObj.num32Max = decoder.read();
        retObj.num40Min = decoder.read();
        retObj.num40Random = decoder.read();
        retObj.num40Max = decoder.read();
        retObj.num48Min = decoder.read();
        retObj.num48Random = decoder.read();
        retObj.num48Max = decoder.read();
        retObj.numMin = decoder.read();
        retObj.numRandom = decoder.read();
        retObj.numMax = decoder.read();
        retObj.mnum5Min = decoder.read();
        retObj.mnum5Random = decoder.read();
        retObj.mnum5Max = decoder.read();
        retObj.mnum8Min = decoder.read();
        retObj.mnum8Random = decoder.read();
        retObj.mnum8Max = decoder.read();
        retObj.mnum16Min = decoder.read();
        retObj.mnum16Random = decoder.read();
        retObj.mnum16Max = decoder.read();
        retObj.mnum24Min = decoder.read();
        retObj.mnum24Random = decoder.read();
        retObj.mnum24Max = decoder.read();
        retObj.mnum32Min = decoder.read();
        retObj.mnum32Random = decoder.read();
        retObj.mnum32Max = decoder.read();
        retObj.mnum40Min = decoder.read();
        retObj.mnum40Random = decoder.read();
        retObj.mnum40Max = decoder.read();
        retObj.mnum48Min = decoder.read();
        retObj.mnum48Random = decoder.read();
        retObj.mnum48Max = decoder.read();
        retObj.mnumMin = decoder.read();
        retObj.mnumRandom = decoder.read();
        retObj.mnumMax = decoder.read();
        retObj.obj5Min = decoder.read();
        retObj.obj5Random = decoder.read();
        retObj.obj5Max = decoder.read();
        retObj.obj8Min = decoder.read();
        retObj.obj8Random = decoder.read();
        retObj.obj8Max = decoder.read();
        retObj.obj16Min = decoder.read();
        retObj.obj16Random = decoder.read();
        retObj.obj16Max = decoder.read();
        retObj.string5Min = decoder.read();
        retObj.string5Random = decoder.read();
        retObj.string5Max = decoder.read();
        retObj.string8Min = decoder.read();
        retObj.string8Random = decoder.read();
        retObj.string8Max = decoder.read();
        retObj.string16Min = decoder.read();
        retObj.string16Random = decoder.read();
        retObj.string16Max = decoder.read();
        retObj.string24Min = decoder.read();
        retObj.string24Random = decoder.read();
        retObj.string24Max = decoder.read();
        retObj.string32Min = decoder.read();
        retObj.string32Random = decoder.read();
        retObj.string32Max = decoder.read();
        retObj.time = decoder.read();
        return retObj;
    }
}
export class TestExt32_2 {
    static readonly extCode =65000;
    arr5Min = [];
    arr5Random = randomLightArray(randomPositiveIntBetween(0, Array5.Max));
    arr5Max = randomLightArray(Array5.Max);
    arr8Min = randomLightArray(Array5.Max + 1);
    arr8Random = randomLightArray(randomPositiveIntBetween(Array5.Max + 1, Array8.Max));
    arr8Max = randomLightArray(Array8.Max);
    arr16Min = randomLightArray(Array8.Max + 1);
    arr16Random = randomLightArray(randomPositiveIntBetween(Array8.Max + 1, Array16.Max));
    arr16Max = randomLightArray(Array16.Max);
    arr24Min = randomLightArray(Array16.Max + 1);
    arr24Random = randomLightArray(randomPositiveIntBetween(Array16.Max + 1, Array24.Max));
    arr24Max = randomLightArray(Array24.Max);
    bin8Min = new Uint8Array(0);
    bin8Random = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, randomPositiveIntBetween(0, Binary8.Max));
    bin8Max = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, Binary8.Max);
    bin16Min = new Uint8Array(Binary8.Max + 1);
    bin16Random = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, randomPositiveIntBetween(Binary8.Max + 1, Binary16.Max));
    bin16Max = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, Binary16.Max);
    bin24Min = new Uint8Array(Binary16.Max + 1);
    bin24Random = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, randomPositiveIntBetween(Binary16.Max + 1, Binary24.Max));
    bin24Max = new Uint8Array(randomBuf.buffer, randomBuf.byteOffset, Binary24.Max);
    bool = Math.random() > 0.5;
    nul = undefined;
    num6Min = 0;
    num6Random = randomPositiveIntBetween(0, Uint6.Max);
    num6Max = Uint6.Max;
    num8Min = Uint6.Max + 1;
    num8Random = randomPositiveIntBetween(Uint6.Max + 1, Uint8.Max);
    num8Max = Uint8.Max;
    num16Min = Uint8.Max + 1;
    num16Random = randomPositiveIntBetween(Uint8.Max + 1, Uint16.Max);
    num16Max = Uint16.Max;
    num24Min = Uint16.Max + 1;
    num24Random = randomPositiveIntBetween(Uint16.Max + 1, Uint24.Max);
    num24Max = Uint24.Max;
    num32Min = Uint24.Max + 1;
    num32Random = randomPositiveIntBetween(Uint24.Max + 1, Uint32.Max);
    num32Max = Uint32.Max;
    num40Min = Uint32.Max + 1;
    num40Random = randomPositiveIntBetween(Uint32.Max + 1, Uint40.Max);
    num40Max = Uint40.Max;
    num48Min = Uint40.Max + 1;
    num48Random = randomPositiveIntBetween(Uint40.Max + 1, Uint48.Max);
    num48Max = Uint48.Max;
    numMin = Uint48.Max + 1;
    numRandom = randomPositiveIntBetween(Uint48.Max + 1, Number.MAX_SAFE_INTEGER);
    numMax = Number.MAX_SAFE_INTEGER;
    mnum5Min = -1;
    mnum5Random = randomNegativeIntBetween(-1, Nint5.Min);
    mnum5Max = Nint5.Min;
    mnum8Min = Nint5.Min - 1;
    mnum8Random = randomNegativeIntBetween(Nint5.Min - 1, Int8.Min);
    mnum8Max = Int8.Min;
    mnum16Min = Int8.Min - 1;
    mnum16Random = randomNegativeIntBetween(Int8.Min - 1, Int16.Min);
    mnum16Max = Int16.Min;
    mnum24Min = Int16.Min - 1;
    mnum24Random = randomNegativeIntBetween(Int16.Min - 1, Int24.Min);
    mnum24Max = Int24.Min;
    mnum32Min = Int24.Min - 1;
    mnum32Random = randomNegativeIntBetween(Int24.Min - 1, Int32.Min);
    mnum32Max = Int32.Min;
    mnum40Min = Int32.Min - 1;
    mnum40Random = randomNegativeIntBetween(Int32.Min - 1, Int40.Min);
    mnum40Max = Int40.Min;
    mnum48Min = Int40.Min - 1;
    mnum48Random = randomNegativeIntBetween(Int40.Min - 1, Int48.Min);
    mnum48Max = Int48.Min;
    mnumMin = Int48.Min - 1;
    mnumRandom = randomNegativeIntBetween(Int48.Min - 1, Number.MIN_SAFE_INTEGER);
    mnumMax = Number.MIN_SAFE_INTEGER;
    obj5Min = {};
    obj5Random = randomLightObject(randomPositiveIntBetween(0, Object5.Max));
    obj5Max = randomLightObject(Object5.Max);
    obj8Min = randomLightObject(Object5.Max + 1);
    obj8Random = randomLightObject(randomPositiveIntBetween(Object5.Max + 1, Object8.Max));
    obj8Max = randomLightObject(Object8.Max);
    obj16Min = randomLightObject(Object8.Max + 1);
    obj16Random = randomLightObject(randomPositiveIntBetween(Object8.Max + 1, Object16.Max));
    obj16Max = randomLightObject(Object16.Max);
    string5Min = "";
    string5Random = toString(randomPositiveIntBetween(0, String5.Max));
    string5Max = toString(String5.Max);
    string8Min = toString(String5.Max + 1);
    string8Random = toString(randomPositiveIntBetween(String5.Max + 1, String8.Max));
    string8Max = toString(String8.Max);
    string16Min = toString(String8.Max + 1);
    string16Random = toString(randomPositiveIntBetween(String8.Max + 1, String16.Max));
    string16Max = toString(String16.Max);
    string24Min = toString(String16.Max + 1);
    string24Random = toString(randomPositiveIntBetween(String16.Max + 1, String24.Max));
    string24Max = toString(String24.Max);
    string32Min = toString(String24.Max + 1);
    string32Random = toString(randomPositiveIntBetween(String24.Max + 1, String24.Max + 1000));
    string32Max = toString(String24.Max + 1000);
    time = Date.now();
    static encode(encoder: QEncoder, data: TestExt32_1): void {
        encoder.write(data.arr5Min);
        encoder.write(data.bin8Min);
        encoder.write(data.bool);
        encoder.write(data.nul);
        encoder.write(data.num6Min);
        encoder.write(data.mnum5Min);
        encoder.write(data.obj5Min);
        encoder.write(data.string5Min);
        encoder.write(data.arr5Random);
        encoder.write(data.bin8Random);
        encoder.write(data.num6Random);
        encoder.write(data.mnum5Random);
        encoder.write(data.obj5Random);
        encoder.write(data.string5Random);
        encoder.write(data.arr5Max);
        encoder.write(data.bin8Max);
        encoder.write(data.num6Max);
        encoder.write(data.mnum5Max);
        encoder.write(data.obj5Max);
        encoder.write(data.string5Max);
        encoder.write(data.arr8Min);
        encoder.write(data.bin16Min);
        encoder.write(data.num8Min);
        encoder.write(data.mnum8Min);
        encoder.write(data.obj8Min);
        encoder.write(data.string8Min);
        encoder.write(data.arr8Random);
        encoder.write(data.bin16Random);
        encoder.write(data.num8Random);
        encoder.write(data.mnum8Random);
        encoder.write(data.obj8Random);
        encoder.write(data.string8Random);
        encoder.write(data.arr8Max);
        encoder.write(data.bin16Max);
        encoder.write(data.num8Max);
        encoder.write(data.mnum8Max);
        encoder.write(data.obj8Max);
        encoder.write(data.string8Max);
        encoder.write(data.arr16Min);
        encoder.write(data.bin24Min);
        encoder.write(data.num16Min);
        encoder.write(data.mnum16Min);
        encoder.write(data.obj16Min);
        encoder.write(data.string16Min);
        encoder.write(data.arr16Random);
        encoder.write(data.bin24Random);
        encoder.write(data.num16Random);
        encoder.write(data.mnum16Random);
        encoder.write(data.obj16Random);
        encoder.write(data.string16Random);
        encoder.write(data.arr16Max);
        encoder.write(data.bin24Max);
        encoder.write(data.num16Max);
        encoder.write(data.mnum16Max);
        encoder.write(data.obj16Max);
        encoder.write(data.string16Max);
        encoder.write(data.arr24Min);
        encoder.write(data.num24Min);
        encoder.write(data.mnum24Min);
        encoder.write(data.string24Min);
        encoder.write(data.arr24Random);
        encoder.write(data.num24Random);
        encoder.write(data.mnum24Random);
        encoder.write(data.string24Random);
        encoder.write(data.arr24Max);
        encoder.write(data.num24Max);
        encoder.write(data.mnum24Max);
        encoder.write(data.string24Max);
        encoder.write(data.num32Min);
        encoder.write(data.mnum32Min);
        encoder.write(data.string32Min);
        encoder.write(data.num32Random);
        encoder.write(data.mnum32Random);
        encoder.write(data.string32Random);
        encoder.write(data.num32Max);
        encoder.write(data.mnum32Max);
        encoder.write(data.string32Max);
        encoder.write(data.num40Min);
        encoder.write(data.mnum40Min);
        encoder.write(data.num40Random);
        encoder.write(data.mnum40Random);
        encoder.write(data.num40Max);
        encoder.write(data.mnum40Max);
        encoder.write(data.num48Min);
        encoder.write(data.mnum48Min);
        encoder.write(data.num48Random);
        encoder.write(data.mnum48Random);
        encoder.write(data.num48Max);
        encoder.write(data.mnum48Max);
        encoder.write(data.numMin);
        encoder.write(data.mnumMin);
        encoder.write(data.numRandom);
        encoder.write(data.mnumRandom);
        encoder.write(data.numMax);
        encoder.write(data.mnumMax);
        encoder.write(data.time);
        return;
    }
    static decode(decoder: QDecoder): TestExt32_1 {
        const retObj = new TestExt32_1();
        retObj.arr5Min=decoder.read()
        retObj.bin8Min=decoder.read()
        retObj.bool=decoder.read()
        retObj.nul=decoder.read()
        retObj.num6Min=decoder.read()
        retObj.mnum5Min=decoder.read()
        retObj.obj5Min=decoder.read()
        retObj.string5Min=decoder.read()
        retObj.arr5Random=decoder.read()
        retObj.bin8Random=decoder.read()
        retObj.num6Random=decoder.read()
        retObj.mnum5Random=decoder.read()
        retObj.obj5Random=decoder.read()
        retObj.string5Random=decoder.read()
        retObj.arr5Max=decoder.read()
        retObj.bin8Max=decoder.read()
        retObj.num6Max=decoder.read()
        retObj.mnum5Max=decoder.read()
        retObj.obj5Max=decoder.read()
        retObj.string5Max=decoder.read()
        retObj.arr8Min=decoder.read()
        retObj.bin16Min=decoder.read()
        retObj.num8Min=decoder.read()
        retObj.mnum8Min=decoder.read()
        retObj.obj8Min=decoder.read()
        retObj.string8Min=decoder.read()
        retObj.arr8Random=decoder.read()
        retObj.bin16Random=decoder.read()
        retObj.num8Random=decoder.read()
        retObj.mnum8Random=decoder.read()
        retObj.obj8Random=decoder.read()
        retObj.string8Random=decoder.read()
        retObj.arr8Max=decoder.read()
        retObj.bin16Max=decoder.read()
        retObj.num8Max=decoder.read()
        retObj.mnum8Max=decoder.read()
        retObj.obj8Max=decoder.read()
        retObj.string8Max=decoder.read()
        retObj.arr16Min=decoder.read()
        retObj.bin24Min=decoder.read()
        retObj.num16Min=decoder.read()
        retObj.mnum16Min=decoder.read()
        retObj.obj16Min=decoder.read()
        retObj.string16Min=decoder.read()
        retObj.arr16Random=decoder.read()
        retObj.bin24Random=decoder.read()
        retObj.num16Random=decoder.read()
        retObj.mnum16Random=decoder.read()
        retObj.obj16Random=decoder.read()
        retObj.string16Random=decoder.read()
        retObj.arr16Max=decoder.read()
        retObj.bin24Max=decoder.read()
        retObj.num16Max=decoder.read()
        retObj.mnum16Max=decoder.read()
        retObj.obj16Max=decoder.read()
        retObj.string16Max=decoder.read()
        retObj.arr24Min=decoder.read()
        retObj.num24Min=decoder.read()
        retObj.mnum24Min=decoder.read()
        retObj.string24Min=decoder.read()
        retObj.arr24Random=decoder.read()
        retObj.num24Random=decoder.read()
        retObj.mnum24Random=decoder.read()
        retObj.string24Random=decoder.read()
        retObj.arr24Max=decoder.read()
        retObj.num24Max=decoder.read()
        retObj.mnum24Max=decoder.read()
        retObj.string24Max=decoder.read()
        retObj.num32Min=decoder.read()
        retObj.mnum32Min=decoder.read()
        retObj.string32Min=decoder.read()
        retObj.num32Random=decoder.read()
        retObj.mnum32Random=decoder.read()
        retObj.string32Random=decoder.read()
        retObj.num32Max=decoder.read()
        retObj.mnum32Max=decoder.read()
        retObj.string32Max=decoder.read()
        retObj.num40Min=decoder.read()
        retObj.mnum40Min=decoder.read()
        retObj.num40Random=decoder.read()
        retObj.mnum40Random=decoder.read()
        retObj.num40Max=decoder.read()
        retObj.mnum40Max=decoder.read()
        retObj.num48Min=decoder.read()
        retObj.mnum48Min=decoder.read()
        retObj.num48Random=decoder.read()
        retObj.mnum48Random=decoder.read()
        retObj.num48Max=decoder.read()
        retObj.mnum48Max=decoder.read()
        retObj.numMin=decoder.read()
        retObj.mnumMin=decoder.read()
        retObj.numRandom=decoder.read()
        retObj.mnumRandom=decoder.read()
        retObj.numMax=decoder.read()
        retObj.mnumMax=decoder.read()
        retObj.time=decoder.read()
        return retObj;
    }
}