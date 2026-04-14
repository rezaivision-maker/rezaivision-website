import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center text-center leading-tight rounded-full font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent disabled:pointer-events-none disabled:opacity-50 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 tracking-wide text-xs sm:text-sm";
    
    const variants = {
      primary: "gold-gradient text-brand-bg border border-brand-accent/30 hover:brightness-110 hover:shadow-[0_0_20px_rgba(200,164,107,0.3)] transition-all duration-300",
      secondary: "bg-white text-brand-bg hover:bg-gray-200 hover:scale-105 transition-all duration-300",
      outline: "border border-brand-accent/50 text-brand-accent hover:gold-gradient hover:text-white hover:border-transparent hover:shadow-[0_0_20px_rgba(200,164,107,0.2)] transition-all duration-300",
      ghost: "text-brand-text hover:text-brand-accent transition-colors duration-300",
    };
    
    const sizes = {
      sm: "min-h-[36px] py-2 px-4 text-sm",
      md: "min-h-[44px] py-2.5 px-8 text-base",
      lg: "min-h-[56px] py-3.5 px-10 text-lg",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) {
        return (
          <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
            {props.children}
          </a>
        );
      }
      if (href.startsWith("#")) {
        return (
          <a href={href} className={classes}>
            {props.children}
          </a>
        );
      }
      return (
        <Link to={href} className={classes}>
          {props.children}
        </Link>
      );
    }

    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
