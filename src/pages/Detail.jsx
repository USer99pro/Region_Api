import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountryByCode, getWikiSummary } from "../Services/CountriesApi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Detail() {
  const { code } = useParams();
  const nav = useNavigate();

  const [country, setCountry] = useState(null);
  const [wiki, setWiki] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getCountryByCode(code)
      .then((res) => {
        const data = res.data;
        setCountry(data);

        // Wikipedia
        getWikiSummary(data.name.common).then(setWiki).catch(console.error);

        // Borders
        if (data.borders?.length) {
          Promise.all(
            data.borders.map((c) => getCountryByCode(c).then((r) => r.data)),
          ).then(setBorderCountries);
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [code]);

  if (loading || !country) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center
                      bg-slate-50 text-slate-900
                      dark:bg-slate-900 dark:text-slate-100"
      >
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-gray-300 border-t-transparent" />
        <p className="mt-4">Loading country details...</p>
      </div>
    );
  }

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : country.name.common;

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "N/A";

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <div
      className="min-h-screen px-6 py-8
                    bg-slate-50 text-slate-900
                    dark:bg-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      {/* Header */}
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="w-full max-w-md rounded shadow-soft"
        />

        <div>
          <h1 className="text-3xl font-extrabold mb-6">
            {country.name.common}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <b>Native Name:</b> {nativeName}
            </div>
            <div>
              <b>Population:</b> {country.population.toLocaleString()}
            </div>
            <div>
              <b>Region:</b> {country.region}
            </div>
            <div>
              <b>Sub Region:</b> {country.subregion || "N/A"}
            </div>
            <div>
              <b>Capital:</b> {country.capital?.[0] || "N/A"}
            </div>
            <div>
              <b>Currencies:</b> {currencies}
            </div>
            <div>
              <b>Languages:</b> {languages}
            </div>
            <div>
              <b>Area:</b> {country.area?.toLocaleString()} km²
            </div>
          </div>
        </div>
      </div>

      {/* Map + Wikipedia */}
      {country.latlng && wiki?.extract && (
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Map (Left) */}
          <div>
            <h3 className="font-semibold mb-4">📍 Location</h3>
            <div className="h-[380px] rounded-xl overflow-hidden shadow-soft">
              <MapContainer
                center={country.latlng}
                zoom={5}
                className="h-full w-full"
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={country.latlng}>
                  <Popup>
                    <strong>{country.name.common}</strong>
                    <br />
                    {country.capital?.[0]}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Wikipedia (Right) */}
          <div className=""> 
            <h3 className="font-semibold mb-4 ">
              📖 About {country.name.common}
            </h3>

            <p className="leading-relaxed opacity-90">{wiki.extract}</p>

            {wiki?.content_urls?.desktop?.page && (
            <a
              href={wiki.content_urls.desktop.page}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 font-semibold hover:underline text-indigo-600 dark:text-indigo-400"
            >
                Read more on Wikipedia →
              </a>
            )}
          </div>
        </div>
      )}

      {/* Back Button (Bottom) */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={() => nav(-1)}
          className="
      inline-flex items-center gap-2
      px-8 py-3
      rounded-xl
      font-semibold
      shadow-lg
      border-r-4 border-b-4 border-gray-300/50
      bg-white text-slate-800
      dark:bg-slate-800 dark:text-slate-100
      hover:scale-105 transition 
    "
        >
          ← Back to Countries
        </button>
      </div>
    </div>
  );
}
