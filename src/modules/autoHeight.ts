import { SwiperInstance, SwiperPlugin } from '../core/index';
import { Options } from '../core/options';
import { LIFE_CYCLES } from '../core/eventHub';
import { attachListener, detachListener, getDataFromIndex, getSlideChildHeight } from '../core/render/dom';
import { nextFrame } from '../core/render/nextTick';
// import { debounce } from '../core/render/timing';

export type SwiperPluginAutoHeightOptions = {
  updateOnTransition?: boolean; // swiper 是否根据当前显示的 slider 中最高的自然高度设置 swiper 显示高度 
  multiplicative?: number; // swiper 是否根据当前显示的 slider 中最高的自然高度设置倍数来 swiper 显示高度 
  onlyActiveSlide?: boolean; // swiper 显示 slide 是否只有 active 的 slide
};

export type SwiperPluginAutoHeightInstance = {
  update (now?: boolean): void;
  resize (): void;
}

export type SwiperPluginAutoHeightPartialOptions =
  | Partial<SwiperPluginAutoHeightOptions>
  | boolean;

/**
 * 该插件是使得 swiper 组件根据当前 slider 最高的自然高度设置 swiper 显示高度 
 * @param {SwiperInstance} instance
 * @param {Options}
 */
export default <SwiperPlugin>function SwiperPluginAutoHeight(
  instance: SwiperInstance & {
    autoHeight?: SwiperPluginAutoHeightInstance;
  },
  options: Options & {
    autoHeight?: SwiperPluginAutoHeightOptions
  }
): void {
  const { slideActiveClass = 'swiper-slide-active', slidesPerView } = options;
  // 插件是否启用
  const isEnable = Boolean(options.autoHeight);
  if (!isEnable) return;

  // 获取插件配置
  const autoHeightOptions = <SwiperPluginAutoHeightOptions>Object.assign({
    updateOnTransition: false,
    multiplicative: 1,
    onlyActiveSlide: true,
  }, options.autoHeight);
  
  const { env } = instance;
  const { $el = null, $list = [], $wrapper = null } = env?.element;
  if (autoHeightOptions.onlyActiveSlide && slidesPerView > 1) return;

  // 获取初始化 swiper initialSlide 元素
  let firstActiveSlide = null as HTMLElement | null;

  const autoHeight: SwiperPluginAutoHeightInstance = {
    update (now = true):void {
      const {multiplicative = 1, onlyActiveSlide, updateOnTransition} = autoHeightOptions;
      if (!$el || !$list || !$wrapper) return;

      const slideActive = $list.find((item) => item.classList.contains(slideActiveClass)) as HTMLElement;
      if (!slideActive) return;
  
      const slideActiveIndex = $list.indexOf(slideActive)
      let height = getSlideChildHeight(slideActive);
      const width = slideActive.clientWidth;

      if (options.slidesPerView > 1 && !onlyActiveSlide) {
        const expand = Math.floor(options.slidesPerView);
        const visibleSlidesHeights = getDataFromIndex($list, slideActiveIndex, expand).map(item => getSlideChildHeight(item));
        const maxHeight= Math.max(...visibleSlidesHeights, height);
        height = maxHeight;
        console.log(options.slidesPerView, height);
      }

      height = height * multiplicative;
      const {dataset, children } = slideActive;

      if (options.slidesPerView === 1 && onlyActiveSlide) {
        const aspect = width/(height);
        if (!dataset?.aspect && aspect !== 0 && aspect !== Infinity) {
          dataset.aspect = `${aspect}`;
        }

        if (updateOnTransition) {
          (children?.item(0) as HTMLElement).style.height = '100%';
        } else {
          $list.forEach(item => {
            (item.children?.item(0) as HTMLElement).style.height = '100%';
          })
        }
      }

       // 如果计算的高度没有变化，则不更新
      if (height === 0 || $wrapper.clientHeight === height) return;

      $wrapper.style.height = `${ (width/Number(dataset?.aspect)) || height }px`;
      // now && env.update(env?.element);
      // nextFrame(instance.updateSize)
      // now && instance.update;
      // now && nextFrame(instance.update);
    },
    resize (): void {
      if (!$el || !$list || !$wrapper) return;
      autoHeight.update(false);
      nextFrame(instance.updateSize);
    }
  };

  if (autoHeightOptions.updateOnTransition) {
    instance.on(LIFE_CYCLES.AFTER_SLIDE, () => { autoHeight.update();});
  }

  const resizeListener = () => { autoHeight.resize();}

  const updateListener = () => { autoHeight.update();}

  instance.on(LIFE_CYCLES.AFTER_INIT, () => {
    instance.autoHeight = autoHeight
    if ($el) {
      $el.style.height = 'auto';
    }

    firstActiveSlide = $list.find((item) => item.classList.contains(slideActiveClass)) as HTMLElement;
    const flagHeight = getSlideChildHeight(firstActiveSlide);

    if (flagHeight) {
      autoHeight.update();
    } else {
      attachListener(
        firstActiveSlide?.querySelector('img') as HTMLElement,
        'load',
        updateListener
      );
    }

    window.addEventListener('resize', resizeListener, {passive: true})
  });

  instance.on(LIFE_CYCLES.AFTER_DESTROY, () => {
    detachListener(
      firstActiveSlide?.querySelector('img') as HTMLElement,
      'load',
      updateListener
    );
    window.removeEventListener('resize', resizeListener);
  });
};
