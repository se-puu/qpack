import { QDecoder } from "../decoder/decoder";
import { createDecoder, createExtDecoder } from "../decoder/handler-map";
import { QEncoder } from "../encoder/encoder";
import { createEncoder } from "../encoder/handler-map";
import { encodeExtensionSync } from "../encoder/handler/extension";

export type ExtEncoderFunc<T extends object> = (encoder: QEncoder, data: T) => void;
export type ExtDecoderFunc<T extends object> = (encoder: QDecoder) => T;
export type ExtEntry<T extends object> ={
    readonly extCode: number;
    encode: ExtEncoderFunc<T>;
    decode: ExtDecoderFunc<T>;
};
export type ExtRegisterOption = {
    overwriteEncoder?: boolean;
    overwriteDecoder?: boolean;
};

/**
 * Extension Registry for custom encoder and decoder.
 * @class
 * @since 1.0.0
 */
export class ExtRegistry {
    /** reversed system extension code for system. */
    static readonly reversedMaxNo = 1000;
    __encoder!: ReturnType<typeof createEncoder>;
    __decoder!: ReturnType<typeof createDecoder>;
    __ext!: ExtEntry<object>[];
    /**
     * create a new extension handler
     * @returns {ExtRegistry} The new extension registry
     */
    static create():ExtRegistry {
        const retObj = new ExtRegistry();
        retObj.__encoder = createEncoder();
        retObj.__decoder = createDecoder();
        retObj.__ext = createExtDecoder();
        return retObj;
    }
    /**
     *  Register a new extension entry.
     * @param dataClass The extension entry that have responsibility for encoding and decoding.
     * @param option option for extension entry
     * @returns {boolean} true if success, false if failed.
     * @since 1.0.0
     */
    register<T extends object >(dataClass: ExtEntry<T>, option: ExtRegisterOption = {}): boolean {
        if (dataClass.extCode < ExtRegistry.reversedMaxNo) {
            return false;
        }
        if (this.__encoder.has(dataClass)) {
            if (!option.overwriteEncoder) {
                return false;
            }
        }
        if (this.__ext[dataClass.extCode] !== undefined) {
            if (!option.overwriteDecoder) {
                return false;
            }
        }
        this.__encoder.set(dataClass, encodeExtensionSync);
        this.__ext[dataClass.extCode] = dataClass as unknown as ExtEntry<object>;
        return true;
    }
    /**
     * Unregister a extension entry
     * @param extNo The extension number
     * @returns {boolean} true if success, false if failed.
     * @since 1.0.0
     */
    unregister(extNo: number): boolean {
        const handler = this.__ext[extNo];
        if (handler !== undefined) {
            this.__encoder.delete(handler);
            delete this.__ext[extNo];
            return true;
        }
        return false;
    }
}