import { SwiperPlugin } from '../core/index';
export type SwiperPluginNavigationOptions = {
    nextEl: HTMLElement | string;
    prevEl: HTMLElement | string;
    disabledClass: string;
};
export type SwiperPluginNavigationPartialOptions = Partial<SwiperPluginNavigationOptions>;
export type SwiperPluginNavigationInstance = {
    nextEl?: HTMLElement;
    prevEl?: HTMLElement;
};
declare const _default: SwiperPlugin;
export default _default;
