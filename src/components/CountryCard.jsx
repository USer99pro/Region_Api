import { Link } from "react-router-dom";


export default function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.cca3}`} className="country-card fade-in">
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`} 
        className="country-flag"
      />
      <div className="country-info">
        <h3 className="country-name">{ country.name.common}</h3>
        <div className="country-detail">
          <strong>ประชากร :</strong> {country.population.toLocaleString()}
        </div>
        <div className="country-detail">
          <strong>ทวีป :</strong> {country.region}
        </div>
        <div className="country-detail">
          <strong>เมืองหลวง :</strong> {country.capital?.[0] || 'N/A'}
        </div>
      </div>
    </Link>
  );
}