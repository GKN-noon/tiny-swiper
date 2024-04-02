import { SwiperInstance, SwiperPlugin } from '../core/index';
import { Options } from '../core/options';
import { LIFE_CYCLES } from '../core/eventHub';
import { attachListener, detachListener } from '../core/render/dom';



export type SwiperPluginAdaptiveViewOptions = {
  mobileEl: HTMLElement | string
  desktopEl: HTMLElement | string
  disabledClass: string
};

export type SwiperPluginAdaptiveViewPartialOptions = Partial<SwiperPluginAdaptiveViewOptions>

export type SwiperPluginAdaptiveViewInstance = {
  mobileEl?: HTMLElement
  desktopEl?: HTMLElement
};


export default <SwiperPlugin>function SwiperPluginAdaptiveView(
  instance: SwiperInstance & {
    adaptiveView?: SwiperPluginAdaptiveViewInstance
  } ,
  options: Options & {
    adaptiveView?: SwiperPluginAdaptiveViewOptions
  }
): void {
  const isEnable = Boolean(options.adaptiveView);
  const adaptiveViewInstance = {
    mobileEl: null,
    desktopEl: null,
  } as unknown as SwiperPluginAdaptiveViewInstance
  
  if (!isEnable) return;

 
};
