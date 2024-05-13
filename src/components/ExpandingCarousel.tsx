/* eslint-disable react/jsx-key */
"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const items = [
    {
      "isActive": true,
      "backgroundImage": "https://www.yudiz.com/codepen/expandable-animated-card-slider/dota-2.jpg",
      "title": "Dota 2",
      "description": "Dota 2 is a multiplayer online battle arena by Valve. The game is a sequel to Defense of the Ancients, which was a community-created mod for Blizzard Entertainment's Warcraft III."
    },
    {
      "isActive": false,
      "backgroundImage": "https://www.yudiz.com/codepen/expandable-animated-card-slider/winter-3.jpg",
      "title": "The Witcher 3",
      "description": "The Witcher 3 is a multiplayer online battle arena by Valve. The game is a sequel to Defense of the Ancients, which was a community-created mod for Blizzard Entertainment's Warcraft III."
    },
    {
      "isActive": false,
      "backgroundImage": "https://www.yudiz.com/codepen/expandable-animated-card-slider/rdr-2.jpg",
      "title": "RDR 2",
      "description": "RDR 2 is a multiplayer online battle arena by Valve. The game is a sequel to Defense of the Ancients, which was a community-created mod for Blizzard Entertainment's Warcraft III."
    },
    {
      "isActive": false,
      "backgroundImage": "https://www.yudiz.com/codepen/expandable-animated-card-slider/pubg.jpg",
      "title": "PUBG Mobile",
      "description": "PUBG 2 is a multiplayer online battle arena by Valve. The game is a sequel to Defense of the Ancients, which was a community-created mod for Blizzard Entertainment's Warcraft III."
    },
    {
      "isActive": false,
      "backgroundImage": "https://www.yudiz.com/codepen/expandable-animated-card-slider/fortnite.jpg",
      "title": "Fortnite",
      "description": "Battle royale where 100 players fight to be the last person standing. which was a community-created mod for Blizzard Entertainment's Warcraft III."
    },
    {
      "isActive": false,
      "backgroundImage": "https://www.yudiz.com/codepen/expandable-animated-card-slider/far-cry-5.jpg",
      "title": "Far Cry 5",
      "description": "Far Cry 5 is a 2018 first-person shooter game developed by Ubisoft. which was a community-created mod for Blizzard Entertainment's Warcraft III."
    }
  ]
  


export default function ExpandingCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle activation and deactivation of carousel items
  const handleToggleActive = (index:any) => {
    console.log("Toggle active item:", index);
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleSelect = (selectedIndex:any) => {
    setActiveIndex(selectedIndex);
  };


  return (
    <div className="expandingCarousel">
        <h2 className="line-title">trending games</h2>
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 2
        }}
        className="game-section relative"
      >
        
        <CarouselContent
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: "transform 0.1s ease-in-out",
          }}
        >
        
          {items.map((item, index) => (
           <div className="w-auto">
                <CarouselItem
                    key={index}
                    className={`md:basis-1/2 lg:basis-1/3`}
                    onClick={() => handleToggleActive(index)}
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
        {items.map((_, index) => (
          <span
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-4 h-4 mx-2 cursor-pointer rounded-full ${index === activeIndex ? "bg-indigo-500" : "bg-gray-400"
              }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
