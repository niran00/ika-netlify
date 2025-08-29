import React from 'react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

const EmblaCarousel = ({ recommendedProducts, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla w-full">
      <div className="embla__viewport" ref={emblaRef}>
        
        <div className="embla__container">
          {recommendedProducts.slice(0, 6).map((product) => (
            <div
              className="embla__slide flex items-stretch" // 👈 ensures all slides stretch
              key={product.id}
            >
              <Card className="bg-[#f5f5f7] border-none overflow-hidden hover:shadow-lg transition-transform transform duration-300 flex flex-col w-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover "
                  />
                </div>
          
                <CardContent className="text-start px-4 py-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-light text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-lg text-gray-600 mb-2 leading-relaxed">
                    {product.category}
                  </p>
                  <div className="mt-auto"> {/* 👈 pushes link to bottom */}
                    <a
                      href="#"
                      className="flex justify-center items-center text-[#00599c] text-base gap-1 hover:underline"
                    >
                      View Solutions <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
