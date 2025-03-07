import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  getCountryTraffic, getVehicleTraffic, 
  createCountryTraffic as apiCreateCountryTraffic, 
  updateCountryTraffic as apiUpdateCountryTraffic, 
  deleteCountryTraffic as apiDeleteCountryTraffic,
  createVehicleTraffic as apiCreateVehicleTraffic,
  updateVehicleTraffic as apiUpdateVehicleTraffic,
  deleteVehicleTraffic as apiDeleteVehicleTraffic
} from "../api/trafficApi";

export const fetchCountryTraffic = createAsyncThunk(
  "traffic/fetchCountry",
  async (_, { rejectWithValue }) => {
    try {
      return await getCountryTraffic();
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || ["An error occurred"]);
    }
  }
);

export const fetchVehicleTraffic = createAsyncThunk(
  "traffic/fetchVehicle",
  async (countryId, { rejectWithValue }) => {
    try {
      const vehicles = await getVehicleTraffic(countryId);
      return { countryId, vehicles };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || ["An error occurred"]);
    }
  }
);

export const createCountryTraffic = createAsyncThunk(
  "traffic/createCountry",
  async (countryData, { rejectWithValue }) => {
    try {
      return await apiCreateCountryTraffic(countryData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || ["An error occurred"]);
    }
  }
);

export const updateCountryTraffic = createAsyncThunk(
  "traffic/updateCountry",
  async (updatedData, { rejectWithValue }) => {
    try {
      await apiUpdateCountryTraffic(updatedData.id, updatedData);
      return updatedData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || ["An error occurred"]);
    }
  }
);

export const deleteCountryTraffic = createAsyncThunk(
  "traffic/deleteCountry",
  async (id, { rejectWithValue }) => {
    try {
      await apiDeleteCountryTraffic(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || ["An error occurred"]);
    }
  }
);

export const createVehicleTraffic = createAsyncThunk(
  "traffic/createVehicle",
  async ({ countryId, ...vehicleData }, { rejectWithValue }) => {
    try {
      const response = await apiCreateVehicleTraffic(countryId, vehicleData);
      return { countryId, vehicle: response };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || ["An error occurred"]);
    }
  }
);

export const updateVehicleTraffic = createAsyncThunk(
  "traffic/updateVehicle",
  async ({ countryId, vehicleId, ...updatedData }, { rejectWithValue }) => {
    try {
      await apiUpdateVehicleTraffic(countryId, vehicleId, updatedData);
      return { countryId, vehicleId, ...updatedData };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || ["An error occurred"]);
    }
  }
);

export const deleteVehicleTraffic = createAsyncThunk(
  "traffic/deleteVehicle",
  async ({ countryId, vehicleId }, { rejectWithValue }) => {
    try {
      await apiDeleteVehicleTraffic(countryId, vehicleId);
      return { countryId, vehicleId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || ["An error occurred"]);
    }
  }
);

const initialState = {
  countryTraffic: [],
  vehicleTraffic: {},
  loading: {
    country: false,
    vehicle: {},
  },
  error: null,
};

const trafficSlice = createSlice({
  name: "traffic",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryTraffic.pending, (state) => {
        state.loading.country = true;
        state.error = null;
      })
      .addCase(fetchCountryTraffic.fulfilled, (state, action) => {
        state.loading.country = false;
        state.countryTraffic = action.payload;
      })
      .addCase(fetchVehicleTraffic.pending, (state, action) => {
        state.loading.vehicle[action.meta.arg] = true;
      })
      .addCase(fetchVehicleTraffic.fulfilled, (state, action) => {
        const { countryId, vehicles } = action.payload;
        state.loading.vehicle[countryId] = false;
        state.vehicleTraffic[countryId] = vehicles;
      })
      .addCase(createCountryTraffic.fulfilled, (state, action) => {
        state.countryTraffic.push(action.payload);
      })
      .addCase(updateCountryTraffic.fulfilled, (state, action) => {
        const index = state.countryTraffic.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.countryTraffic[index] = action.payload;
        }
      })
      .addCase(deleteCountryTraffic.fulfilled, (state, action) => {
        state.countryTraffic = state.countryTraffic.filter((c) => c.id !== action.payload);
        delete state.vehicleTraffic[action.payload];
      })
      .addCase(createVehicleTraffic.fulfilled, (state, action) => {
        const { countryId, vehicle } = action.payload;
        if (!state.vehicleTraffic[countryId]) {
          state.vehicleTraffic[countryId] = { vehicles: [] };
        }
        state.vehicleTraffic[countryId].vehicles.push(vehicle);
      })
      .addCase(updateVehicleTraffic.fulfilled, (state, action) => {
        const { countryId, vehicleId, ...updatedVehicle } = action.payload;

        if (!state.vehicleTraffic[countryId]) {
          state.vehicleTraffic[countryId] = { vehicles: [] };
        }
      
        const index = state.vehicleTraffic[countryId].vehicles.findIndex((v) => v.id === vehicleId);
        if (index !== -1) {
          state.vehicleTraffic[countryId].vehicles[index] = { id: vehicleId, ...updatedVehicle };
        }
      })
      .addCase(deleteVehicleTraffic.fulfilled, (state, action) => {
        const { countryId, vehicleId } = action.payload;

        if (!state.vehicleTraffic[countryId]) {
          state.vehicleTraffic[countryId] = { vehicles: [] };
        }
      
        state.vehicleTraffic[countryId].vehicles = state.vehicleTraffic[countryId].vehicles.filter((v) => v.id !== vehicleId);
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { clearErrors } = trafficSlice.actions;
export default trafficSlice.reducer;