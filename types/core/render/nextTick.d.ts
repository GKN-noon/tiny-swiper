export type Tick = {
    run(cb: (interval: DOMHighResTimeStamp) => void): void;
    stop(): void;
};
export declare const nextFrame: typeof requestAnimationFrame | typeof setTimeout;
export declare const cancelNextFrame: typeof cancelAnimationFrame;
export declare function Tick(): Tick;
