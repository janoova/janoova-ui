"use client";
import { cn } from "@/lib/utils";
import ReactFastMarquee from "react-fast-marquee";

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  speed = 20,
  repeat,
  ...props
}) {
  const direction = vertical ? "up" : reverse ? "right" : "left";

  return (
    <div className="relative">
      <ReactFastMarquee
        className={cn(className)}
        direction={direction}
        pauseOnHover={pauseOnHover}
        speed={speed}
        autoFill={true}
        gradient={false}
        {...props}
      >
        {children}
      </ReactFastMarquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10" />
    </div>
  );
}
