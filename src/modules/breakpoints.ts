import { debounce } from '../core/render/timing'
import { Options, UserOptions } from '../core/options'
import { SwiperInstance, SwiperPlugin } from '../core/index'
import { LIFE_CYCLES } from '../core/eventHub'
import { nextFrame } from '../core/render/nextTick'

export type SwiperPluginBreakpointsInstance = {
    update (): void
}
export type SwiperPluginBreakpointsOptions = {
    [key in number]: UserOptions
}

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
export default <SwiperPlugin>function SwiperPluginBreakpoints (
    instance: SwiperInstance & {
        breakpoints?: SwiperPluginBreakpointsInstance
    },
    options: Options & {
        breakpoints?: SwiperPluginBreakpointsOptions
        breakpointsBase?: string
    }
): void {
    const isEnabled = Boolean(options.breakpoints)
    const currentBreakpoints = {
        slidesPerView: options.slidesPerView,
        spaceBetween: options.spaceBetween,
    } as Partial<Options>

    const breakpoints: SwiperPluginBreakpointsInstance = {
        update (): void {

            if (!options.breakpoints) return
            console.log(options.slidesPerView,'1');

            for (const [breakpoint, values] of Object.entries(options.breakpoints)) {
                if ('window' === options.breakpointsBase) {
                    if (window.matchMedia(`(min-width: ${breakpoint}px)`).matches) {
                        console.log('..u',values, breakpoint);
                        instance.options = Object.assign(instance.options, values)
                    }
                    // else {
                    //     console.log('..d',currentBreakpoints, breakpoint);
                    //     instance.options = Object.assign(instance.options, currentBreakpoints)
                    // }
                } else if (+breakpoint <= instance.env.element.$el.offsetWidth) {
                    instance.options = Object.assign(instance.options, values)
                }
            }
            console.log(instance.options.slidesPerView,'2');
            nextFrame(instance.update)
        }
    }

    if (!isEnabled) return

    const resizeListener = debounce(breakpoints.update, 200) // the default timeout is 200ms

    instance.on(LIFE_CYCLES.AFTER_INIT, () => {
        instance.breakpoints = breakpoints
        breakpoints.update();
        window.addEventListener('resize', resizeListener, { passive: true })
    })
    instance.on(LIFE_CYCLES.BEFORE_DESTROY, () => {
        window.removeEventListener('resize', resizeListener)
    })
}
