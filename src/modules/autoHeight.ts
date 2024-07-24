import { SwiperInstance, SwiperPlugin } from '../core/index';
import { Options } from '../core/options';
import { LIFE_CYCLES } from '../core/eventHub';
import { attachListener, detachListener, getDataFromIndex, getSlideChildHeight } from '../core/render/dom';
import { nextFrame } from '../core/render/nextTick';
import { findClosestNumber } from '../core/utils';

type Media = {
  value: number;
  updateDom: boolean;
}

export type SwiperPluginAutoHeightOptions = {
  updateOnTransition?: boolean; // 是否在过渡时更新 swiper 高度
  multiplicative?: number; // 用于设置 swiper 高度的倍数
  multiplicativeMedia?: {
    [key: number]: Media; // 媒体查询的宽度
  }
  onlyActiveSlide?: boolean; // 是否仅调整活动 slide 的高度
};

export type SwiperPluginAutoHeightInstance = {
  update (): void; // 更新高度的方法
  resize (): void; // 调整大小的方法
}

export type SwiperPluginAutoHeightPartialOptions =
  | Partial<SwiperPluginAutoHeightOptions>
  | boolean;

/**
 * 插件使 swiper 组件根据当前 slide 的最大自然高度调整 swiper 显示高度
 * @param {SwiperInstance} instance - Swiper 实例
 * @param {Options} options - 配置选项
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
  const isEnable = Boolean(options.autoHeight); // 判断插件是否启用
  if (!isEnable) return;

  // 获取插件配置
  const autoHeightOptions = <SwiperPluginAutoHeightOptions>Object.assign({
    updateOnTransition: false,
    multiplicative: 1,
    multiplicativeMedia: null,
    onlyActiveSlide: true,
  }, options.autoHeight);
  const { env } = instance;
  const { $el = null, $list = [], $wrapper = null } = env?.element;

  if (autoHeightOptions.onlyActiveSlide && slidesPerView > 1) return;

  const { multiplicative = 1, onlyActiveSlide, updateOnTransition, multiplicativeMedia } = autoHeightOptions;
  const mediaLists = multiplicativeMedia ? Object.keys(multiplicativeMedia as {})?.map(key => Number(key)) : [];
  mediaLists.length > 0 && mediaLists?.sort((a, b) => a - b);
  let firstActiveSlide: HTMLElement | null = null;
  let currentMedia = {
    value: multiplicative,
    updateDom: false,
  } as Media;

  const autoHeight: SwiperPluginAutoHeightInstance = {
    update (): void {
      if (!$el || !$list || !$wrapper) return;
      const slideActive = $list.find((item) => item.classList.contains(slideActiveClass)) as HTMLElement;
      if (!slideActive) return;
      
      const slideActiveIndex = $list.indexOf(slideActive);
      const { dataset, children } = slideActive;
      let height = getSlideChildHeight(slideActive);
      const width = slideActive.clientWidth;

      if (window && window?.innerWidth > 0 && multiplicativeMedia) {
        const matchedMedia = findClosestNumber(mediaLists, window.innerWidth);
        if (matchedMedia && multiplicativeMedia?.[matchedMedia]?.value >= 0 && multiplicativeMedia?.[matchedMedia]?.value !== currentMedia.value) {
          currentMedia = multiplicativeMedia[matchedMedia];
        }

        if (matchedMedia > mediaLists?.[mediaLists?.length - 1]) {
          currentMedia = {
            value: multiplicative,
            updateDom: true,
          }
        }
      }
    
      if(currentMedia.updateDom) {
        $wrapper.style.height = 'auto';
        height = getSlideChildHeight(slideActive);
        delete dataset?.aspect;
      }

      if (slidesPerView > 1 && !onlyActiveSlide) {
        const expand = Math.floor(slidesPerView);
        const visibleSlidesHeights = getDataFromIndex($list, slideActiveIndex, expand).map(item => getSlideChildHeight(item));
        const maxHeight = Math.max(...visibleSlidesHeights, height);
        height = maxHeight;
      }

      if (slidesPerView === 1 && onlyActiveSlide) {
        const aspect = width / height;
        if (!dataset?.aspect && aspect !== 0 && aspect !== Infinity) {
          dataset.aspect = `${aspect}`;
        }

        if (updateOnTransition) {
          (children?.item(0) as HTMLElement).style.height = '100%';
        } else {
          $list.forEach(item => {
            (item.children?.item(0) as HTMLElement).style.height = '100%';
          });
        }
      }

      height *= currentMedia.value;
      if (height === 0) return;

      $wrapper.style.height = `${ (width / Number(dataset?.aspect) * currentMedia.value) || height }px`;
    },
    resize (): void {
      if (!$el || !$list || !$wrapper) return;
      autoHeight.update();
      nextFrame(instance.updateSize);
    }
  };

  if (autoHeightOptions.updateOnTransition) {
    instance.on(LIFE_CYCLES.AFTER_SLIDE, () => { autoHeight.update(); });
  }

  const resizeListener = () => { 
    autoHeight.resize(); 
  };

  const updateListener = () => { autoHeight.update(); };

  instance.on(LIFE_CYCLES.AFTER_INIT, () => {
    instance.autoHeight = autoHeight;
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

    window.addEventListener('resize', resizeListener, { passive: true });
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