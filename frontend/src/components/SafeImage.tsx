"use client";

import React, { useState } from "react";
import { Image as ImageIcon } from "lucide-react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
}

export default function SafeImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  ...props
}: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-muted/40 ${containerClassName}`}>
      {/* Skeleton Loading Shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted/40 via-muted/80 to-muted/40 animate-pulse flex items-center justify-center z-0">
          <ImageIcon className="h-7 w-7 text-muted-foreground/30 animate-pulse" />
        </div>
      )}

      {/* Image stays 100% hidden (opacity: 0) until completely loaded */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`transition-all duration-500 ease-out ${
          loaded ? "opacity-100 scale-100 z-10 relative" : "opacity-0 scale-95"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
