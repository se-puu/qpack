import { ExtRegistry } from "../lib/ext-registry";
import { decodeSync } from "./decode-sync";
import { QDecoderOption } from "./decoder-option";


export class QAsyncDecoder {
    static create(): QAsyncDecoder {
        return new QAsyncDecoder();
    }
    //eslint-disable-next-line
    write(chunk: Uint8Array): void {
        //TODO implement stream decoder 
    }
}
const _ExtRegistry = ExtRegistry.create();
/**
 * Quick Decoder class
 * @class
 * @classdesc Decoder class
 * @since 1.0.0
 */
export class QDecoder {
    __decoder = new TextDecoder("utf-8");
    __buffer!: Uint8Array;
    __bufferOffset: number = 0;
    __view!: DataView;
    __extRegistry!: ExtRegistry;
    
    static create(option:QDecoderOption={}): QDecoder {
        const retObj = new QDecoder();
        retObj.__extRegistry=option.extRegistry??_ExtRegistry;
        return retObj;
    }
    /** 
     * Change the extension handler for the decoder
     * @param handler The new extension handler
     * @since 1.0.0
     */
    changeRegistry(handler: ExtRegistry) {
        this.__extRegistry = handler;
    }
    setBuffer(buffer: Uint8Array): void {
        this.__buffer = buffer;
        this.__view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    /**
     * Decode a buffer to a object
     * @param data The buffer to decode
     * @returns {T} The decoded object
     * @since 1.0.0
     */
    decode<T>(data: Uint8Array): T | undefined {
        //TODO implement decoder for single buffer or array of buffers
        this.setBuffer(data);
        return decodeSync(this) as T;
    }
    /**
     * read a object from a buffer inside extension's decoder function.
     * @param data The buffer to decode
     * @returns {T} The decoded object
     * @since 1.0.0
     */
    read<T>(): T {
        return decodeSync(this) as T;
    }
    isEnd(): boolean {
        return this.__bufferOffset >= this.__buffer.length;
    }
}