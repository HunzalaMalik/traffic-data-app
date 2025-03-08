import api from "./api";

export const getCountryTraffic = async () => {
  const response = await api.get("/country_traffics");
  return response.data;
};

export const createCountryTraffic = async (data) => {
  const response = await api.post("/country_traffics", { country_traffic: data });
  return response.data;
};

export const updateCountryTraffic = async (id, data) => {
  const response = await api.put(`/country_traffics/${id}`, { country_traffic: data });
  return response.data;
};

export const deleteCountryTraffic = async (id) => {
  await api.delete(`/country_traffics/${id}`);
};

export const getVehicleTraffic = async (countryId) => {
  const response = await api.get(`/country_traffics/${countryId}/vehicle_type_traffics`);
  return { countryId, vehicles: response.data };
};

export const createVehicleTraffic = async (countryId, data) => {
  const response = await api.post(`/country_traffics/${countryId}/vehicle_type_traffics`, { vehicle_type_traffic: data });
  return response.data;
};

export const updateVehicleTraffic = async (countryId, id, data) => {
  const response = await api.put(`/country_traffics/${countryId}/vehicle_type_traffics/${id}`, { vehicle_type_traffic: data });
  return response.data;
};

export const deleteVehicleTraffic = async (countryId, id) => {
  await api.delete(`/country_traffics/${countryId}/vehicle_type_traffics/${id}`);
};
