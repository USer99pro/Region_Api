import { createContext, useState, useEffect } from "react";
export const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to false (light mode)
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  // Persist theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    // Update document class for global styling
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div className={dark ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
};