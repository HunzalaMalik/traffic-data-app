import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CountryTrafficChart = () => {
  const { countryTraffic, loading } = useSelector((state) => state.traffic);

  useEffect(() => {
  }, [countryTraffic]);


  if (loading.country) {
    return <p className="text-center text-lg font-semibold p-6">Loading...</p>;
  }

  const labels = countryTraffic.map((item) => item.country);

  const totalTrafficData = countryTraffic.map((item) => item.count);
  
  const carData = countryTraffic.map(
    (item) => item.vehicle_type_traffics?.find((v) => v.vehicle_type === "Car")?.count || 0
  );
  const bikeData = countryTraffic.map(
    (item) => item.vehicle_type_traffics?.find((v) => v.vehicle_type === "Bike")?.count || 0
  );
  const busData = countryTraffic.map(
    (item) => item.vehicle_type_traffics?.find((v) => v.vehicle_type === "Bus")?.count || 0
  );

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Traffic",
        data: totalTrafficData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Cars",
        data: carData,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Bikes",
        data: bikeData,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Buses",
        data: busData,
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };
  

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full mb-6">
      <Typography variant="h6" className="text-gray-700 text-center mb-4 font-semibold">
        Country-wise Traffic & Vehicle Breakdown
      </Typography>

      <div className="flex justify-center items-center">
        <div className="w-full max-w-3xl">
          <Bar 
            data={chartData} 
            options={{
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default CountryTrafficChart;
