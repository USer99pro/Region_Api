export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search country..."
        className="
      peer
      w-full h-11
      pl-12 pr-4
      rounded-2xl
      border border-slate-300 dark:border-slate-600
      bg-white dark:bg-slate-800
      text-slate-800 dark:text-white
      transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-violet-500
      focus:pl-4
    "
      />
    </div>
  );
}
