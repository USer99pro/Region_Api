import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function ThemeToggle() {
  const ctx = useContext(ThemeContext);

  if (!ctx) return null;

  const { dark, toggle } = ctx;

  return (
    <button
      type="button"
      onClick={toggle}
      className="px-3 py-2 text-gray-800 transition bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-100 hover:scale-105"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
