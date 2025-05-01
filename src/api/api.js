const BASE_URL = "https://restcountries.com/v3.1";

export const getAllCountries = async () => {
  const res = await fetch(`${BASE_URL}/all`);
  return res.json();
};

export const searchByName = async (name) => {
  const res = await fetch(`${BASE_URL}/name/${name}`);
  return res.json();
};

export const filterByRegion = async (region) => {
  const res = await fetch(`${BASE_URL}/region/${region}`);
  return res.json();
};

export const getCountryByCode = async (code) => {
  const res = await fetch(`${BASE_URL}/alpha/${code}`);
  return res.json();
};
