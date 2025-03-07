import React from "react";
import { useDispatch } from "react-redux";
import { deleteVehicleTraffic } from "../../store/trafficSlice";

const VehicleList = ({ vehicles, onEdit }) => {
  const dispatch = useDispatch();

  return (
    <table className="w-full mt-6 border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Vehicle Type</th>
          <th className="border border-gray-300 p-2">Count</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((item) => (
          <tr key={item.id} className="text-center">
            <td className="border border-gray-300 p-2">{item.vehicle_type}</td>
            <td className="border border-gray-300 p-2">{item.count}</td>
            <td className="border border-gray-300 p-2">
              <button onClick={() => onEdit(item)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                Edit
              </button>
              <button onClick={() => dispatch(deleteVehicleTraffic({ countryId: item.country_traffic_id, vehicleId: item.id }))} className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehicleList;
