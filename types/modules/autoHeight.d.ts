import { SwiperPlugin } from '../core/index';
type Media = {
    value: number;
    updateDom: boolean;
}

export type SwiperPluginAutoHeightOptions = {
    updateOnTransition?: boolean;
    multiplicative?: number;
    multiplicativeMedia?: {
        [key: number]: Media;
    };
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
