import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost-light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  "ghost-light": "btn-ghost-light",
};

const sizes: Record<Size, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Polymorphic button: renders an <a>/<Link> when `href` is set, else a <button>. */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, children, ...props }, ref) {
    const classes = cn(variants[variant], sizes[size], className);

    if ("href" in props && props.href !== undefined) {
      const { href, ...rest } = props as ButtonAsLink;
      const isExternal = /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            target="_blank"
            rel="noopener noreferrer"
            {...rest}
          >
            {children}
          </a>
        );
      }
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }

    const { type = "button", ...rest } = props as ButtonAsButton;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} type={type} className={classes} {...rest}>
        {children}
      </button>
    );
  }
);
