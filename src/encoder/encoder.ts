import { EncoderConfig } from "./config";
import { AsyncEncoderOption, EncoderOption } from "./encoder-option";
import { encodeSync } from "./encode-sync";
import { Encodeable, EncodeableBinary } from "./handler-map";
import { ExtRegistry } from "../lib/ext-registry";
import { encodeArraySync } from "./handler/array";
import { encodeBigIntSync } from "./handler/bigint";
import { encodeBinarySync } from "./handler/binary";
import { encodeBooleanSync } from "./handler/boolean";
import { encodeMapSync } from "./handler/map";
import { encodeNull3Sync } from "./handler/null";
import { encodeNumberSync } from "./handler/number";
import { encodeObjectSync } from "./handler/object";
import { encodeStringSync } from "./handler/string";
import { encodeTimestampSync } from "./handler/timestamp";

export class QAsyncEncoder {
    onData!: AsyncEncoderOption["onData"];
    onCompleted!: AsyncEncoderOption["onCompleted"];
    onError!: AsyncEncoderOption["onError"];
    bufferSize!: number;
    onDataNeeded!: QAsyncEncoder["__onDataNeeded"];
    static create(option: AsyncEncoderOption): QAsyncEncoder {
        const encoder = new QAsyncEncoder();
        encoder.onData = option.onData;
        encoder.onCompleted = option.onCompleted;
        encoder.onError = option.onError;
        encoder.bufferSize = option.bufferSize ?? EncoderConfig.BufferSize;
        encoder.onDataNeeded = option.onDataNeeded ?? encoder.__onDataNeeded.bind(encoder);
        return encoder;
    }
    //eslint-disable-next-line
    encode(data: unknown): Uint8Array {
        //TODO implement stream encoder
        return new Uint8Array(0);
    }
    __onDataNeeded(): Uint8Array {
        return new Uint8Array(0);
    }
}
const defaultExtRegistry = ExtRegistry.create();
/**
 * Quick Encoder class
 * @class
 * @classdesc Encoder class
 * @since 1.0.0
 */
