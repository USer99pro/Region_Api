import axios from "axios";

const API_BASE = "https://restcountries.com/v3.1";

// ดึงประเทศทั้งหมด (ใช้ fields ตาม doc)
export const getAllCountries = () => {
  return axios.get(`${API_BASE}/all`, {
    params: {
      fields: "name,flags,cca3,region,population,capital,latlng",
    },

  });
};


// ดึงข้อมูลรายประเทศด้วย code (เช่น THA)
export const getCountryByCode = (code) => {
  return axios.get(`${API_BASE}/alpha/${code}`, {
    params: {
      fields:
        "name,flags,cca3,region,population,capital,latlng,borders,currencies,languages",
    },
  });
};


// Wikipedia REST API (Summary)
export const getWikiSummary = async (countryName) => {
  try {
    const res = await fetch(
      `https://th.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        countryName
      )}`
    );

    if (!res.ok) throw new Error("Wikipedia API error");

    const data = await res.json();

    return {
      title: data.title,
      extract: data.extract,
      thumbnail: data.thumbnail?.source || null,
      url: data.content_urls?.desktop?.page || null,
    };
  } catch (error) {
    console.error("❌ Wiki fetch error:", error);
    return null;
  }
};
