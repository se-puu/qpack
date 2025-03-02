import { ExtRegistry } from "../lib/ext-registry";

export type QAsyncDecoderOption = {
    onData(data: unknown): void;
    onError?(error: Error): void;
};

export type QDecoderOption = {
    extRegistry?: ExtRegistry;
};