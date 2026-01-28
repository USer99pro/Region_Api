import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ search, setSearch }) {
  return (
    <nav className="
  sticky top-0 z-50
  border-b
  bg-white/80 dark:bg-slate-900/80
  border-slate-200 dark:border-slate-700
  backdrop-blur
">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-3xl">🌍</span>
          <h1 className="
        text-2xl md:text-3xl font-bold
        text-slate-800 dark:text-slate-100
        hover:text-indigo-600 dark:hover:text-indigo-400
        transition-colors
      ">
            Country Explorer
          </h1>
        </a>

        {/* Right section */}
        <div className="flex items-center gap-4 w-full max-w-xl">
          <SearchBar value={search} onChange={setSearch} />

          {/* Theme toggle */}
          <div className="
        p-2 rounded-full
        bg-slate-100 dark:bg-slate-800
        hover:bg-slate-200 dark:hover:bg-slate-700
        transition
      ">
            <ThemeToggle />
          </div>
        </div>

      </div>
    </nav>

  );
}
