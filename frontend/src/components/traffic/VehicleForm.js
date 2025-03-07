import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createVehicleTraffic, updateVehicleTraffic, fetchVehicleTraffic } from "../../store/trafficSlice";

const vehicleOptions = ["Car", "Bike", "Bus"];

const VehicleForm = ({ selectedCountry, editingVehicle, clearEditing, vehicles }) => {
  const dispatch = useDispatch();
  const [vehicleType, setVehicleType] = useState("");
  const [count, setCount] = useState("");
  const [remainingCount, setRemainingCount] = useState(0);
  const [error, setError] = useState("");
  const addedVehicleTypes = vehicles?.map(v => v.vehicle_type) || [];

  useEffect(() => {
    if (selectedCountry) {
      const totalTraffic = selectedCountry.count;
      let usedTraffic = vehicles?.reduce((sum, v) => sum + v.count, 0) || 0;
      const newRemainingCount = totalTraffic - usedTraffic;
  
      if (remainingCount !== newRemainingCount) {
        setRemainingCount(newRemainingCount);
      }
    }
  }, [selectedCountry, vehicles, remainingCount]);
  
  useEffect(() => {
    if (editingVehicle && remainingCount !== 0) {
      setVehicleType(editingVehicle.vehicle_type);
      setCount(editingVehicle.count);
    } else {
      setVehicleType("");
      setCount("");
    }
  }, [editingVehicle, remainingCount]);

  const handleCountChange = (e) => {
    const enteredCount = parseInt(e.target.value) || 0;
    
    let usedTraffic = vehicles?.reduce((sum, v) => sum + v.count, 0) || 0;
    
    if (editingVehicle) {
      usedTraffic -= editingVehicle.count;
    }
  
    const newRemainingCount = selectedCountry.count - usedTraffic;
  
    if (enteredCount > newRemainingCount) {
      setError("Exceeds total traffic count!");
    } else {
      setError("");
      setCount(enteredCount);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (editingVehicle) {
      dispatch(updateVehicleTraffic({ 
        countryId: selectedCountry.id, 
        vehicleId: editingVehicle.id, 
        vehicle_type: vehicleType, 
        count 
      })).then(() => {
        dispatch(fetchVehicleTraffic(selectedCountry.id));
      });
    } else {
      dispatch(createVehicleTraffic({ 
        countryId: selectedCountry.id, 
        vehicle_type: vehicleType, 
        count 
      })).then(() => {
        dispatch(fetchVehicleTraffic(selectedCountry.id));
      });
    }
  
    setVehicleType("");
    setCount("");
    clearEditing();
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <label className="block font-semibold">Select Vehicle Type</label>
      <select
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        className="border p-2 w-full"
        disabled={remainingCount === 0}
      >
        <option value="">Select a type</option>
        {vehicleOptions.map((option) => (
          <option key={option} value={option} disabled={addedVehicleTypes.includes(option)}>
            {option}
          </option>
        ))}
      </select>

      <label className="block font-semibold">Enter Count</label>
      <input
        type="number"
        placeholder="Vehicle Count"
        value={count}
        onChange={handleCountChange}
        className={`border p-2 w-full ${error ? "border-red-500" : ""}`}
        disabled={remainingCount === 0}
      />

      <p className={`text-sm mt-1 ${remainingCount === 0 ? "text-red-500" : "text-gray-600"}`}>
        {remainingCount === 0 ? "No remaining count available!" : `Remaining Count: ${remainingCount}/${selectedCountry?.count}`}
      </p>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded" disabled={remainingCount === 0}>
        {(editingVehicle ) ? "Update Vehicle" : "Add Vehicle"}
      </button>
    </form>
  );
};

export default VehicleForm;
