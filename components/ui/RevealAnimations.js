import { BlurFade } from "@/components/magicui/blur-fade";

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
    <BlurFade
      inViewMargin={inViewMargin}
      offset={offset}
      className={className}
      inView={inView || true}
      delay={delay}
    >
      {children}
    </BlurFade>
  ) : (
    <>{children}</>
  );
