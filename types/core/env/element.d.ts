import { Options } from '../options';
export type Element = {
    $el: HTMLElement;
    $list: Array<HTMLElement>;
    $wrapper: HTMLElement;
};
export declare function Element(el: HTMLElement | string, options: Options): Element;
