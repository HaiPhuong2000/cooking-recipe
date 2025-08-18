import { useState, useEffect } from 'react';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const BlurImage = ({ src, alt, className = '' }: BlurImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState('');

  useEffect(() => {
    // Reset loading state when src changes
    setIsLoading(true);

    // Create new image object
    const img = new Image();
    img.src = src;

    // When image loads, update state
    img.onload = () => {
      setIsLoading(false);
      setCurrentSrc(src);
    };

    // Clean up
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder với blur effect */}
      <div
        className={`absolute inset-0 bg-gray-200 ${
          isLoading ? 'animate-pulse' : 'hidden'
        }`}
      />

      {/* Actual image */}
      <img
        src={currentSrc || src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
      />
    </div>
  );
};
