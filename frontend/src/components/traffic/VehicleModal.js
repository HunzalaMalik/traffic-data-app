import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchVehicleTraffic } from "../../store/trafficSlice";
import VehicleForm from "./VehicleForm";
import VehicleList from "./VehicleList";

Modal.setAppElement("#root");

const VehicleModal = ({ isOpen, onClose, selectedCountry }) => {
  const dispatch = useDispatch();
  const { vehicleTraffic } = useSelector((state) => state.traffic);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const vehicles = vehicleTraffic[selectedCountry?.id]?.vehicles || [];

  useEffect(() => {
    if (selectedCountry) {
      dispatch(fetchVehicleTraffic(selectedCountry.id));
    }
  }, [dispatch, selectedCountry]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Manage Vehicles"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
        >
          X
        </button>

        <h2 className="text-xl font-bold mb-4">Manage Vehicles for {selectedCountry?.country}</h2>

        <VehicleForm
          editingVehicle={editingVehicle}
          selectedCountry={selectedCountry}
          vehicles = {vehicles}
          clearEditing={() => setEditingVehicle(null)}
        />

        <VehicleList vehicles={vehicles} onEdit={setEditingVehicle} />
      </div>
    </Modal>
  );
};

export default VehicleModal;
