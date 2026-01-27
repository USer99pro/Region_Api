import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ search, setSearch }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b">
      <div className="container mx-auto px-4 py-4 flex items-center gap-4 justify-between">
        <a href="/"><h1 className="text-2xl font-bold">🌍 Country Explorer</h1></a>

        <div className="flex items-center gap-4 w-1/2">
          <SearchBar value={search} onChange={setSearch} />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
