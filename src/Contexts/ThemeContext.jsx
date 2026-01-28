import { createContext, useEffect, useState, useCallback } from "react";

/**
 * ThemeContext
 * ใช้สำหรับจัดการ Dark / Light Mode ทั้งระบบ
 */
export const ThemeContext = createContext({
  dark: false,
  setDark: () => {},
  toggle: () => {},
});

export function ThemeProvider({ children }) {
  /**
   * state: dark
   * true  = dark mode
   * false = light mode
   */
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored === "dark";
      return (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch {
      return false;
    }
  });

  const toggle = useCallback(() => setDark((prev) => !prev), []);

  /**
   * effect: sync theme กับ <html> และ localStorage
   */
  useEffect(() => {
    const html = document.documentElement;

    if (dark) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  /**
   * Provider
   */
  return (
    <ThemeContext.Provider value={{ dark, setDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
