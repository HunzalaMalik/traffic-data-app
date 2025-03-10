import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ManageTraffic from "./components/ManageTraffic";
import AnalyticsPage from "./components/AnalyticsPage";
import ErrorAlert from "./components/ErrorAlert";

const App = () => {
  return (
    <Router>
      <ErrorAlert />
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<ManageTraffic />} />
          <Route path="manage-traffic" element={<ManageTraffic />} />
          <Route path="analytics/:countryId" element={<AnalyticsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default RootApp;
