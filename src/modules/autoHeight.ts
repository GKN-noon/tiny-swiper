import { SwiperInstance, SwiperPlugin } from '../core/index';
import { Options } from '../core/options';
import { LIFE_CYCLES } from '../core/eventHub';
import { attachListener, detachListener } from '../core/render/dom';

export type SwiperPluginAutoHeightOptions = {
  updateOnTransition?: boolean; // swiper 是否根据当前显示的 slider 中最高的自然高度设置 swiper 显示高度 
  multiplicative?: number; // swiper 是否根据当前显示的 slider 中最高的自然高度设置倍数来 swiper 显示高度 
};

export type SwiperPluginAutoHeightInstance = {}

export type SwiperPluginAutoHeightPartialOptions =
  | Partial<SwiperPluginAutoHeightOptions>
  | boolean;

/**
 * 该插件是使得 swiper 组件根据当前 slider 最高的自然高度设置 swiper 显示高度 
 *
 */
export default <SwiperPlugin>function SwiperPluginAutoHeight(
  instance: SwiperInstance & {
    autoHeight?: SwiperPluginAutoHeightInstance;
  },
  options: Options & {
    autoHeight?: SwiperPluginAutoHeightOptions
  }
): void {
  const isEnable = Boolean(options.autoHeight);

  if (!isEnable) return;
  if (options.slidesPerView > 1) return;

  const autoHeightOptions = <SwiperPluginAutoHeightOptions>Object.assign({
    updateOnTransition: false,
    multiplicative: 1,
  }, options.autoHeight);

  const { env } = instance;
  const { $el = null, $list = [], $wrapper = null } = env?.element;
  const { slideActiveClass = 'swiper-slide-active' } = options;

  function getDataFromIndex(array: HTMLElement[], startIndex: number, count: number): HTMLElement[] {
    const length = array.length;
    const endIndex = startIndex + count;

    if (startIndex >= length) return [];

    return endIndex <= length
        ? array.slice(startIndex, endIndex)
        : array.slice(startIndex).concat(array.slice(0, endIndex % length));
  }

  function getSlideChildHeight(el: HTMLElement): number {
    return Array.from(el.children)
        .filter((child) => (child as HTMLElement).style.position !== 'absolute')
        .reduce((totalHeight, child) => totalHeight + (child as HTMLElement).clientHeight, 0);
  }

  const updateSliderHeight = () => {
    if (!$el || !$list || !$wrapper) return;

    const slideActive = $list.find((item) => item.classList.contains(slideActiveClass)) as HTMLElement;
    if (!slideActive) return;

    const slideActiveIndex = $list.indexOf(slideActive)
    let height = getSlideChildHeight(slideActive)

    if (options.slidesPerView > 1) {
      const expand = Math.floor(options.slidesPerView);
      const visibleSlidesHeights = getDataFromIndex($list, slideActiveIndex, expand).map(item => getSlideChildHeight(item));
      const maxHeight= Math.max(...visibleSlidesHeights, height);
      height = maxHeight;
    }

    if (height === 0 || $wrapper.clientHeight === height) return;

    $wrapper.style.height = `${ height * (autoHeightOptions.multiplicative as number) }px`;
    env.update(env?.element);
    console.log(height);
  };

  // updateSliderHeight();

  if (autoHeightOptions.updateOnTransition) {
    instance.on(LIFE_CYCLES.AFTER_SLIDE,  updateSliderHeight);
  }

  instance.on(LIFE_CYCLES.AFTER_INIT, () => {
    if($el) {
      $el.style.height = 'auto';
    }
    $list.map(item => {
      attachListener(
        item.querySelector('img') as HTMLElement,
        'load',
        updateSliderHeight
      );
    })
  });

  instance.on(LIFE_CYCLES.AFTER_DESTROY, () => {
    $list.map(item => {
      detachListener(
        item.querySelector('img') as HTMLElement,
        'load',
        updateSliderHeight
      );
    })
  });
};
