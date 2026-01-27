import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCountryByCode, getWikiSummary } from "../Services/CountriesApi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
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
        if (!data) {
          console.error("Country data not found");
          setLoading(false);
          return;
        }
        setCountry(data);
        
        // Fetch Wikipedia summary
        getWikiSummary(data.name.common)
          .then(setWiki)
          .catch((err) => console.error("Wikipedia error:", err));

        // Fetch border countries information
        if (data.borders && data.borders.length > 0) {
          Promise.all(
            data.borders.map((borderCode) =>
              getCountryByCode(borderCode).then((res) => res.data)
            )
          )
            .then(setBorderCountries)
            .catch((err) => console.error("Border countries error:", err));
        }
        
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching country:", error);
        setLoading(false);
      });
  }, [code]);


  if (loading || !country) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading country details...</p>
      </div>
    );
  }

  // Extract native name
  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0]?.common
    : country.name.common;

  // Extract currencies
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "N/A";

  // Extract languages
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";


  return (
    <div className="detail-container fade-in">
      <button onClick={() => nav(-1)} className="btn btn-secondary btn-back">
        ← Back
      </button>

      <div className="detail-header">
        <img
          src={country.flags.svg || country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="detail-flag"
        />
        <div className="detail-info">
          <h1 className="detail-title">{country.name.common}</h1>
          
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Native Name</div>
              <div className="info-value">{nativeName}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Population</div>
              <div className="info-value">{country.population.toLocaleString()}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Region</div>
              <div className="info-value">{country.region}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Sub Region</div>
              <div className="info-value">{country.subregion || "N/A"}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Capital</div>
              <div className="info-value">{country.capital?.[0] || "N/A"}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Currencies</div>
              <div className="info-value">{currencies}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Languages</div>
              <div className="info-value">{languages}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Area</div>
              <div className="info-value">{country.area ? country.area.toLocaleString() : 'N/A'} km²</div>
            </div>
          </div>
        </div>
      </div>

      {/* Border Countries */}
      {borderCountries.length > 0 && (
        <div className="border-countries">
          <h3>🗺️ Border Countries</h3>
          <div className="border-list">
            {borderCountries.map((borderCountry) => (
              <Link
                key={borderCountry.cca3}
                to={`/country/${borderCountry.cca3}`}
                className="border-country-link"
              >
                {borderCountry.name.common}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Map */}
      {country.latlng && country.latlng.length === 2 && (
        <div className="map-section">
          <h3>📍 Location</h3>
          <div className="map-container">
            <MapContainer
              center={country.latlng}
              zoom={5}
              style={{ height: "100%", width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={country.latlng}>
                <Popup>
                  <strong>{country.name.common}</strong>
                  <br />
                  {country.capital?.[0] && `Capital: ${country.capital[0]}`}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}

      {/* Wikipedia Summary */}
      {wiki && wiki.extract && (
        <div className="wiki-section">
          <h3>📖 About {country.name.common}</h3>
          <p className="wiki-content">{wiki.extract}</p>
          {wiki.content_urls && wiki.content_urls.desktop && (
            <a
              href={wiki.content_urls.desktop.page}
              target="_blank"
              rel="noopener noreferrer"
              className="wiki-link"
            >
              Read more on Wikipedia →
            </a>
          )}
        </div>
      )}
    </div>
  );
}