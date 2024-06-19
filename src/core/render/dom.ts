export function addClass (
    el: HTMLElement,
    list: Array<string> | string = []
): void {
    if (!Array.isArray(list)) list = [list]

    list.forEach(clz => (!el.classList.contains(clz) && el.classList.add(clz)))
}

export function removeClass (
    el: HTMLElement,
    list: Array<string> | string = []
): void {
    if (!Array.isArray(list)) list = [list]

    list.forEach(clz => (el.classList.contains(clz) && el.classList.remove(clz)))
}

export function attachListener (
    el: HTMLElement | Document | Window,
    evtName: string,
    handler: EventListenerOrEventListenerObject,
    opts?: boolean | AddEventListenerOptions
): void {
    el.addEventListener(evtName, handler, opts)
}

export function detachListener (
    el: HTMLElement | Document | Window,
    evtName: string,
    handler: EventListenerOrEventListenerObject
): void {
    el.removeEventListener(evtName, handler)
}

export function removeAttr (
    el: HTMLElement,
    attr: string
): void {
    el.removeAttribute(attr)
}

export function setAttr (
    el: HTMLElement,
    attr: string,
    value = ''
): HTMLElement {
    el.setAttribute(attr, value)
    return el
}

export function setStyle (
    el: HTMLElement,
    style: {[key: string]: string},
    forceRender?: boolean
): HTMLElement {
    Object.keys(style).forEach(prop => {
        // TS7015: Element implicitly has an 'any' type because index expression is not of type 'number'.
        el.style[prop as any] = style[prop]
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    forceRender && getComputedStyle(el)

    return el
}

export function getTranslate (
    el: HTMLElement,
    isHorizontal: boolean
): number {
    const matrix = getComputedStyle(el).transform.replace(/[a-z]|\(|\)|\s/g, '').split(',').map(parseFloat)
    let arr: Array<number> = []

    if (matrix.length === 16) {
        arr = matrix.slice(12, 14)
    } else if (matrix.length === 6) {
        arr = matrix.slice(4, 6)
    }
    return (<Array<number>>arr)[isHorizontal ? 0 : 1] || 0
}

export function stringToElement (
    string: string
): HTMLElement {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = string
    return wrapper.firstChild as HTMLElement
}


export function getSlideChildHeight(el: HTMLElement): number {
    return Array.from(el.children)
    .filter((child) => (child as HTMLElement).style.position !== 'absolute')
    .reduce((totalHeight, child) => totalHeight + (child as HTMLElement).clientHeight, 0);
}

export function getSlideChildWidth(el: HTMLElement): number {
    return el.clientWidth;
}



/**
 * 获取数组中指定位置的元素
 * @param {HTMLElement[]} array 
 * @param {number} startIndex 
 * @param {number} count 
 * @returns {HTMLElement[]}
 */
export function getDataFromIndex(array: HTMLElement[], startIndex: number, count: number): HTMLElement[] {
    const length = array.length;
    const endIndex = startIndex + count;

    if (startIndex >= length) return [];

    return endIndex <= length
        ? array.slice(startIndex, endIndex)
        : array.slice(startIndex).concat(array.slice(0, endIndex % length));
  }