"use client"

import Image from "next/image"
import React from "react"

type BrandProps = {
  size?: number
  className?: string
  alt?: string
}

export function Brand({ size = 28, className = "", alt = "Vendorzo" }: BrandProps) {
  return (
    <Image
      src="/brand.webp"
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority
    />
  )
}
