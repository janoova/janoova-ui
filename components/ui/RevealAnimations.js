import LazyBlurFade from "@/components/ui/LazyBlurFade";

export const ConditionalBlurFade = ({
  enabled,
  delay,
  children,
  inView,
  className,
  offset,
  inViewMargin,
}) =>
  enabled ? (
    <LazyBlurFade
      inViewMargin={inViewMargin}
      offset={offset}
      className={className}
      inView={inView || true}
      delay={delay}
    >
      {children}
    </LazyBlurFade>
  ) : (
    <>{children}</>
  );
