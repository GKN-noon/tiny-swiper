import { SwiperPlugin } from '../core/index';
export type SwiperPluginKeyboardControlOptions = {
    enabled: boolean;
    onlyInViewport: boolean;
};
export type SwiperPluginKeyboardControlPartialOptions = Partial<SwiperPluginKeyboardControlOptions> | boolean;
export type SwiperPluginKeyboardInstance = {
    onKeyDown(e: Event): void;
    enable(): void;
    disable(): void;
};
/**
 * TinySwiper plugin for keyboard control.
 *
 * @param {SwiperInstance} instance
 * @param {Options}
 */
declare const _default: SwiperPlugin;
export default _default;
