import { SwiperPlugin } from '../core/index';
export type SwiperPluginAutoPlayOptions = {
    delay: number;
    disableOnInteraction: boolean;
    reverseDirection: boolean;
    stopOnLastSlide: boolean;
    waitForTransition: boolean;
};
export type SwiperPluginAutoPlayPartialOptions = Partial<SwiperPluginAutoPlayOptions> | boolean;
export type SwiperPluginAutoPlayInstance = {};
/**
 * TinySwiper plugin for auto paly.
 *
 * @param {SwiperInstance} instance
 * @param {Options}
 */
declare const _default: SwiperPlugin;
export default _default;
