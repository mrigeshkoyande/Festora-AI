import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "elevated" | "flat" | "navy";
  children: React.ReactNode;
}

export function Card({
  variant = "solid",
  className,
  children,
  ...props
}: CardProps) {
  const variantClasses = {
    // Solid white surface for legibility
    solid: "bg-white border border-navy/10 shadow-sm rounded-card",
    elevated: "bg-white border border-navy/12 shadow-md shadow-ink/5 rounded-card",
    flat: "bg-bg border border-navy/10 rounded-card",
    navy: "bg-navy text-bg border border-white/10 rounded-card shadow-lg",
  };

  return (
    <div className={cn("p-6", variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  subtitle,
  icon,
  badge,
  className,
  children,
  bgImage,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  bgImage?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-card-lg p-8 transition-all duration-300 group",
        "bg-white border border-navy/12 hover:border-navy/30 shadow-sm hover:shadow-md",
        className
      )}
    >
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 transition-opacity duration-500 group-hover:opacity-25"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            {icon && (
              <div className="w-12 h-12 rounded-2xl bg-navy/8 flex items-center justify-center text-navy">
                {icon}
              </div>
            )}
            {badge && <div>{badge}</div>}
          </div>
          <h3 className="font-grotesk text-2xl font-bold text-navy tracking-tight mb-2">
            {title}
          </h3>
          {subtitle && (
            <p className="text-ink/75 text-sm leading-relaxed">{subtitle}</p>
          )}
        </div>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
