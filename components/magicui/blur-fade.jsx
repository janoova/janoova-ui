"use client";
import { useRef, useState, useEffect } from "react";

export function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!inView) {
      setIsInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: inViewMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, inViewMargin]);

  const axis = direction === "left" || direction === "right" ? "X" : "Y";
  const sign = direction === "right" || direction === "down" ? -1 : 1;
  const totalDelay = 0.04 + delay;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        filter: isInView ? "blur(0px)" : `blur(${blur})`,
        transform: isInView
          ? `translate${axis}(0px)`
          : `translate${axis}(${sign * offset}px)`,
        transition: `opacity ${duration}s ease-out ${totalDelay}s, filter ${duration}s ease-out ${totalDelay}s, transform ${duration}s ease-out ${totalDelay}s`,
      }}
    >
      {children}
    </div>
  );
}
