import { now } from './timing'

export type Tick = {
    run (cb: (interval: DOMHighResTimeStamp) => void): void
    stop (): void
}

// 将 webkitRequestAnimationFrame 替换为 requestAnimationFrame
export const nextFrame = requestAnimationFrame || setTimeout
// 将 webkitCancelAnimationFrame 替换为 cancelAnimationFrame
export const cancelNextFrame = cancelAnimationFrame || clearTimeout

export function Tick (): Tick {
    let startTime: number | undefined
    let id: number

    function run (cb: (interval: DOMHighResTimeStamp) => void): void {
        // eslint-disable-next-line no-void
        startTime = startTime === void 0
            ? now()
            : startTime

        // Why do not use callback argument:
        // https://stackoverflow.com/questions/50895206/exact-time-of-display-requestanimationframe-usage-and-timeline
        id = nextFrame(() => {
            const timeStamp = now()
            const interval = timeStamp - <number>startTime

            startTime = timeStamp
            cb(interval)
        })
    }

    function stop (): void {
        startTime = undefined
        cancelNextFrame(id)
    }

    return {
        run,
        stop
    }
}
