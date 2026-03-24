"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type MotionPreference = "full" | "reduced";
type ContrastPreference = "standard" | "more";
type ColorTheme = "neutral" | "ocean" | "amber" | "rose" | "emerald";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface AppearancePreferencesValue {
  motionPreference: MotionPreference;
  setMotionPreference: React.Dispatch<React.SetStateAction<MotionPreference>>;
  contrastPreference: ContrastPreference;
  setContrastPreference: React.Dispatch<React.SetStateAction<ContrastPreference>>;
  colorTheme: ColorTheme;
  setColorTheme: React.Dispatch<React.SetStateAction<ColorTheme>>;
}

const MOTION_STORAGE_KEY = "vendorzo-motion-preference";
const CONTRAST_STORAGE_KEY = "vendorzo-contrast-preference";
const COLOR_THEME_STORAGE_KEY = "vendorzo-color-theme";

const AppearancePreferencesContext = React.createContext<AppearancePreferencesValue | null>(null);

function AppearancePreferencesProvider({ children }: ThemeProviderProps) {
  const [motionPreference, setMotionPreference] = React.useState<MotionPreference>("full");
  const [contrastPreference, setContrastPreference] = React.useState<ContrastPreference>("standard");
  const [colorTheme, setColorTheme] = React.useState<ColorTheme>("neutral");

  React.useEffect(() => {
    const storedMotionPreference = window.localStorage.getItem(MOTION_STORAGE_KEY);
    const storedContrastPreference = window.localStorage.getItem(CONTRAST_STORAGE_KEY);
    const storedColorTheme = window.localStorage.getItem(COLOR_THEME_STORAGE_KEY);

    if (storedMotionPreference === "full" || storedMotionPreference === "reduced") {
      setMotionPreference(storedMotionPreference);
    }

    if (storedContrastPreference === "standard" || storedContrastPreference === "more") {
      setContrastPreference(storedContrastPreference);
    }

    if (
      storedColorTheme === "neutral" ||
      storedColorTheme === "ocean" ||
      storedColorTheme === "amber" ||
      storedColorTheme === "rose" ||
      storedColorTheme === "emerald"
    ) {
      setColorTheme(storedColorTheme);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(MOTION_STORAGE_KEY, motionPreference);
  }, [motionPreference]);

  React.useEffect(() => {
    window.localStorage.setItem(CONTRAST_STORAGE_KEY, contrastPreference);
  }, [contrastPreference]);

  React.useEffect(() => {
    window.localStorage.setItem(COLOR_THEME_STORAGE_KEY, colorTheme);
  }, [colorTheme]);

  React.useEffect(() => {
    const root = document.documentElement;

    root.dataset.motion = motionPreference;
    root.dataset.contrast = contrastPreference;
    root.dataset.colorTheme = colorTheme;

    return () => {
      delete root.dataset.motion;
      delete root.dataset.contrast;
      delete root.dataset.colorTheme;
    };
  }, [colorTheme, contrastPreference, motionPreference]);

  const value = React.useMemo<AppearancePreferencesValue>(
    () => ({
      motionPreference,
      setMotionPreference,
      contrastPreference,
      setContrastPreference,
      colorTheme,
      setColorTheme,
    }),
    [colorTheme, contrastPreference, motionPreference]
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
