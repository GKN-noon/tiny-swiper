import { SwiperPlugin } from '../core/index';
export type SwiperPluginLazyloadOptions = {
    loadPrevNext: boolean;
    loadPrevNextAmount: number;
    loadOnTransitionStart: boolean;
    elementClass: string;
    loadingClass: string;
    loadedClass: string;
    preloaderClass: string;
};
export type SwiperPluginLazyloadPartialOptions = Partial<SwiperPluginLazyloadOptions> | boolean;
export type SwiperPluginLazyloadHTMLElement = HTMLImageElement & {
    isLoaded: boolean;
};
export type SwiperPluginLazyloadInstance = {
    load(index: number): void;
    loadRange(index: number, range: number): void;
};
/**
 * TinySwiper plugin for image lazy loading.
 *
 * @param {SwiperInstance} instance
 * @param {Options}
 */
declare const _default: SwiperPlugin;
export default _default;
