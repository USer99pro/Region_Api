import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const currentYear = new Date().getFullYear();

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🌍 Country Explorer
        </Link>
        <ThemeToggle />
      </div>
   
    </header>
  );
}
