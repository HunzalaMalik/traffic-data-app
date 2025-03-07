import React from "react";
import { useDispatch } from "react-redux";
import { deleteCountryTraffic } from "../../store/trafficSlice";

const CountryList = ({ countries, onSelect, onEdit, onSeeAnalytics }) => {
  const dispatch = useDispatch();

  return (
    <table className="w-full mt-6 border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Country</th>
          <th className="border border-gray-300 p-2">Total Traffic</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((item) => (
          <tr key={item.id} className="text-center">
            <td className="border border-gray-300 p-2">{item.country}</td>
            <td className="border border-gray-300 p-2">{item.count}</td>
            <td className="border border-gray-300 p-2">
              <button onClick={() => onSeeAnalytics(item.id)} className="bg-purple-500 text-white px-2 py-1 rounded mr-2">
                See Analytics
              </button>
              <button onClick={() => onSelect(item.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                Manage Vehicles
              </button>
              <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                Edit
              </button>
              <button onClick={() => dispatch(deleteCountryTraffic(item.id))} className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CountryList;
