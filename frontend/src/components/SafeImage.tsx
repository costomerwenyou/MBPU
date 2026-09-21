"use client";

import React, { useState, useRef, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
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
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
    setHasError(false);
  }, [src]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth !== 0) {
        setLoaded(true);
      }
    }
  }, [currentSrc]);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
      setLoaded(true);
    }
  };

  return (
    <div className={`relative overflow-hidden bg-muted/40 ${containerClassName}`}>
      {!loaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-muted/40 via-muted/80 to-muted/40 animate-pulse flex items-center justify-center z-0">
          <ImageIcon className="h-7 w-7 text-muted-foreground/30 animate-pulse" />
        </div>
      )}

      <img
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={`transition-all duration-500 ease-out ${
          loaded ? "opacity-100 scale-100 z-10 relative" : "opacity-0 scale-95"
        } ${className}`}
        {...props}
      />
    </div>
  );
}
