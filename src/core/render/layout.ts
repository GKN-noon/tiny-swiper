import { State } from '../state/index'
import { Env } from '../env/index'
import { setStyle } from './dom'
import { Options } from '../options'

/**
 * 将指定元素根据给定的参数进行平移转换。
 * @param state 包含当前状态信息的对象，如是否开始转换以及转换的像素值。
 * @param env 包含环境信息的对象，如待转换元素的包装器。
 * @param options 包含配置选项的对象，如转换是否为水平方向。
 * @param duration 转换持续的时间（毫秒）。
 * @returns void
 */
export function translate (
    state: State,
    env: Env,
    options: Options,
    duration: number
): void {
    const {
        $wrapper
    } = env.element // 从环境元素中解构出包装器元素

     // 根据是否开始转换及转换方向，设置包装器元素的样式
    const wrapperStyle = {
        transition: state.isStart
            ? 'none'
            : `transform ease ${duration}ms`,
        transform: options.isHorizontal
            ? `translate3d(${state.transforms}px, 0, 0)`
            : `translate3d(0, ${state.transforms}px, 0)`
    }

    // 将设置好的样式应用到包装器元素上
    setStyle($wrapper, wrapperStyle)
}
