import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Vendorzo",
    short_name: "Vendorzo",
    description: "Vendorzo POS by Eastrix Labs for modern point-of-sale operations.",
    start_url: "/dashboard",
    scope: "/",
    display: "standalone",
    background_color: "#151518",
    theme_color: "#151518",
    orientation: "portrait",
    lang: "en",
    categories: ["business", "productivity", "shopping"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  }
}