export class QEncoder {
    __encoder = new TextEncoder();
    __buffer!: Uint8Array;
    __bufferOffset!: number;
    __view!: DataView;
    __extRegistry!: ExtRegistry;
    #haveBuffer = false;
    __onRelease?: EncoderOption["onRelease"];
    __onExpand?: EncoderOption["onExpand"];
    __initSize!: number;
    static create(option: EncoderOption = {}): QEncoder {
        const retObj = new QEncoder();
        retObj.__extRegistry = option.extRegistry??defaultExtRegistry;
        retObj.__onExpand = option.onExpand;
        retObj.__onRelease = option.onRelease;
        retObj.__initSize = option.initialSize??EncoderConfig.BufferSize;
        retObj.allocate();
        return retObj;
    }
    /**
     * change extension handler
     * @param handler new extension handler
     * @since 1.0.0
     */
    changeExtRegistry(handler: ExtRegistry): void {
        this.__extRegistry = handler;
    }
    /**
     * expand buffer
     * @param minSize minimum required size to expand
     * @since 1.0.0
     */
    __expand(minSize?: number): void {
        // later recycle old buffer
        let expandFactor = EncoderConfig.BufferExpandFactor;
        if (minSize) {
            const factor = Math.ceil((minSize + this.__buffer.length) / this.__buffer.length);
            expandFactor = Math.pow(2, Math.ceil(Math.log2(factor)));
        }
        const newLen = expandFactor * this.__buffer.length;
        let newBuffer: Uint8Array;
        if (this.__onExpand) {
            newBuffer = this.__onExpand(this, newLen, true, this.__buffer, this.__bufferOffset);
            if (newBuffer.length < newLen) {
                throw new Error("onExpand handler must return buffer with size equal or greater than required size");
            }
        } else {
            newBuffer = new Uint8Array(newLen);
            newBuffer.set(this.__buffer);
        }
        this.__buffer = newBuffer;
        this.__view = new DataView(this.__buffer.buffer, this.__buffer.byteOffset, this.__buffer.byteLength);
    }
    /** 
     * recycle buffer no longer needed
     * @since 1.0.0
    */
    /*@__INLINE__*/
    reset(): void {
        // recycle old buffer
        this.#haveBuffer = false;
        if (this.__onRelease) {
            this.__onRelease(this.__buffer);
        }
        this.__buffer=undefined as unknown as Uint8Array;
        this.__bufferOffset=0;
    }
    /**
     * prepare buffer from new buffer or recycled buffer
     * @since 1.0.0
     */
    /*@__INLINE__*/
    private allocate(): void {
        if (this.__onExpand) {
            this.__buffer = this.__onExpand(this, this.__initSize, false, undefined, undefined);
            if (this.__buffer.length < this.__bufferOffset) {
                throw new Error("onExpand handler must return buffer with size equal or greater than required size");
            }
        } else {
            this.__buffer = new Uint8Array(this.__initSize);
        }
        this.__view = new DataView(this.__buffer.buffer, this.__buffer.byteOffset, this.__buffer.byteLength);
        this.__bufferOffset = 0;
        this.#haveBuffer = true;
    }
    /**
     * encode data synchronously by exporting into a new buffer as return value
     * @param data data to encode
     * @returns {Uint8Array|undefined} encoded data
     * @since 1.0.0
     */
    encode(data: Encodeable): Uint8Array | undefined {
        if (encodeSync(this, data)) {
            const retBuf = this.__buffer.slice(0, this.__bufferOffset);
            // recycle old buffer
            this.reset();
            return retBuf;
        }
        return undefined;
    }
    /**
     * encode data synchronously and return length of encoded data.
     * @param data data to encode
     * @returns {number} length of encoded data
     * @since 1.0.0
     */
    encodeOnly(data: Encodeable): number {
        if (encodeSync(this, data)) {
            return this.__bufferOffset;
        }
        return -1;
    }
    export(): Uint8Array | undefined {
        if (!this.#haveBuffer) {
            return undefined;
        }
        return this.__buffer.slice(0, this.__bufferOffset);
    }
    /**
     * export encoded data into target buffer
     * @param target target buffer
     * @returns {boolean} true if encoding is successful
     * @since 1.0.0
     */
    exportInto(target: Uint8Array): boolean {
        if (!this.#haveBuffer) {
            return false;
        }
        if (target.length < this.__bufferOffset) {
            return false;
        }
        target.set(this.__buffer.subarray(0, this.__bufferOffset));
        return true;
    }
    /**
     * get length of encoded data
     * @returns {number} length of encoded data
     * @since 1.0.0
     */
    get length(): number {
        return this.#haveBuffer ? this.__bufferOffset : -1;
    }
    /**
     * write data synchronously some data into current encoded data inside extension encoder.
     * @param data data to encode
     * @returns {boolean} true if encoding is successful
     * @since 1.0.0
     */
    write = encodeSync.bind(this, this) as (data: Encodeable) => boolean;
    /**
     * write array synchronously into current encoded data inside extension encoder.
     * @param data array to encode
     * @returns {boolean} true if encoding is successful
     */
    writeArray = encodeArraySync.bind(this, this) as (data: Encodeable[]) => boolean;
    /**
     * write bigint synchronously into current encoded data inside extension encoder.
     * @param data bigint to encode
     * @returns {boolean} true if encoding is successful
     */
    writeBigInt = encodeBigIntSync.bind(this, this) as (data: bigint) => boolean;
    /**
     * write binary data synchronously into current encoded data inside extension encoder.
     * @param data binary data to encode
     * @returns {boolean} true if encoding is successful
     */
    writeBinary = encodeBinarySync.bind(this, this) as (data: EncodeableBinary) => boolean;
    /**
     * write boolean synchronously into current encoded data inside extension encoder.
     * @param data boolean to encode
     * @returns {boolean} true if encoding is successful
     */
    writeBoolean = encodeBooleanSync.bind(this, this) as (data: boolean) => boolean;
    /**
     * write map synchronously into current encoded data inside extension encoder.
     * @param data map to encode
     * @returns {boolean} true if encoding is successful
     */
    writeMap = encodeMapSync.bind(this, this) as (data: Map<unknown, unknown>) => boolean;
    /**
     * write null synchronously into current encoded data inside extension encoder.
     * @returns {boolean} true if encoding is successful
     */
    writeNull = encodeNull3Sync.bind(this, this) as () => boolean;
    /**
     * write number synchronously into current encoded data inside extension encoder.
     * @param data number to encode
     * @returns {boolean} true if encoding is successful
     */
    writeNumber = encodeNumberSync.bind(this, this) as (data: number) => boolean;
    /**
     * write object synchronously into current encoded data inside extension encoder.
     * @param data object to encode
     * @returns {boolean} true if encoding is successful
     */
    writeObject = encodeObjectSync.bind(this, this) as (data: object) => boolean;
    /**
     * write string synchronously into current encoded data inside extension encoder.
     * @param data string to encode
     * @returns {boolean} true if encoding is successful
     */
    writeString = encodeStringSync.bind(this, this) as (data: string) => boolean;
    /**
     * write timestamp synchronously into current encoded data inside extension encoder.
     * @param data timestamp to encode
     * @returns {boolean} true if encoding is successful
     */
    writeTimestamp = encodeTimestampSync.bind(this, this) as (data: Date) => boolean;
}