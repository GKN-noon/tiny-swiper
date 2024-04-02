import {
  defaultStyle,
  testPluginLifcycle
} from '../../common'
import SwiperPluginAutoHeight from '../../../src/modules/autoHeight'

describe('Plugin - AutoPlay', () => {
  testPluginLifcycle(
      `
      ${defaultStyle}
      <div class="swiper-container">
          <div class="swiper-wrapper">
              <!-- Slides -->
            <div class="swiper-slide">
              <img alt="" src="https://i.pinimg.com/564x/6c/f5/ff/6cf5ff09af4b421bccfd13d442742a9c.jpg" />
            </div>
            <div class="swiper-slide">
              <img alt="" src="https://i.pinimg.com/236x/0e/a0/34/0ea034dbeb9064df9fb3e68a6965e706.jpg" />
            </div>
            <div class="swiper-slide">
              <img alt="" src="https://i.pinimg.com/564x/86/92/b3/8692b3529b6afe184a8d7547a5467e7c.jpg" />
            </div>
            <div class="swiper-slide">
              <img alt="" src="https://i.pinimg.com/236x/04/de/12/04de12abe7f96dbe5b8a25eeab26dcb0.jpg" />
            </div>
            <div class="swiper-slide">
              <img alt="" src="https://i.pinimg.com/236x/d6/de/38/d6de38a4e8c36dafafcd2c49723a98d0.jpg" />
            </div>
          </div>
      </div>
      `,
      {
        autoHeight: {
          updateOnTransition: true,
        }
      },
      SwiperPluginAutoHeight,
      'SwiperPluginAutoHeight')
})
