# 🌍 Country Explorer
## 🚀 Live Demo

**[View Live Deployment →](https://region-api-git-main-user99pros-projects.vercel.app/)**

## ✨ Features

- **Country Grid** — Browse all countries with flags, population, region, and capital
- **Search** — Filter countries by name in real time
- **Country Details** — View in-depth info: native name, population, region, subregion, capital, currencies, languages, and area
- **Interactive Map** — Leaflet map showing country location with marker
- **Wikipedia Integration** — Thai Wikipedia summaries for each country
- **Dark/Light Theme** — Toggle between themes with smooth transitions
- **Responsive Design** — Works on desktop, tablet, and mobile


## 🛠 Tech Stack

- **React 19** + **Vite 7**
- **Tailwind CSS 4** — Styling
- **React Router 7** — Client-side routing
- **Axios** — HTTP requests
- **Leaflet** + **React-Leaflet** — Interactive maps
- **REST Countries API** — Country data
- **Wikipedia API** — Country summaries (Thai)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/region-api.git
cd region-api

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
src/
├── pages/           # Application views
│   ├── Home.jsx     # Main page — country grid & search
│   └── Detail.jsx   # Country detail — map, Wikipedia, info
├── components/      # Reusable UI components
│   ├── CountryCard.jsx
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   └── ThemeToggle.jsx
├── Contexts/
│   └── ThemeContext.jsx
├── Services/
│   └── CountriesApi.js   # REST Countries & Wikipedia API
├── App.jsx
├── main.jsx
└── index.css
```

## 🔌 APIs Used

- **[REST Countries](https://restcountries.com/)** — Country data (flags, population, region, borders, etc.)
- **[Wikipedia REST API](https://www.mediawiki.org/wiki/API:Main_page)** — Thai Wikipedia summaries




<img width="1898" height="867" alt="Screenshot 2026-02-01 185459" src="https://github.com/user-attachments/assets/ee8461cf-4213-46b3-b51b-998c65af4c99" />
<img width="1891" height="868" alt="Screenshot 2026-02-01 185510" src="https://github.com/user-attachments/assets/23deb3b7-c6e6-4d74-8c96-40c0eb016fbd" />
<img width="1900" height="872" alt="Screenshot 2026-02-01 191702" src="https://github.com/user-attachments/assets/e6d225c6-1b2d-45fb-bdb1-815c4e06198f" />
<img width="1883" height="864" alt="Screenshot 2026-02-01 191713" src="https://github.com/user-attachments/assets/67cf519c-38bd-4867-8463-84ff078c11e4" />
**Deploy with Vercel** — One-click deploy from your Git repository.





