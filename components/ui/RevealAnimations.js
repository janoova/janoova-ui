import LazyBlurFade from "@/components/ui/LazyBlurFade";
import EagerBlurFade from "@/components/ui/EagerBlurFade";

export const ConditionalBlurFade = ({
  enabled,
  delay,
  children,
  inView,
  className,
  offset,
  inViewMargin,
  lazy = true,
}) =>
  enabled ? (
    lazy ? (
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
      <EagerBlurFade
        inViewMargin={inViewMargin}
        offset={offset}
        className={className}
        inView={inView || true}
        delay={delay}
      >
        {children}
      </EagerBlurFade>
    )
  ) : (
    <>{children}</>
  );
