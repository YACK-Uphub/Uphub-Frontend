"use client";
import React from "react";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const summaryCards = [
  {
    title: "Tổng số sinh viên",
    value: "56",
    change: "+17.8%",
    note: "Tăng 17.8% so với tháng trước",
    description: "Số lượng sinh viên tăng đáng kể trong tháng qua",
    trend: "up",
  },
  {
    title: "Tổng số doanh nghiệp",
    value: "18",
    change: "+24.2%",
    note: "Tăng 24.2% so với tháng trước",
    description: "Số doanh nghiệp tăng ổn định",
    trend: "up",
  },
  {
    title: "Tổng số tài khoản",
    value: "78",
    change: "+20.5%",
    note: "Tăng 20.5% so với tháng trước",
    description: "Số lượt đăng ký tài khoản tăng nhanh",
    trend: "up",
  },
  {
    title: "Tổng doanh thu",
    value: "4,590,000 VNĐ",
    change: "15.6%",
    note: "Tăng 15.6% so với tháng trước",
    description: "Tỷ lệ tăng trưởng đạt đúng với kỳ vọng đề ra",
    trend: "up",
  },
];

const lineChartData = {
  labels: [
    "19/06",
    "20/06",
    "21/06",
    "22/06",
    "23/06",
    "24/06",
    "25/06",
    "26/06",
    "27/06",
    "28/06",
    "29/06",
    "30/06",
    "01/07",
    "02/07",
    "03/07",
    "04/07",
    "05/07",
    "06/07",
    "07/07",
    "08/07",
    "09/07",
    "10/07",
    "11/07",
    "12/07",
    "13/07",
    "14/07",
    "15/07",
  ],
  datasets: [
    {
      label: "Sinh viên",
      data: [0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 3, 1, 2, 1, 0, 1, 5, 3, 6, 4, 8, 2, 5, 3, 4, 2, 3],
      fill: true,
      backgroundColor: "rgba(250, 204, 21, 0.2)",
      borderColor: "#FACC15",
      tension: 0.4,
    },
    {
      label: "Doanh nghiệp",
      data: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 1, 3, 1, 2, 1, 1, 1, 2],
      fill: true,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "#3B82F6",
      tension: 0.4,
    },
  ],
};

const UAdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-10">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.title} className="rounded-xl bg-white p-5 shadow-md">
            <div className="text-lg font-bold text-custom-blue-2">{card.title}</div>
            <div className="text-2xl font-bold text-custom-yellow-3">{card.value}</div>
            <div className="mt-1 flex items-center gap-2 text-sm">
              {card.trend === "up" ? (
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span className={`font-medium ${card.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {card.note}
              </span>
            </div>
            <div className="mt-1 text-xs text-gray-400">{card.description}</div>
          </div>
        ))}
      </div>

      {/* Line Chart Section */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-bold text-custom-blue-2">Tỷ lệ đăng ký tài khoản</h2>
          <div className="flex gap-2">
            {["Last 3 months", "Last 30 days"].map((label, idx) => (
              <button
                key={idx}
                className={`text-sm px-4 py-1.5 rounded-lg border ${
                  idx === 1
                    ? "bg-blue-100 border-blue-300 text-blue-700 font-medium"
                    : "bg-gray-100 border-gray-300 text-gray-700"
                } hover:bg-blue-200 transition`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[450px]">
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: { boxWidth: 16, color: "#6B7280" },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UAdminDashboard;
