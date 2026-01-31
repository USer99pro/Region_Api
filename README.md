## Deploy With Vercel

You can view the live deployment here: [region-api-one.vercel.app](https://region-n9bbdltpw-user99pros-projects.vercel.app/)

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
