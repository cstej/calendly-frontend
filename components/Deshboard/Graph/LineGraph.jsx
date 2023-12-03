import { Text } from "@chakra-ui/react"; // We won't be using Box, Flex, or useColorModeValue
import { Bar } from "react-chartjs-2";
import React, { useContext } from "react";

const data = {
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  datasets: [
    {
      label: "Earning",
      data: [80, 70, 85, 41, 44, 65, 33, 53, 85, 90, 75, 65, 52, 45],
      backgroundColor: "gray", // You should specify a valid Tailwind CSS color here
      borderColor: "rgba(150, 192, 60, 1)",
      barThickness: 10,
    },
    {
      label: "Expenses",
      data: [33, 53, 20, 41, 30, 65, 33, 56, 40, 41, 44, 45, 90, 22],
      backgroundColor: "blue", // You should specify a valid Tailwind CSS color here
      borderColor: "rgba(150, 192, 60, 1)",
      barThickness: 10,
    },
  ],
};

const options = {
  scales: {
    x: {
      display: true,
    },
    y: {
      display: true,
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function OverallGraph() {
  return (
    <div className="w-full md:w-500 lg:w-auto text-gray-900 dark:text-gray-100">
      <Text fontWeight="600" className="text-1.7rem mb-1rem">
        All Earnings
      </Text>
      <Bar data={data} options={options} />
    </div>
  );
}
