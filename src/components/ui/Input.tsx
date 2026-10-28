import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-ink/80 tracking-wide">{label}</label>
        )}
        <div className="relative flex items-center">
          {icon && <span className="absolute left-4 text-ink/50 pointer-events-none">{icon}</span>}
          <input
            ref={ref}
            className={cn(
              "w-full bg-white text-ink rounded-pill px-5 py-3 text-sm font-medium",
              "border border-navy/18 placeholder:text-ink/40 shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all",
              Boolean(icon) && "pl-11",
              Boolean(error) && "border-orange ring-1 ring-orange",
              className,
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs font-bold text-orange">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, children, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-ink/80 tracking-wide">{label}</label>
        )}
        <select
          ref={ref}
          className={cn(
            "w-full bg-white text-ink rounded-pill px-5 py-3 text-sm font-medium",
            "border border-navy/18 shadow-sm cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all",
            Boolean(error) && "border-orange ring-1 ring-orange",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        {error && <span className="text-xs font-bold text-orange">{error}</span>}
      </div>
    );
  },
);

Select.displayName = "Select";

export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  className,
}: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={onChange}
      className={cn(
        "w-full h-2.5 bg-navy/15 rounded-pill appearance-none cursor-pointer accent-navy",
        className,
      )}
    />
  );
}
