"use client"

import * as React from "react"

export function PwaRegister() {
  React.useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return
    }

    const registerServiceWorker = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        })
      } catch (error) {
        console.error("Service worker registration failed", error)
      }
    }

    if (document.readyState === "complete") {
      void registerServiceWorker()
      return
    }

    window.addEventListener("load", registerServiceWorker, { once: true })

    return () => {
      window.removeEventListener("load", registerServiceWorker)
    }
  }, [])

  return null
}
