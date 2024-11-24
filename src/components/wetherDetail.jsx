import React from 'react';

const WeatherDetails = ({ weatherData, handleDeleteRow }) => {
    


  return (
    <table className="w-full text-black bg-white rounded shadow border border-gray-300 table-fixe">
      <thead>
        <tr className="bg-blue-600 text-white">
          <th className="py-2 px-4 w-1/6">City</th>
          <th className="py-2 px-4 w-1/4">Description</th>
          <th className="py-2 px-4 w-1/6">Temperature</th>
          <th className="py-2 px-4 w-1/6">Humidity</th>
         
          <th className="py-2 px-4 w-1/6">Data Age (hrs)</th>
          <th className="py-2 px-4 w-1/6">Actions</th>
        </tr>
      </thead>
      <tbody>
        {weatherData.length > 0 ? (
          weatherData.map((data, index) => (
            <tr
              key={index}
              className="border-t border-gray-300 hover:bg-gray-100 transition"
            >
              <td className="py-2 px-4 text-center">{data.city}</td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  className="border border-gray-300 rounded px-2 py-1 w-full"
                  defaultValue={data.description}
                  onChange={(e) => (data.description = e.target.value)}
                />
              </td>
              <td className="py-2 px-4 text-center">{data.temperature}°C</td>
              <td className="py-2 px-4 text-center">{data.humidity}%</td>
             
              <td className="py-2 px-4 text-center">{data.dataAge}</td>
              <td className="py-2 px-4 text-center">
                <button
                  className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700 transition"
                  onClick={() => handleDeleteRow(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="py-4 text-center text-gray-700">
              No Data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default WeatherDetails;
