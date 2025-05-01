import React, { useEffect, useState } from "react";
import { getAllCountries, searchByName, filterByRegion } from "../api/api";
import SearchBar from "./SearchBar";
import RegionFilter from "./RegionFilter";
import { Link } from "react-router-dom";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all countries on initial render
  useEffect(() => {
    getAllCountries()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
        setLoading(false);
      });
  }, []);

  // Handle search by name
  const handleSearch = (query) => {
    setLoading(true);
    searchByName(query)
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Search failed:", error);
        setCountries([]);
        setLoading(false);
      });
  };

  // Handle filter by region
  const handleRegionSelect = (region) => {
    setLoading(true);
    filterByRegion(region)
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Region filter failed:", error);
        setCountries([]);
        setLoading(false);
      });
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <RegionFilter onSelect={handleRegionSelect} />

      {loading ? (
        <p className="text-center mt-10 text-lg font-medium text-gray-600">
          Loading countries...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {countries.length === 0 ? (
            <p className="text-center col-span-full text-red-500 font-semibold">
              No countries found
            </p>
          ) : (
            countries.map((country) => (
              <Link to={`/country/${country.cca3}`} key={country.cca3}>
                <div className="border rounded-lg shadow p-4 bg-white hover:bg-blue-50 transition cursor-pointer">
                  <img
                    src={country.flags?.png}
                    alt={`${country.name.common} flag`}
                    className="w-full h-40 object-cover mb-2 rounded"
                  />
                  <h2 className="text-lg font-bold">{country.name.common}</h2>
                  <p>Capital: {country.capital?.[0] || "N/A"}</p>
                  <p>Region: {country.region}</p>
                  <p>Population: {country.population.toLocaleString()}</p>
                  <p>
                    Languages:{" "}
                    {country.languages
                      ? Object.values(country.languages).join(", ")
                      : "N/A"}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default CountryList;
