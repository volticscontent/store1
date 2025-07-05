"use client"

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  src: string
  alt: string
  width: number
  height: number
  fallbackSrc?: string
  className?: string
  priority?: boolean
  [key: string]: any
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fallbackSrc = '/placeholder.jpg',
  className = '',
  priority = false,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={handleError}
      {...props}
    />
  )
} 