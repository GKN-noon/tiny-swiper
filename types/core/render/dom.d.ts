export declare function addClass(el: HTMLElement, list?: Array<string> | string): void;
export declare function removeClass(el: HTMLElement, list?: Array<string> | string): void;
export declare function attachListener(el: HTMLElement | Document | Window, evtName: string, handler: EventListenerOrEventListenerObject, opts?: boolean | AddEventListenerOptions): void;
export declare function detachListener(el: HTMLElement | Document | Window, evtName: string, handler: EventListenerOrEventListenerObject): void;
export declare function removeAttr(el: HTMLElement, attr: string): void;
export declare function setAttr(el: HTMLElement, attr: string, value?: string): HTMLElement;
export declare function setStyle(el: HTMLElement, style: {
    [key: string]: string;
}, forceRender?: boolean): HTMLElement;
export declare function getTranslate(el: HTMLElement, isHorizontal: boolean): number;
export declare function stringToElement(string: string): HTMLElement;
export declare function getSlideChildHeight(el: HTMLElement): number;
/**
 * 获取数组中指定位置的元素
 * @param {HTMLElement[]} array
 * @param {number} startIndex
 * @param {number} count
 * @returns {HTMLElement[]}
 */
export declare function getDataFromIndex(array: HTMLElement[], startIndex: number, count: number): HTMLElement[];
