import { useTheme } from "../Contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  // Resolve effective theme when using "system" (for display and toggle logic)
  const effectiveTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  return (
    <button
      onClick={() => setTheme(effectiveTheme === "dark" ? "light" : "dark")}
      className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      aria-label={effectiveTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {effectiveTheme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;