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
      .slice(0, 20);
  }, [countries]);

  /* ==========================
     FILTER COUNTRIES
  ========================== */
  const filtered = useMemo(() => {
    if (!search) return countries.slice(0, 10);

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
        <div className="spinner mb-4"></div>
        <p className="text-slate-500">Loading countries...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-10">


        {/* =======================
            COUNTRIES RESULT
        ======================= */}
        <section
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl
                            p-8 border border-slate-200 dark:border-slate-700"
        >
          {filtered.length === 0 ? (
            <p className="text-center py-16 text-slate-500">
              No countries found for <b>"{search}"</b>
            </p>
          ) : (
            <div className="countries-grid">
              {filtered.map((c) => (
                <CountryCard key={c.cca3} country={c} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
