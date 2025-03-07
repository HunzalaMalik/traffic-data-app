import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createCountryTraffic, updateCountryTraffic } from "../../store/trafficSlice";

const CountryForm = ({ editingCountry, clearEditing }) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [count, setCount] = useState("");

  useEffect(() => {
    if (editingCountry) {
      setCountry(editingCountry.country);
      setCount(editingCountry.count);
    } else {
      setCountry("");
      setCount("");
    }
  }, [editingCountry]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCountry) {
      await dispatch(updateCountryTraffic({ id: editingCountry.id, country, count }));
      clearEditing();
    } else {
      await dispatch(createCountryTraffic({ country, count }));
    }
    setCountry("");
    setCount("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        placeholder="Total Traffic Count"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editingCountry ? "Update" : "Add"} Country
      </button>
    </form>
  );
};

export default CountryForm;
