import { Routes, Route } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryDetail from "./pages/CountryDetail";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center py-6 text-blue-600">
        🌍 Country Explorer
      </h1>

      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country/:code" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;
