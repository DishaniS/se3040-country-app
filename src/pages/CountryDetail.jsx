import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCountryByCode } from "../api/api";

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCountryByCode(code)
      .then((data) => {
        setCountry(data[0]); // data is an array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching country:", error);
        setLoading(false);
      });
  }, [code]);

  if (loading) return <p className="text-center mt-10">Loading country details...</p>;

  if (!country) return <p className="text-center mt-10 text-red-500">Country not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-6">
      <Link
        to="/"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to List
      </Link>

      <img
        src={country.flags?.png}
        alt={`${country.name.common} flag`}
        className="w-full h-60 object-cover rounded mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{country.name.common}</h2>
      <p><strong>Official Name:</strong> {country.name.official}</p>
      <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Subregion:</strong> {country.subregion}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
      <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
      <p><strong>Timezones:</strong> {country.timezones?.join(", ")}</p>
      <p><strong>Currency:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(", ") : "N/A"}</p>
    </div>
  );
};

export default CountryDetail;
