import { Link } from "react-router-dom";


export default function CountryCard({ country }) {
  return (
  <Link
      to={`/country/${country.cca3}`}
      className="
        group
        block
        rounded-2xl
        overflow-hidden
        bg-white dark:bg-slate-800
        border border-slate-200 dark:border-slate-700
        shadow-md
        transition-all duration-300
        hover:-translate-y-2 hover:shadow-2xl
      "
    >
      {/* Flag */}
      <div className="relative h-40 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="
            h-full w-full
            object-cover
            transition-transform duration-300
            group-hover:scale-110
          "
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3
          className="
            text-lg font-bold
            text-slate-800 dark:text-slate-100
            truncate
          "
          title={country.name.common}
        >
          {country.name.common}
        </h3>

        <div className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
          <p>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              👥 ประชากร:
            </span>{" "}
            {country.population.toLocaleString()}
          </p>

          <p>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              🌍 ทวีป:
            </span>{" "}
            {country.region}
          </p>

          <p>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              🏙 เมืองหลวง:
            </span>{" "}
            {country.capital?.[0] || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
}