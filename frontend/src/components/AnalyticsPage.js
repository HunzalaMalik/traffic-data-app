import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AnalyticsPage = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();

  const { countryTraffic, loading } = useSelector((state) => state.traffic);
  const country = countryTraffic.find(c => c.id.toString() === countryId);
  const vehicles = country.vehicle_type_traffics || [];

  useEffect(() => {
  }, [countryId, country]);

  if (!country || loading.country) {
    return <div className="text-center text-lg font-semibold p-6">Loading...</div>;
  }

  const barChartData = {
    labels: vehicles.map(v => v.vehicle_type),
    datasets: [
      {
        label: "Vehicle Count",
        data: vehicles.map(v => v.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const pieChartData = {
    labels: vehicles.map(v => v.vehicle_type),
    datasets: [
      {
        data: vehicles.map(v => v.count),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <>
      {(!vehicles || vehicles.length === 0) ? (
        <div className="p-6">
          <div>No vehicle data available</div>
          <button 
            onClick={() => navigate(-1)} 
            className="bg-gray-600 text-white px-4 py-2 rounded mt-4"
          >
            Go Back to Dashboard
          </button>
        </div>
      ) : (
        <div className="p-6">
          <button 
            onClick={() => navigate(-1)} 
            className="bg-gray-600 text-white px-4 py-2 rounded mb-4"
          >
            Back
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Analytics for {country.country}
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold text-center mb-2">
                Vehicle Type Distribution
              </h3>
              <Bar data={barChartData} />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold text-center mb-2">
                Vehicle Type Percentage
              </h3>
              <Pie data={pieChartData} />
            </div>
          </div>
        </div>
      )}
    </>
  );  
};

export default AnalyticsPage;
