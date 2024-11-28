import React from 'react';

const CityList = ({ cities, weatherData, onSelectCity }) => {
  return (
    <div className="w-1/3 h-fit bg-white rounded shadow border border-gray-300">
      {/* Table Header */}
      <div className="bg-blue-600 text-white text-left py-2 px-4 font-semibold">
        City List
      </div>
      {/* Table Body */}
      <ul className="list-none ">
        {cities.map((city, index) => {
          // Check if the city is in the weatherData array
          const cityInWeatherData = weatherData.some(
            (data) => typeof data.city === 'string' &&
            data.city.toLowerCase() === city.toLowerCase()
          );

          return (
            <li
              key={index}
              className={`p-2 m-2 rounded cursor-pointer ${
                cityInWeatherData
                  ? 'border-2 border-dashed border-green-400 bg-green-300/40 text-black'  
                  : 'bg-gray-200/40 border-2 border-transparent'
              }`}
              onClick={() => onSelectCity(city)}
            >
              {city}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CityList;
