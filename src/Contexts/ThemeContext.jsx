import { createContext, useEffect, useState } from "react";

/**
 * ThemeContext
 * ใช้สำหรับจัดการ Dark / Light Mode ทั้งระบบ
 */
export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  /**
   * state: dark
   * true  = dark mode
   * false = light mode
   */
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark";
  });

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
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
