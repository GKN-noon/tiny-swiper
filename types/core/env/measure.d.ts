import { Options } from '../options';
import { Element } from './element';
export type Measure = {
    boxSize: number;
    viewSize: number;
    slideSize: number;
};
export declare function Measure(options: Options, element: Element): Measure;
