"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type MotionPreference = "full" | "reduced";
type ContrastPreference = "standard" | "more";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface AppearancePreferencesValue {
  motionPreference: MotionPreference;
  setMotionPreference: React.Dispatch<React.SetStateAction<MotionPreference>>;
  contrastPreference: ContrastPreference;
  setContrastPreference: React.Dispatch<React.SetStateAction<ContrastPreference>>;
}

const MOTION_STORAGE_KEY = "vendorzo-motion-preference";
const CONTRAST_STORAGE_KEY = "vendorzo-contrast-preference";

const AppearancePreferencesContext = React.createContext<AppearancePreferencesValue | null>(null);

function AppearancePreferencesProvider({ children }: ThemeProviderProps) {
  const [motionPreference, setMotionPreference] = React.useState<MotionPreference>("full");
  const [contrastPreference, setContrastPreference] = React.useState<ContrastPreference>("standard");

  React.useEffect(() => {
    const storedMotionPreference = window.localStorage.getItem(MOTION_STORAGE_KEY);
    const storedContrastPreference = window.localStorage.getItem(CONTRAST_STORAGE_KEY);

    if (storedMotionPreference === "full" || storedMotionPreference === "reduced") {
      setMotionPreference(storedMotionPreference);
    }

    if (storedContrastPreference === "standard" || storedContrastPreference === "more") {
      setContrastPreference(storedContrastPreference);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(MOTION_STORAGE_KEY, motionPreference);
  }, [motionPreference]);

  React.useEffect(() => {
    window.localStorage.setItem(CONTRAST_STORAGE_KEY, contrastPreference);
  }, [contrastPreference]);

  React.useEffect(() => {
    const root = document.documentElement;

    root.dataset.motion = motionPreference;
    root.dataset.contrast = contrastPreference;

    return () => {
      delete root.dataset.motion;
      delete root.dataset.contrast;
    };
  }, [contrastPreference, motionPreference]);

  const value = React.useMemo<AppearancePreferencesValue>(
    () => ({
      motionPreference,
      setMotionPreference,
      contrastPreference,
      setContrastPreference,
    }),
    [contrastPreference, motionPreference]
  );

  return (
    <AppearancePreferencesContext.Provider value={value}>
      {children}
    </AppearancePreferencesContext.Provider>
  );
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppearancePreferencesProvider>{children}</AppearancePreferencesProvider>
    </NextThemesProvider>
  );
}

export function useAppearancePreferences() {
  const context = React.useContext(AppearancePreferencesContext);

  if (!context) {
    throw new Error("useAppearancePreferences must be used within ThemeProvider");
  }

  return context;
}
