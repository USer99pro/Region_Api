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

## 📸 Adding a Preview Image

To add a project screenshot:

1. Run the app: `npm run dev`
2. Open [http://localhost:5173](http://localhost:5173)
3. Take a screenshot of the home page
4. Save it as `docs/preview.png`

---

**Deploy with Vercel** — One-click deploy from your Git repository.
