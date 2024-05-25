"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { type CarouselApi } from "@/components/ui/carousel";

export default function ExpandingCarousel({ items }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const inViewThreshold = 0.3;

  
  const handleSelect = async (selectedIndex: number) => {
    console.log('selected:', selectedIndex);
  
    if (!api) return;

    const updateActiveIndex = () => {
      console.log('fully in view:', selectedIndex);
      setActiveIndex(selectedIndex);
    };

    const scrollSnaps = api.scrollSnapList();
    const currentScroll = api.scrollProgress();
    const targetSnap = scrollSnaps[selectedIndex];
    const threshold = inViewThreshold;
    const slidesInView = api.slidesInView(); // Get the slides in view
    const itemStart = targetSnap - inViewThreshold;
    const itemEnd = targetSnap + inViewThreshold;
    
    console.log(slidesInView.includes(selectedIndex));
    console.log(`is ${selectedIndex} fullyInView:`, currentScroll >= itemStart && currentScroll <= itemEnd);

    const isItemFullyInView = currentScroll >= itemStart && currentScroll <= itemEnd;
    if (isItemFullyInView){
      if(activeIndex === 3 ) {
        console.log(`${selectedIndex} is in 3.`);
        // api.scrollTo(selectedIndex);
      }
      console.log(`Item ${selectedIndex} is in view.`);
      api.scrollTo(selectedIndex);
       
    } else {
      console.log(`Item ${selectedIndex} is not fully in view.`);
      await new Promise(resolve => setTimeout(resolve, 200));
      api.scrollTo(selectedIndex);
    }
    updateActiveIndex();
  };

  const getAlignment = (index: any) => {
    if (index == 1) return "center";
    if (index === 2) return "end";
    return "start";
  };

  useEffect(() => {
    if (api) {
      api.on('select', () => {
        const selectedIndex = api.selectedScrollSnap();
        handleSelect(selectedIndex);
      });
    }
  }, [api]);

  useEffect(() => {
    console.log('activeIndex:', activeIndex);
  }, [activeIndex]);
  return (
    <div className="expandingCarousel">
      <h2 className="line-title">Trending Games</h2>
      <Carousel
        opts={{ startIndex: 0, align: getAlignment(activeIndex), containScroll: 'trimSnaps', inViewThreshold: inViewThreshold }}
        className="game-section"
        setApi={setApi} scrollTo={function (index: number): void {
          throw new Error("Function not implemented.");
        } }      >
        <CarouselContent>
          {items.map((item: any, index: any) => (
            <div className="w-auto" key={index}>
              <CarouselItem
                className={`md:basis-1/2 lg:basis-1/3`}
                onClick={() => handleSelect(index)}
              >
                <div className={`item ${activeIndex === index ? 'active' : ''} pl-0`} style={{ backgroundImage: `url(${item.backgroundImage})` }}>
                  <div className="item-desc">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
       
      </Carousel>
      <div className="flex justify-center mt-4">
        {items.map((_: any, index: any) => (
          <span
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-4 h-4 mx-2 cursor-pointer rounded-full ${index === activeIndex ? "bg-red-700" : "bg-gray-400"}`}
          ></span>
        ))}
        <span className="indicator flex-end">
          {activeIndex + 1} / {items.length}
        </span>
      </div>
    </div>
  );
}
