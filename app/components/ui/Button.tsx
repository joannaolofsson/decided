import React from "react";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

const baseStyles =
  "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-50 disabled:cursor-not-allowed ";

const variantStyles = {
  primary: "bg-[#c084fc] text-foreground hover:bg-[#c690fc]",
  secondary: "bg-[#A5F3FC] text-foreground hover:bg-[#aef4fc]",
  ghost: "bg-transparent text-foreground hover:bg-neutral-100",
  glass: "bg-transparent backdrop-blur border border-[#dddddd] text-foreground hover:border-[#b1b1b1]",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </button>
  );
}
