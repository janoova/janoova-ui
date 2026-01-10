import { useId } from "react";
import { cn } from "@/lib/utils";

export function DotPattern({
  width = 20,
  height = 20,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}) {
  const dotId = useId();
  const id = `dot-pattern-${dotId}`;

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "c__dot-pattern pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * GridPattern component that creates an efficient SVG grid pattern
 * @param {Object} props - Component props
 * @param {number} [props.width=20] - Grid cell width (smaller default)
 * @param {number} [props.height=20] - Grid cell height (smaller default)
 * @param {number} [props.x=0] - Pattern offset X
 * @param {number} [props.y=0] - Pattern offset Y
 * @param {number} [props.strokeWidth=1] - Grid line width
 * @param {string} [props.className] - Additional CSS classes
 */
export function GridPattern({
  width = 20,
  height = 20,
  x = 0,
  y = 0,
  strokeWidth = 1,
  className,
  ...props
}) {
  const gridId = useId();
  const id = `grid-pattern-${gridId}`;

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "c__grid-pattern pointer-events-none absolute inset-0 h-full w-full stroke-gray-300/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5,${height}V.5H${width}`}
            fill="none"
            strokeWidth={strokeWidth}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

export const BackgroundPattern = ({
  patternType = "dots",
  className,
  ...props
}) => {
  const Component =
    {
      dots: DotPattern,
      grid: GridPattern,
    }[patternType] || DotPattern;

  return <Component className={className} {...props} />;
};
