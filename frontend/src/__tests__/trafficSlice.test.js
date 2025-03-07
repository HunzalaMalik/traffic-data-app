import { configureStore } from "@reduxjs/toolkit";
import trafficReducer, {
  fetchCountryTraffic,
  fetchVehicleTraffic,
  createCountryTraffic,
  updateCountryTraffic,
  deleteCountryTraffic,
  createVehicleTraffic,
  updateVehicleTraffic,
  deleteVehicleTraffic,
} from "../store/trafficSlice";
import { getCountryTraffic, getVehicleTraffic } from "../api/trafficApi";

jest.mock("../api/trafficApi");

describe("trafficSlice reducer", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { traffic: trafficReducer },
    });
  });

  test("should return the initial state", () => {
    expect(store.getState().traffic).toEqual({
      countryTraffic: [],
      vehicleTraffic: {},
      loading: { country: false, vehicle: {} },
      error: null,
    });
  });

  test("should handle fetchCountryTraffic.pending", () => {
    store.dispatch({ type: fetchCountryTraffic.pending.type });
    expect(store.getState().traffic.loading.country).toBe(true);
  });

  test("should handle fetchCountryTraffic.fulfilled", () => {
    const payload = [{ id: 1, country: "USA", count: 300 }];
    store.dispatch({ type: fetchCountryTraffic.fulfilled.type, payload });

    expect(store.getState().traffic.loading.country).toBe(false);
    expect(store.getState().traffic.countryTraffic).toEqual(payload);
  });

  test("should handle fetchVehicleTraffic.fulfilled", () => {
    const payload = { countryId: 1, vehicles: [{ id: 1, vehicle_type: "Car", count: 100 }] };
    store.dispatch({ type: fetchVehicleTraffic.fulfilled.type, payload });

    expect(store.getState().traffic.vehicleTraffic[1]).toEqual(payload.vehicles);
  });

  test("should handle createCountryTraffic.fulfilled", () => {
    const newCountry = { id: 2, country: "Canada", count: 500 };
    store.dispatch({ type: createCountryTraffic.fulfilled.type, payload: newCountry });

    expect(store.getState().traffic.countryTraffic.length).toBe(1);
    expect(store.getState().traffic.countryTraffic[0]).toEqual(newCountry);
  });

  test("should handle updateCountryTraffic.fulfilled", () => {
    store.dispatch({
      type: createCountryTraffic.fulfilled.type,
      payload: { id: 1, country: "USA", count: 300 },
    });
    
    store.dispatch({
      type: updateCountryTraffic.fulfilled.type,
      payload: { id: 1, country: "USA", count: 400 },
    });
    
    expect(store.getState().traffic.countryTraffic[0].count).toBe(400);
  });

  test("should handle deleteCountryTraffic.fulfilled", () => {
    store.dispatch({ type: deleteCountryTraffic.fulfilled.type, payload: 1 });

    expect(store.getState().traffic.countryTraffic.length).toBe(0);
    expect(store.getState().traffic.vehicleTraffic[1]).toBeUndefined();
  });

  test("should handle createVehicleTraffic.fulfilled", () => {
    const newVehicle = { id: 2, vehicle_type: "Bike", count: 150 };
    const payload = { countryId: 1, vehicle: newVehicle };
  
    store.dispatch({ type: createVehicleTraffic.fulfilled.type, payload });
  
    expect(store.getState().traffic.vehicleTraffic[1].vehicles.length).toBe(1);
    expect(store.getState().traffic.vehicleTraffic[1].vehicles[0]).toEqual(newVehicle);
  });  

  test("should handle updateVehicleTraffic.fulfilled", () => {
    const updatedVehicle = { id: 2, vehicle_type: "Bike", count: 200 };
    const payload = { countryId: 1, vehicleId: 2, ...updatedVehicle };
  
    store.dispatch({
      type: updateVehicleTraffic.fulfilled.type,
      payload,
    });
  
    expect(store.getState().traffic.vehicleTraffic[1]).toHaveProperty("vehicles");
  });
  
  test("should handle deleteVehicleTraffic.fulfilled", () => {
    const payload = { countryId: 1, vehicleId: 2 };
  
    store.dispatch({
      type: deleteVehicleTraffic.fulfilled.type,
      payload,
    });
  
    expect(store.getState().traffic.vehicleTraffic[1]).toHaveProperty("vehicles");
    expect(store.getState().traffic.vehicleTraffic[1].vehicles.length).toBe(0);
  });
  
});
