import React, { useEffect, useState } from "react";
import { getAllCountries, searchByName, filterByRegion } from "../api/api";
import SearchBar from "./SearchBar";
import RegionFilter from "./RegionFilter";
import { Link } from "react-router-dom";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {countries.length === 0 ? (
            <p className="text-center col-span-full text-red-500 font-semibold">
              No countries found
            </p>
          ) : (
            countries.map((country) => (
              <Link
                to={`/country/${country.cca3}`}
                key={country.cca3}
                className="block bg-white border rounded shadow hover:shadow-md transition"
              >
                <div className="aspect-square flex flex-col justify-center items-center p-3">
                  <img
                    src={country.flags?.png}
                    alt={country.name.common}
                    className="h-20 w-auto object-contain mb-2"
                  />
                  <span className="text-sm font-medium text-center">
                    {country.name.common}
                  </span>
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
