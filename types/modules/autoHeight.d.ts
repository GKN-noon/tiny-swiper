import { SwiperPlugin } from '../core/index';
export type SwiperPluginAutoHeightOptions = {
    updateOnTransition?: boolean;
    multiplicative?: number;
    onlyActiveSlide?: boolean;
};
export type SwiperPluginAutoHeightInstance = {
    update(now?: boolean): void;
    resize(): void;
};
export type SwiperPluginAutoHeightPartialOptions = Partial<SwiperPluginAutoHeightOptions> | boolean;
/**
 * 该插件是使得 swiper 组件根据当前 slider 最高的自然高度设置 swiper 显示高度
 * @param {SwiperInstance} instance
 * @param {Options}
 */
declare const _default: SwiperPlugin;
export default _default;
