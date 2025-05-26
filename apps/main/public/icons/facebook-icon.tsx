import React from "react";

interface FacebookIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  filled?: boolean;
}

const FacebookIcon = React.forwardRef<SVGSVGElement, FacebookIconProps>(
  ({ size = 24, color = "currentColor", filled = false, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? color : "none"}
        stroke={filled ? "none" : color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {filled ? (
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        ) : (
          <>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </>
        )}
      </svg>
    );
  }
);

FacebookIcon.displayName = "FacebookIcon";

export { FacebookIcon };