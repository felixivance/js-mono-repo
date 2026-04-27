// Shared Button — both apps import this.
// Uses plain CSS classes so it works framework-agnostic.

import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled ?? isLoading}
      data-variant={variant}
      data-size={size}
      className={`btn btn--${variant} btn--${size} ${className}`.trim()}
      aria-busy={isLoading}
    >
      {isLoading ? <span aria-hidden>…</span> : children}
    </button>
  );
}
