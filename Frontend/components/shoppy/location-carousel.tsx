"use client"

import * as React from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

const LOCATION_SLIDES = [
  {
    location: "Pettah Market",
    caption: "Bargain-hunt the historic street stalls",
    image: "/images/shop-market.png",
    alt: "Colorful handicraft and souvenir stalls inside Pettah Market, Colombo",
  },
  {
    location: "Colombo City Center",
    caption: "Fashion boutiques on every level",
    image: "/images/shop-mall.png",
    alt: "Glass-fronted fashion boutique inside Colombo City Center mall",
  },
  {
    location: "Havelock City",
    caption: "Electronics and gadgets, all in one row",
    image: "/images/shop-electronics.png",
    alt: "Electronics shop shelves stocked with phones and gadgets in Havelock City",
  },
  {
    location: "One Galle Face",
    caption: "Fine jewelry with an oceanfront view",
    image: "/images/shop-jewelry.png",
    alt: "Elegant jewelry display cases at One Galle Face",
  },
  {
    location: "Marino Mall",
    caption: "Grab a bite between shop stops",
    image: "/images/shop-foodcourt.png",
    alt: "Lively food court with colorful stalls at Marino Mall",
  },
] as const

export function LocationCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
    <div className="mx-auto w-full max-w-4xl">
      <Carousel setApi={setApi} opts={{ loop: true }} className="group">
        <CarouselContent>
          {LOCATION_SLIDES.map((slide) => (
            <CarouselItem key={slide.location}>
              <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-96">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                  priority={slide.location === "Pettah Market"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 sm:p-7">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <MapPin className="size-3.5" />
                    {slide.location}
                  </span>
                  <p className="text-lg font-bold text-foreground sm:text-xl">{slide.caption}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 border-border/60 bg-background/70 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100 sm:-left-4" />
        <CarouselNext className="right-3 border-border/60 bg-background/70 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100 sm:-right-4" />
      </Carousel>
      <div className="mt-4 flex items-center justify-center gap-2">
        {LOCATION_SLIDES.map((slide, index) => (
          <button
            key={slide.location}
            type="button"
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to ${slide.location} slide`}
            aria-current={index === current}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === current ? "w-6 bg-primary" : "w-1.5 bg-border",
            )}
          />
        ))}
      </div>
    </div>
  )
}
