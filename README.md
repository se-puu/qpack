# QPack Library

A versatile and lightweight JavaScript library offering a robust API.
## Overview

QPack Library provides robust features for both data encoding and decoding, simplifying complex data manipulation tasks for modern web and server-side applications.

The library’s encoder transforms intricate data structures into compact, optimized formats for efficient transmission and storage. Conversely, the decoder reconstructs the original data from these encoded formats, ensuring integrity and consistency throughout the process.

Whether you need to compress data for fast network transfers or quickly restore original data for processing, QPack’s encoder and decoder functionalities deliver performance and reliability.

## supported
- javascript
- C/C++ (coming soon)
- Rust (coming soon)
- Python (coming soon)

## Table of Contents
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Examples](#example)
- [Tests](#tests)
- [License](#license)
- [Changelog](#changelog)
- [Acknowledgements](#acknowledgements)

## Installation

Install via npm:
```
npm install @se-puu/qpack
```


## API Documentation

- [EncodeableBinary](#encodeablebinary)
- [Encodeable](#encodeable)
- [QEncoder](#qencoder)
    - static [create(option?: QEncoderOption): QEncoder](#static-createoption-qencoderoption-qencoder)
        - [QEncoderOption](#qencoderoption)
    - [changeExtRegistry(reg: ExtRegistry)](#changeextregistryreg-extregistry)
        - [ExtRegistry](#extregistry)
    - [encode(data: Encodeable): Uint8Array](#encodedata-encodeable-uint8array)
        - [Encodeable]()
    - [encodeOnly(data: Encodeable): number](#encodeonlydata-encodeable-number)
        - [Encodeable]()
    - [reset()](#reset)
    - [length: number](#length-number)
    - [export(): Uint8Array](#export-uint8array--undefined)
    - [exportInto(target: Uint8Array):void](#exportintotarget-uint8arrayvoid)
    - [write(data: Encodeable): boolean](#writedata-encodeable-boolean)
    - [writeArray(data: Encodeable[]): boolean](#writearraydata-encodeable-boolean)
    - [writeBigInt(data: bigint): boolean](#writebigintdata-bigint-boolean)
    - [writeBinary(data: EncodeableBinary): boolean](#writebinarydata-encodeablebinary-boolean)
        - [EncodeableBinary]()
    - [writeBoolean(data: boolean): boolean](#writebooleandata-boolean-boolean)
    - [writeMap(data: Map): boolean](#writemapdata-map-boolean)
    - [writeNull(): boolean](#writenull-boolean)
    - [writeNumber(data: number): boolean](#writenumberdata-number-boolean)
    - [writeObject(data: object): boolean](#writeobjectdata-object-boolean)
    - [writeString(data: string): boolean](#writestringdata-string-boolean)
    - [writeTimestamp(data: Date): boolean](#writetimestampdata-date-boolean)
- [QEncoderOption](#qencoderoption)
    - [initSize: number](#initsize-number)
    - [extRegistry: ExtRegistry](#extregistry)
    - [onExpand?: < T extends boolean|undefined,U extends T extends true ? Uint8Array : undefined,V extends T extends true ? number : undefined >(encoder:QEncoder,requiredSize:number,isInitial:T,oldBuf: U, offset:V) => Uint8Array;](#onexpand--t-extends-booleanundefinedu-extends-t-extends-true--uint8array--undefinedv-extends-t-extends-true--number--undefined-encoderqencoderrequiredsizenumberisinitialtoldbuf-u-offsetv--uint8array)
    - [onRelease?: (buf: Uint8Array) => void;](#onrelease-buf-uint8array--void)
- [QDecoder](#qdecoder)
    - static [create(option?: QDecoderOption): QDecoder](#static-createoption-qdecoderoption-qdecoder)
        - [QDecoderOption](#qdecoderoption)
    - [decode< Type >(data: Uint8Array): Type](#decode-type-data-uint8array-type)
    - [setBuffer(data: Uint8Array): void](#setbufferdata-uint8array-type)
    - [read< Type >( ): Type](#read-typtype)
    - [changeExtRegistry(reg: ExtRegistry)](#changeextregistryreg-extregistry-1)
        - [ExtRegistry](#extregistry)
- [QDecoderOption](#qdecoderoption)
    - [extRegistry: ExtRegistry](#extregistry)
- [ExtRegistry](#extregistry)
    - static [create(): ExtRegistry](#static-create-extregistry)
    - [register< Ext extends ExtEntry >(ext: Ext,option?: ExtRegisterOption): boolean](#register-ext-extends-extentry-ext-extoption-extregisteroption-boolean)
        - [ExtEntry](#extentry)
        - [ExtRegisterOption](#extregisteroption)
    - [unregister(extCode: number): boolean](#unregisterextcode-number-boolean)
- [ExtRegisterOption](#extregisteroption)
    - [overWrite?: boolean](#overwrite-boolean)
- [ExtEntry](#extentry)
    - static [extCode: number](#static-extcode-number)
    - static [encode(encoder: QEncoder): void](#static-encodeencoder-qencoder-void)
    - static [decode(decoder: QDecoder): ExtEntry](#static-decodedecoder-qdecoder-extentry)

## EncodeableBinary
QEncoder and QDecoder supported binary types.
- Uint8ClampedArray
- Uint8Array
- Uint16Array
- Uint32Array
- BigUint64Array
- Int8Array
- Int16Array
- Int32Array
- BigInt64Array
- Float32Array
- Float64Array
- DataView
## Encodeable
This is supported data types for QEncoder and QDecoder.
- null 
- undefined 
- boolean 
- number 
- string 
- date(miliseconds)
- [EncodeableBinary](#encodeablebinary)
- [Encodeable](#encodeable) [ ]
- object 
- bigint 
- [ExtEntry](#extentry)
## QEncoder
Creates an encoder instance that maintains its own configuration. Each instance stores settings independently, allowing for tailored behavior without impacting other encoders.
#### `static create(option?: QEncoderOption): QEncoder`
Create encoder instance with option.
#### `encode(data: Encodeable): Uint8Array`
Encode the data and return the copied encoded buffer.
#### `encodeOnly(data: Encodeable): number`
Encode the data and return the length of encoded data without exporting encoded data.
#### `export(): Uint8Array | undefined`
Export copied encoded data.
#### `exportInto(target: Uint8Array):void`
Copy encoded data into the target buffer. Target buffer must be larger than the encoded data.
#### `length: number`
The length of the current encoded buffer.
#### `reset()`
Reset the encoder state.Release the hold buffer and other data inside encoder.
#### `write(data: Encodeable): boolean`
Manually write encodable data into the encoder. Returns true if successful; otherwise, returns false.
#### `writeNull(): boolean`
Manually write undefined into the encoder. If success, will return true. Other case will retrun false.
#### `writeBoolean(data: boolean): boolean`
Manually write boolean into the encoder. If success, will return true. Other case will retrun false.
#### `writeNumber(data: number): boolean`
Manually write number into the encoder. If success, will return true. Other case will retrun false.
#### `writeString(data: string): boolean`
Manually write string into the encoder. If success, will return true. Other case will retrun false.
#### `writeBigInt(data: bigint): boolean`
Manually write bigint into the encoder. If success, will return true. Other case will retrun false.
#### `writeTimestamp(data: Date): boolean`
Manually write timestamp in milisecond into the encoder. If success, will return true. Other case will retrun false.
#### `writeBinary(data: EncodeableBinary): boolean`
Manually write binary into the encoder. If success, will return true. Other case will retrun false.
#### `writeArray(data: Encodeable[]): boolean`
Manually write an array into the encoder. If success, will return true. Other case will retrun false.
#### `writeObject(data: object): boolean`
Manually write an object into the encoder. If success, will return true. Other case will retrun false.
#### `writeMap(data: Map): boolean`
Manually write an javascript Map into the encoder. If success, will return true. Other case will retrun false.
#### `changeExtRegistry(reg: ExtRegistry)`
Change the internal extension registry to encode extension.
## QEncoderOption
An option to configure and optimise the returned encoder instance.
#### `initSize: number`
The initial size of buffer that will be used by encoder.If this is not set, the encoder will use default initial buffer size. The default initial size is 2KB.
#### `extRegistry: ExtRegistry`
The extension registry to match extension with ext code.
#### `onExpand?: < T extends boolean|undefined,U extends T extends true ? Uint8Array : undefined,V extends `T extends true ? number : undefined >(encoder:QEncoder,requiredSize:number,isInitial:T,oldBuf: U, offset:V) => Uint8Array;
Custom function to handle when current buffer is not enough to write encoded data.
#### `onRelease?: (buf: Uint8Array) => void;`
Custom function to handle released buffer when encoder is reset.
```javascript
import { QEncoder } from "@se-puu/qpack";

// create encoder instance.
const encoder=QEncoder.create();
// encode some data.
const encodedData=encoder.encode({data:12,someStr:"someString"});
// encoded data is ready to transfer over network or store as file.
```
## QDecoder
Creates an decoder instance that maintains its own configuration. Each instance stores settings independently, allowing for tailored behavior without impacting other decoders.
#### `static create(option?: QDecoderOption): QDecoder`
#### `decode< Type >(data: Uint8Array): Type`
Call setBuffer to provide buffer to the decoder and decode the data from this buffer.
#### `setBuffer(data: Uint8Array): Type`
Provide buffer to the decoder.
#### `read< Type >( ): Type`
Manually read data from the buffer with each call until the data is completely consumed.
#### `changeExtRegistry(reg: ExtRegistry)`
Change the internal extension registry to decode extension.
#### `isEnd():boolean`
The reading process of data is ended or not.
## QDecoderOption
#### `extRegistry: ExtRegistry`
An option to configure and optimise the returned decoder instance.
```javascript
import { QDecoder } from "@se-puu/qpack";

// create decoder instance
const decoder=QDecoder.create();
// buf is already received by some methods.
const decodedObj=decoder.decode(buf);
// decodedObj is ready to use.
```
## ExtRegistry
A registry for storing extensions that maps between the extension and their corresponding extension codes.
It maintains its own configuration. Each instance stores settings independently, allowing for tailored behavior without impacting other registry.
#### `static create(): ExtRegistry`
Create a extension registry instance.
#### `register< Ext extends ExtEntry >(ext: Ext,option?: ExtRegisterOption): boolean`
Register an extension by supplying its extension code, encoder, and decoder to the extension registry. If the extension code is already registered, the registration process will fail.The extension code can be overwritten by providing overwrite option.
#### `unregister(extCode: number): boolean`
Unregister an extension from extension registry.
## ExtRegisterOption
#### `overWrite?: boolean`
Forces the overwriting of the extension code if it already exists.
```javascript
import { ExtRegistry, QEncoder, QDecoder } from "@se-puu/qpack";

const ereg=ExtRegistry.create();
const encoder=QEncoder.create({extRegistry:ereg});
const decoder=QDecoder.create({extRegistry:ereg});
// MyExt is a ExtEntry class that represents custom extension.
ereg.register(MyExt);
const someData={
    num:12,
    someStr:"data",
    someExt:new MyExt()
};
// this is encoded buffer
const encodedData=encoder.encode(someData);
// transfer or store encoded data. receive or read again encoded data and then decode it.
// decodedObj will be same as someData.
const decodedObj=decoder.decode(encodedData);
```
## ExtEntry
Extension entry class. The class must have the following static methods.
#### `static extCode: number`
the representation of code for this extension entry.
#### `static encode(encoder: QEncoder): void`
The function will be called by encoder when the data is instance of this class during encoding.
#### `static decode(decoder: QDecoder): ExtEntry`
The function will be called by decoder when the encoded ext code is found during decoding.
```javascript
class MyExt{
    randomNum!:number;
    someStr!:string;
    static readonly extCode=1200;
    static encode(encoder:QEncoder,data:MyExt):void{
        encoder.writeNumber(data.randomNum);
        encoder.writeString(data.someStr);
    }
    static decode(decoder:QDecoder):MyExt{
        const retIns=new MyExt();
        retIns.randomNum=decoder.read();
        retIns.someStr=decoder.read();
    }
    constructor(){
        this.randomNum=Math.random();
        this.someStr="someString";
    }
}
```
## Example
simple encode, decode without performance considerations.
```javascript
import { QEncoder, QDecoder } from "@se-puu/qpack";

const object={
    some:"data",
    value:12345678,
    arr:[12345,54321,56789,98765]
};
const encoder = QEncoder.create();
const buffer = encoder.encode(object);
// buffer is sent over network or store and retrive from stroage. Then decode,
const decoder = QDecoder.create();
// resultObj will be same as object.
const resultObj = decoder.decode(buffer);
```

optimised encode, decode with high performance without using extensions. 

Encoding and decoding an entire object can take significantly longer than processing individual data of this object, which may affect data access latency.
Normal way.Accessing data is high latency.
```javascript
import { QEncoder, QDecoder } from "@se-puu/qpack";

const itemShowCase=[
    {
        name: "item1",
        price:10 // 10$
    },
    {
        name: "item2",
        price:11
    },
    {
        name: "item3",
        price:9
    },
];
const encoder=QEncoder.create();
// encoding the whole itemShowCase
const encodedData=encoder.encode(itemShowCase);
// transfer data overnetwork
const decoder=QDecoder.create();
// decoding the whole itemShowCase
const itemArr=decoder.decode(encodedData);
// Accessing itemArr occurs after decoding all item data from itemShowCase.
itemArr.forEach(item=>{
    // process or render item in html.
});
```
Optimised way.Accessing data is low latency for large array.Small array may not be seen difference.
```javascript
import { QEncoder, QDecoder } from "@se-puu/qpack";

const itemShowCase=[
    {
        name: "item1",
        price:10 // 10$
    },
    {
        name: "item2",
        price:11
    },
    {
        name: "item3",
        price:9
    }, 
    // ... more items
];
const encoder=QEncoder.create();
itemShowCase.forEach(item=>encoder.write(item));
const encodedData=encoder.export();
// transfer data overnetwork
const decoder=QDecoder.create();
const itemArr=decoder.decode(encodedData);
// Accessing itemArr occurs after decoding all item data from itemShowCase.
while(!decoder.isEnd()){
    // You can access each item quickly without waiting for the entire array to be decoded.accessing each item is low latency.
    const item = decoder.read();
    // Process or render the item in HTML.
}
```
View others in example folder.
## Tests
Run light test with:
```bash
npm test
```
Run full data test with:
```bash
npm run test-heavy
```

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.

## Changelog

Refer to [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## Acknowledgements

Special thanks to all contributors and the open-source community for their support and feedback.
