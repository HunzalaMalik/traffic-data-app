import api from "../api/api";
import {
  getCountryTraffic,
  createCountryTraffic,
  updateCountryTraffic,
  deleteCountryTraffic,
  getVehicleTraffic,
  createVehicleTraffic,
  updateVehicleTraffic,
  deleteVehicleTraffic,
} from "../api/trafficApi";

jest.mock("../api/api");

describe("trafficApi.js", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch country traffic data", async () => {
    const mockData = [{ id: 1, country: "USA", count: 300 }];
    api.get.mockResolvedValue({ data: mockData });

    const result = await getCountryTraffic();
    expect(api.get).toHaveBeenCalledWith("/country_traffics");
    expect(result).toEqual(mockData);
  });


  it("should create a new country", async () => {
    const mockCountry = { id: 2, country: "Canada", count: 500 };
    api.post.mockResolvedValue({ data: mockCountry });

    const result = await createCountryTraffic(mockCountry);
    expect(api.post).toHaveBeenCalledWith("/country_traffics", { country_traffic: mockCountry });
    expect(result).toEqual(mockCountry);
  });

  it("should update an existing country", async () => {
    const updatedCountry = { id: 1, country: "USA", count: 400 };
    api.put.mockResolvedValue({ data: updatedCountry });

    const result = await updateCountryTraffic(1, updatedCountry);
    expect(api.put).toHaveBeenCalledWith("/country_traffics/1", { country_traffic: updatedCountry });
    expect(result).toEqual(updatedCountry);
  });

  it("should delete a country", async () => {
    api.delete.mockResolvedValue({});
    await deleteCountryTraffic(1);

    expect(api.delete).toHaveBeenCalledWith("/country_traffics/1");
  });

  it("should fetch vehicle traffic for a country", async () => {
    const mockVehicles = [{ id: 1, vehicle_type: "Car", count: 100 }];
    api.get.mockResolvedValue({ data: mockVehicles });

    const result = await getVehicleTraffic(1);
    expect(api.get).toHaveBeenCalledWith("/country_traffics/1/vehicle_type_traffics");
    expect(result).toEqual({ countryId: 1, vehicles: mockVehicles });
  });


  it("should create a new vehicle entry", async () => {
    const newVehicle = { id: 2, vehicle_type: "Bike", count: 150 };
    api.post.mockResolvedValue({ data: newVehicle });

    const result = await createVehicleTraffic(1, newVehicle);
    expect(api.post).toHaveBeenCalledWith("/country_traffics/1/vehicle_type_traffics", {
      vehicle_type_traffic: newVehicle,
    });
    expect(result).toEqual(newVehicle);
  });

  it("should update an existing vehicle entry", async () => {
    const updatedVehicle = { id: 2, vehicle_type: "Bike", count: 200 };
    api.put.mockResolvedValue({ data: updatedVehicle });

    const result = await updateVehicleTraffic(1, 2, updatedVehicle);
    expect(api.put).toHaveBeenCalledWith("/country_traffics/1/vehicle_type_traffics/2", {
      vehicle_type_traffic: updatedVehicle,
    });
    expect(result).toEqual(updatedVehicle);
  });

  it("should delete a vehicle entry", async () => {
    api.delete.mockResolvedValue({});
    await deleteVehicleTraffic(1, 2);

    expect(api.delete).toHaveBeenCalledWith("/country_traffics/1/vehicle_type_traffics/2");
  });
});
