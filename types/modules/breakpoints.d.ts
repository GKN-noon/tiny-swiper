import { UserOptions } from '../core/options';
import { SwiperPlugin } from '../core/index';
export type SwiperPluginBreakpointsInstance = {
    update(): void;
};
export type SwiperPluginBreakpointsOptions = {
    [key in number]: UserOptions;
};
/**
 *  该模块与 loop 配置间有问题
 *  Q1: loop 配置为前后各个复制一个头尾 slide ，则在 slidesPerView 大于 1 时滑动到当前循环的末尾后异常空白
 *  A1: 可以将 loop 复制数量增多
 * 该模块与 slidesPerView 配置间有问题
 *  Q2: 设置多个媒体查询下的配置 slidesPerView ,则在大尺寸先小尺寸切换 slidersPerView 数量错误
 *  A2:
 * TinySwiper plugin for breakpoints.
 *
 * @param {SwiperInstance} instance
 * @param {Options}
 */
declare const _default: SwiperPlugin;
export default _default;
