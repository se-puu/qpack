import { ExtRegistry } from "../lib/ext-registry";
import { QAsyncEncoder, QEncoder } from "./encoder";

export type AsyncEncoderOption = {
    onData(data: Uint8Array): void;
    onCompleted?(): void;
    onError?(error: Error): void;
    bufferSize?: QAsyncEncoder["bufferSize"];
    onDataNeeded?: QAsyncEncoder["__onDataNeeded"] | undefined;
}

export type EncoderExpandHandler = <T extends boolean|undefined,U extends T extends true ? Uint8Array : undefined,V extends T extends true ? number : undefined>(encoder:QEncoder,requiredSize:number,isInitial:T,oldBuf: U, offset:V) => Uint8Array;
export type EncoderReleaseHandler = (buf: Uint8Array) => void;
export type EncoderOption = {
    initialSize?: number;
    extRegistry?: ExtRegistry;
    onExpand?: EncoderExpandHandler;
    onRelease?: EncoderReleaseHandler;
}