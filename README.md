# Region API Project
A modern React application built with Vite and Tailwind CSS that allows users to explore countries and regions.
## Deploy With Vercel

You can view the live deployment here:

[region-api-one.vercel.app](https://region-n9bbdltpw-user99pros-projects.vercel.app/)


## About Project

This project fetches and displays information about countries from an API. It features:
- **Search Functionality**: Easily filter countries by name.
- **Detailed Views**: Click on a country to see more details (Population, Region, etc.).
- **Responsive Design**: Built with Tailwind CSS for a seamless experience on all devices.
- **Interactive Maps**: (If applicable via Leaflet implementation)

## File Infrastructure

The project structure is organized as follows:

- **`src/`**: Main source code.
    - **`pages/`**: Application views.
        - `Home.jsx`: The main landing page displaying the list of countries.
        - `Detail.jsx`: Detailed view for a specific country.
    - **`components/`**: Reusable UI components.
        - `CountryCard.jsx`: Displays a summary card for a country.
    - **`Services/`**: API handling logic (e.g., `CountriesApi.js`).
- **`public/`**: Static assets.
- **`index.html`**: Entry HTML file.
- **`vite.config.js`**: Configuration for Vite.
- **`tailwind.config.js`**: Configuration for Tailwind CSS.
