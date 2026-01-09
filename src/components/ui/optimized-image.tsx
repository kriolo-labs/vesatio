"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  objectFit?: "cover" | "contain" | "fill";
  blurDataURL?: string;
  quality?: number;
}

// Default blur placeholder (tiny gray base64)
const DEFAULT_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHB8fHx8fHx8fHx//2wBDAQcHBw0MDRgQEBgaFREVGh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx//wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAHxAAAgEDBQEAAAAAAAAAAAAAAQIAAwQRBRIhMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQABBQAAAAAAAAAAAAAAAAABAAIDESH/2gAMAwEAAhEDEEA/AJuoahdWdzLWlSjUhlBIyBkDB+REREA2Nhun/9k=";

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  objectFit = "cover",
  blurDataURL = DEFAULT_BLUR,
  quality = 85,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn("flex items-center justify-center bg-onyx-800 text-diamond-muted", className)}
        style={{ width, height }}
      >
        <span className="text-xs">Imagem indisponível</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataURL}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          objectFit === "cover" && "object-cover",
          objectFit === "contain" && "object-contain",
          objectFit === "fill" && "object-fill"
        )}
      />
    </div>
  );
}

// Responsive Image with srcset
interface ResponsiveImageProps extends OptimizedImageProps {
  sizes?: string;
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  // sizes is passed through props spread for future srcset support
  _sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: ResponsiveImageProps) {
  return <OptimizedImage src={src} alt={alt} width={width} height={height} {...props} />;
}

// Background Image with lazy loading
export function LazyBackgroundImage({
  src,
  className,
  children,
}: {
  src: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [isInView, setIsInView] = useState(false);

  return (
    <div
      className={cn("relative", className)}
      style={{
        backgroundImage: isInView ? `url(${src})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      ref={(el) => {
        if (el && "IntersectionObserver" in window) {
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
              }
            },
            { rootMargin: "100px" }
          );
          observer.observe(el);
        }
      }}
    >
      {children}
    </div>
  );
}
