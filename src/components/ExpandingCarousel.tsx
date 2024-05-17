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
import Autoplay from "embla-carousel-autoplay"

export default function ExpandingCarousel({ items }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [tgtSnap, setTargetSnap] = useState(0);
  const [prevScroll, setPrevScroll] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    if (!api) return;

    const handleScroll = () => {
      const currentScroll = api.scrollProgress();
      if (currentScroll > prevScroll) {
        setScrollDirection("right");
      } else if (currentScroll < prevScroll) {
        setScrollDirection("left");
      }
      setPrevScroll(currentScroll);
    };

    api.on("scroll", handleScroll);

    return () => {
      api.off("scroll", handleScroll);
    };
  }, [api, prevScroll]);

  const handleSelect = async (selectedIndex: number) => {
    if (!api) return;

    console.log(scrollDirection);
    // Update the active index after ensuring the item is scrolled into view
    const updateActiveIndex = () => {
      console.log('Fully in view or scrolled to view:', selectedIndex);
      setActiveIndex(selectedIndex);
    };

    // Determine if the selected item is fully in view
    const scrollSnaps = api.scrollSnapList();
    const currentScroll = api.scrollProgress();
    const targetSnap = scrollSnaps[selectedIndex];
    const isItemFullyInView = Math.abs(currentScroll - targetSnap) < 0.1;

    // Scroll to the selected item if it is not fully in view and then update index
    if (!isItemFullyInView && selectedIndex > 1) {
      await new Promise(resolve => setTimeout(resolve, 200));
      console.log("targetSnap", targetSnap);
      setTargetSnap(targetSnap);
      await api.scrollTo(selectedIndex); // Smoothly scroll to the active item
    }
    updateActiveIndex();
  };

  // Set up a threshold to determine the position of the activeIndex in the context of the carousel.
  const getAlignment = (index: number, scrollDirection: "left" | "right" | null) => {
    if (index === 2 && scrollDirection === "left") {
      return "end";
    }
    return "start";
  };

  return (
    <div className="expandingCarousel">
      <h2 className="line-title">trending games</h2>
      {/* @ts-ignore */}
      <Carousel
        opts={{ align: getAlignment(activeIndex, scrollDirection), containScroll: 'keepSnaps', loop: true }}
        // plugins={[
        //   Autoplay({
        //     delay: 2000
        //   }),
        // ]}
        className="game-section"
        setApi={setApi}
      >
        <CarouselContent>
          {items.map((item: any, index: number) => (
            <div className="w-auto" key={index}>
              <CarouselItem
                className={`md:basis-1/2 lg:basis-1/3`}
                onClick={() => handleSelect(index)}
              >
                <div
                  className={`item ${activeIndex === index ? 'active' : ''} pl-0`}
                  style={{ backgroundImage: `url(${item.backgroundImage})` }}
                >
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
        {items.map((_: any, index: number) => (
          <span
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-4 h-4 mx-2 cursor-pointer rounded-full ${index === activeIndex ? "bg-red-700" : "bg-gray-400"}`}
          ></span>
        ))}
      </div>
      <div className="flex justify-end relative">
        <p className="font-black">{activeIndex + 1} / {items.length}</p>
      </div>
      <div className="scroll-direction">
        <p>Scroll Direction: {scrollDirection}</p>
      </div>
    </div>
  );
}
