import { SwiperPlugin } from '../core/index';
export type SwiperPluginMousewheelOptions = {
    invert: boolean;
    sensitivity: number;
    interval: number;
};
export type SwiperPluginMousewheelPartialOptions = Partial<SwiperPluginMousewheelOptions>;
export type SwiperPluginMousewheelInstance = {
    $el?: HTMLElement;
};
declare const _default: SwiperPlugin;
export default _default;
