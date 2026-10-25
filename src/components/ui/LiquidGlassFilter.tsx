import React from "react";

export function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -left-full -top-full h-0 w-0 opacity-0"
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <defs>
        <filter id="liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
          {/* Subtle turbulent noise for liquid texture */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.012"
            numOctaves="2"
            result="noise"
          />
          {/* Subtle displacement */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="8"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* Soft blur pass */}
          <feGaussianBlur in="displaced" stdDeviation="1.5" result="blurred" />
          {/* Specular lighting sheen */}
          <feSpecularLighting
            in="noise"
            surfaceScale="2"
            specularConstant="1.1"
            specularExponent="20"
            lightingColor="#ffffff"
            result="specular"
          >
            <feDistantLight azimuth="235" elevation="55" />
          </feSpecularLighting>
          {/* Composite specular light on blurred refraction */}
          <feComposite
            in="specular"
            in2="blurred"
            operator="in"
            result="specularReflected"
          />
          <feBlend mode="screen" in="blurred" in2="specularReflected" />
        </filter>
      </defs>
    </svg>
  );
}
