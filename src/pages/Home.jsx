import { useEffect, useState, useMemo } from "react";
import { getAllCountries } from "../Services/CountriesApi";
import CountryCard from "../components/CountryCard";

export default function Home({ search }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCountries()
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  /* ==========================
     TOP 10 REGIONS
  ========================== */
  const topRegions = useMemo(() => {
    const regionMap = {};

    countries.forEach((country) => {
      const region = country.region || "Unknown";
      if (!regionMap[region]) {
        regionMap[region] = {
          name: region,
          count: 0,
          population: 0,
        };
      }
      regionMap[region].count += 1;
      regionMap[region].population += country.population || 0;
    });

    return Object.values(regionMap)
      .filter((r) => r.name !== "Unknown")
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [countries]);

  /* ==========================
     FILTER COUNTRIES
  ========================== */
  const filtered = useMemo(() => {
    if (!search) return countries.slice(0, 20);

    return countries.filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase()),
    );
  }, [countries, search]);

  /* ==========================
     LOADING
  ========================== */
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="mb-4 spinner"></div>
        <p className="text-slate-500">Loading countries...</p>
      </div>
    );
  }

  return (
    // <html className={loading ? "" : "dark"}>
      <div className="min-h-screen transition-colors duration-300 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
        <div className="container py-10 mx-auto ">
          {/* =======================
          COUNTRIES RESULT
      ======================= */}
          <section className="p-6 transition-all duration-300 bg-white border shadow-xl dark:bg-slate-800 rounded-3xl md:p-8 border-slate-200 dark:border-slate-700">
            {/* Empty State */}
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-lg text-slate-500 dark:text-slate-400">
                  No countries found for
                </p>
                <p className="mt-2 text-xl font-semibold text-slate-700 dark:text-slate-200">
                  “{search}”
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filtered.map((c) => (
                  <div
                    key={c.cca3}
                    className="transition hover:-translate-y-2 hover:shadow-2xl"
                  >
                    <CountryCard country={c} />
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    // </html>
  );
}
