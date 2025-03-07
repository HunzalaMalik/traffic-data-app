import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountryTraffic,
  fetchVehicleTraffic,
  createCountryTraffic,
  updateCountryTraffic,
  deleteCountryTraffic,
} from "../store/trafficSlice";
import CountryList from "./traffic/CountryList";
import CountryForm from "./traffic/CountryForm";
import VehicleModal from "./traffic/VehicleModal";
import CountryTrafficChart from "./charts/CountryTrafficChart";

const ManageTraffic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { countryTraffic, vehicleTraffic, loading } = useSelector((state) => state.traffic);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);

  const handleCreateCountry = async (newCountry) => {
    try {
      await dispatch(createCountryTraffic(newCountry));
    } catch (error) {
      console.error("Error creating country:", error);
    }
  };

  const handleUpdateCountry = async (updatedCountry) => {
    try {
      await dispatch(updateCountryTraffic(updatedCountry));
      setEditingCountry(null);
    } catch (error) {
      console.error("Error updating country:", error);
    }
  };

  const handleDeleteCountry = async (id) => {
    try {
      await dispatch(deleteCountryTraffic(id));
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  const openVehicleModal = (countryId) => {
    const country = countryTraffic.find((c) => c.id === countryId);
    if (!country) {
      console.error("No country found with ID:", countryId);
      return;
    }

    setSelectedCountry(country);
    dispatch(fetchVehicleTraffic(countryId));
    setIsModalOpen(true);
  };

  const closeVehicleModal = () => {
    setIsModalOpen(false);
    setSelectedCountry(null);
    dispatch(fetchCountryTraffic())
  };

  if (loading.country) {
    return <div className="text-center text-lg font-semibold p-6">Loading Countries...</div>;
  }

  return (
    <div className="p-6">
      <CountryTrafficChart/>

      <h2 className="text-2xl font-bold mb-4">Manage Traffic</h2>
      <CountryForm
        onSubmit={editingCountry ? handleUpdateCountry : handleCreateCountry}
        editingCountry={editingCountry}
        clearEditing={()=> setEditingCountry(null)}
      />
      <CountryList
        countries={countryTraffic}
        onSelect={openVehicleModal}
        onEdit={setEditingCountry}
        onDelete={handleDeleteCountry}
        onSeeAnalytics={(id) => navigate(`/analytics/${id}`)}
      />

      <VehicleModal
        isOpen={isModalOpen}
        onClose={closeVehicleModal}
        selectedCountry={selectedCountry}
        initialVehicles={vehicleTraffic[selectedCountry?.id]?.vehicles || []}
      />
    </div>
  );
};

export default ManageTraffic;
