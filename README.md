
## Usage

### Installation

```shell
# via npm
$ npm install tiny-swiper --save

# via yarn
$ yarn add tiny-swiper
```

If you prefer CDN

```html
<script src="https://unpkg.com/tiny-swiper@latest"></script>
```

### Initialization

Html code:

```html
<!-- Slider main container -->
<div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        ...
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>
</div>
```

JavaScript/TypeScript code:

```javascript
import Swiper, {
    SwiperPluginLazyload,
    SwiperPluginPagination
} from 'tiny-swiper'

Swiper.use([ SwiperPluginLazyload, SwiperPluginPagination ])

const swiper = new Swiper(swiperContainer: HTMLElement | string, parameters?: TinySwiperParameters)
```

- `new Swiper()` - initialize swiper with options.
- `Swiper.use()` - Register plugin.
- `swiperContainer` - HTMLElement or string (with CSS Selector) of swiper container HTML element. Required.
- `parameters` - object with Swiper parameters. Optional.


You also can load full-featured Tiny-Swiper:

```javascript
import Swiper from 'tiny-swiper/lib/index.full.js'
```

```html
<script src="https://unpkg.com/tiny-swiper@latest/lib/index.full.js"></script>
```

## Browsers support
