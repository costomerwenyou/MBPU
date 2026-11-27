"use client";

import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";

interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string;
  containerClassName?: string;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  fallbackSrc,
  ...props
}: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 p-4 border border-dashed border-slate-200 ${containerClassName || className}`}
      >
        <ImageIcon className="h-8 w-8 text-slate-300 mb-1" />
        <span className="text-xs text-center font-medium line-clamp-1">
          {alt || "Image unavailable"}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        className={className}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
}
