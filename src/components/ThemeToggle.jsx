import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function ThemeToggle() {
  const ctx = useContext(ThemeContext);

  if (!ctx) return null;

  const { dark, toggle } = ctx;

  return (
    <button
      onClick={toggle}
      className="px-3 py-2 bg-gray-200 rounded dark:bg-gray-700"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
