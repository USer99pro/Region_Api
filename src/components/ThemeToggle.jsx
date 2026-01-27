import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

export default function ThemeToggle() {
  const ctx = useContext(ThemeContext);

  console.log("THEME CONTEXT:", ctx);

  if (!ctx) return null;

  const { dark, setDark } = ctx;

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
