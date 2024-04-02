import { Options } from '../options';
import { State } from '../state/index';
import { Env } from '../env/index';
export type Renderer = {
    init(): void;
    render(state: State, duration?: number, cb?: Function, force?: boolean): void;
    destroy(): void;
    updateSize(): void;
};
export declare function Renderer(env: Env, options: Options): Renderer;
