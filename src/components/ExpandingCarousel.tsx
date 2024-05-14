"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { type CarouselApi } from "@/components/ui/carousel";

export default function ExpandingCarousel({ items }:any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const handleSelect = async (selectedIndex: React.SetStateAction<number>) => {
    if (!api) return;
    setActiveIndex(selectedIndex);  // Update the active index

    await new Promise(resolve => setTimeout(resolve, 200));  // Short delay to allow state to update

    // Determine if the selected item is fully in view
    const scrollSnaps = api.scrollSnapList();
    const currentScroll = api.scrollProgress();
    // @ts-ignore
    const targetSnap = scrollSnaps[selectedIndex];
    const isItemFullyInView = Math.abs(currentScroll - targetSnap) < 0.5;

    // Scroll to the selected item if it is not fully in view
    if (!isItemFullyInView) {
      // @ts-ignore
      api.scrollTo(selectedIndex, true);  // Smooth scrolling
    }
  };

  return (
    <div className="expandingCarousel">
      <h2 className="line-title">trending games</h2>
      {/* // @ts-ignore */}
      <Carousel opts={{ align: "start" }} className="game-section" setApi={setApi} scrollTo={function (index: number): void {
        throw new Error("Function not implemented.");
      } }>
        <CarouselContent>
          {items.map((item: { backgroundImage: any; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: React.Key | null | undefined) => (
            <div className="w-auto" key={index}>
              <CarouselItem
                className={`md:basis-1/2 lg:basis-1/3`}
                onClick={() => handleSelect(index)}
              >
                <div className={`item ${activeIndex === index ? 'active' : ''} pl-0`} style={{
                  backgroundImage: `url(${item.backgroundImage})`
                }}>
                  <div className="item-desc">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex justify-center mt-4">
        {items.map((_: any, index: React.Key | null | undefined) => (
          <span
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-4 h-4 mx-2 cursor-pointer rounded-full ${index === activeIndex ? "bg-red-700" : "bg-gray-400"}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
