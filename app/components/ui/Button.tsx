import React from "react";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

const baseStyles =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles = {
  primary: "bg-black text-white hover:bg-neutral-800",
  secondary: "bg-neutral-200 text-black hover:bg-neutral-300",
  ghost: "bg-transparent text-black hover:bg-neutral-100",
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
