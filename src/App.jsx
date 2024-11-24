import React, { useState } from 'react';
import CityList from './components/City';
import WeatherDetails from './components/wetherDetail';
import Search from './components/Search';

const App = () => {
  const [cities] = useState(['London', 'Las Vegas', 'Los Angeles', 'New York']);
  const [weatherData, setWeatherData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedCity, setHighlightedCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Function to fetch weather data for a specific city
  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${city}`
      );
      const data = await response.json();
      console.log(data);

      const dataAge = (Date.now() - new Date(data.date_and_time).getTime()) / (1000 * 60 * 60);  // Calculate age in hours

      const weatherDetails = {
        city,
        temperature: data.temp_in_celsius,
        humidity: data.humidity_in_percent,
        description: data.description,
        dataAge: dataAge.toFixed(2),
      };
      setWeatherData((prev) => [...prev, weatherDetails]);
      setHighlightedCity(city);  // Update highlighted city
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  // Function to handle clicking the "Get Weather" button
  const handleSearchText = () => {
    if (selectedCity) {
      const cityExists = weatherData.some(
        (data) => data.city.toLowerCase() === selectedCity.toLowerCase()
      );

      if (!cityExists) {
        fetchWeather(selectedCity);
      }
    }
  };

  const handleSearch = (searchCity) => {
    setSearchQuery(searchCity);
    setSelectedCity(searchCity);
    setHighlightedCity(searchCity);  // Highlight the city when search is triggered

    // Check if the city already has weather data, if not, fetch new data
    const cityExists = weatherData.some(
      (data) => data.city.toLowerCase() === searchCity.toLowerCase()
    );

    if (!cityExists) {
      fetchWeather(searchCity);  // Fetch weather data if not already present
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSearchQuery(city);
    setHighlightedCity(city);  // Highlight city when selected from list
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4 rounded text-center">
        <h1 className="text-2xl font-semibold">Weather App</h1>
      </header>
      <div className="flex justify-between">
        <button
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          onClick={handleSearchText}
        >
          Get Weather
        </button>
        <Search setSearchQuery={setSearchQuery} cities={cities} onSearch={handleSearch} />
      </div>

      <div className="mt-6 flex gap-6 w-full">
        <CityList
          cities={cities}
          weatherData={weatherData}
          onSelectCity={handleCitySelect}
          highlightedCity={highlightedCity}  // Pass highlightedCity to CityList
        />
        <span className="overflow-scroll w-full">
          <WeatherDetails
            weatherData={weatherData}
            handleDeleteRow={(index) =>
              setWeatherData((prev) => prev.filter((_, i) => i !== index))
            }
          />
        </span>
      </div>
    </div>
  );
};

export default App;
