import { AdvancedButton } from "./AdvancedButton"
import Icon from "./Icons"

/**
 *
 * @returns: Navigation til Gallery.
 * @example: <CarouselNavigation swiperRef={swiperRef} />
 * @alias: CarouselNavigation
 * @summary: Denne komponent bruges til at oprette navigation til galleri.
 * @version: 1.0.0
 * @property: [swiperRef]
 * @author: Kasper Buchholtz
 *
 **/

const CarouselNavigation = ({ swiperRef }) => {
  return (
    <div className="absolute inset-0 z-10 justify-between hidden h-full pr-4 pointer-events-none md:flex xs:pr-4 sm:pr-13 md:pr-24 lg:pr-19 xl:pr-36 2xl:pr-52">
      <span className="my-auto pointer-events-auto">
        <AdvancedButton
        className="w-10 h-10"
        variant="secondary"
          onClick={() => swiperRef.current.swiper.slidePrev()}
        >
          <Icon
            className="my-auto -rotate-90 fill-light-light size-4 "
            type="chevronUp"
          />
        </AdvancedButton>
      </span>

      <span className="my-auto pointer-events-auto">
        <AdvancedButton
          variant="secondary"
          className="w-10 h-10"
          onClick={() => swiperRef.current.swiper.slideNext()}
        >
          <Icon
            className="my-auto rotate-90 fill-light-light size-4 "
            type="chevronUp"
          />
        </AdvancedButton>
      </span>
    </div>
  )
}

export default CarouselNavigation