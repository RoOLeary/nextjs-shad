"use client"
import React, { useState, useRef } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import { DotButton, useDotButton } from './DotButton'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './ArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import './embla.css'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

export default function DefaultCarousel(props:PropType){
  const { slides, options } = props
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
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index: React.Key | null | undefined) => (
            <div className="embla__slide md:basis-1/2 lg:basis-1/3" key={index}>
             {/* @ts-ignore */}
              <div className="embla__slide__number">{index + 1}</div>
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
              className={'bg-black ml-1 embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
