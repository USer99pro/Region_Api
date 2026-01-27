import { useEffect, useState, useMemo } from "react";
import { getAllCountries } from "../Services/CountriesApi";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";


export default function Home() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log("🌍 Fetching countries data...");
    getAllCountries()
      .then((res) => {
        console.log("✅ Countries data received:", res.data);
        console.log("📊 Total countries:", res.data.length);
        console.log("🔍 Sample country data:", res.data[0]);
        setCountries(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching countries:", error);
        setLoading(false);
      });
  }, []);


  // Calculate top 10 regions by country count
  const topRegions = useMemo(() => {
    const regionMap = {};
    
    countries.forEach((country) => {
      const region = country.region || "Unknown";
      if (!regionMap[region]) {
        regionMap[region] = {
          name: region,
          count: 0,
          population: 0,
          countries: [],
        };
      }
      regionMap[region].count += 1;
      regionMap[region].population += country.population || 0;
      regionMap[region].countries.push(country.name.common);
    });

    return Object.values(regionMap)
      .filter((r) => r.name !== "Unknown" && r.name !== "")
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [countries]);


const filtered = useMemo(() => {
  return countries
    .filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 10); // 👈 โชว์แค่ 10 ประเทศ
}, [countries, search]);



  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading countries...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Top 10 Regions Section */}
        <div className="mb-12">
          {/* <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              🌍 Top 10 Regions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Discover the world's most diverse regions by country count
            </p>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {topRegions.map((region, index) => (
              <div
                key={region.name}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Rank badge */}
                <div className="absolute top-3 right-3 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  #{index + 1}
                </div>

                <div className="relative z-10">
                  {/* Region name */}
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 pr-12">
                    {region.name}
                  </h3>

                  {/* Country count */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-md">
                      <span className="text-2xl font-bold text-white">
                        {region.count}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        Countries
                      </p>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Total Count
                      </p>
                    </div>
                  </div>

                  {/* Population */}
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                      Total Population
                    </p>
                    <p className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {(region.population / 1000000).toFixed(0)}M
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${(region.count / topRegions[0].count) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Countries Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
          <SearchBar value={search} onChange={setSearch} />
          {filtered.length === 0 ? (
            <div className="loading-container">
              <p className="loading-text">No countries found matching "{search}"</p>
            </div>
          ) : (
            <div className="countries-grid">
              {filtered.map((c) => (
                <CountryCard key={c.cca3} country={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}