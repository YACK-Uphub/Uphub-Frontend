"use client";
import React from "react";
import {ArrowTrendingDownIcon, ArrowTrendingUpIcon} from "@heroicons/react/24/outline";
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
import {Line} from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const summaryCards = [
  {
    title: "Tổng số sinh viên",
    value: "12,500",
    change: "+8.5%",
    note: "Tăng 8.5% so với tháng trước",
    description: "Số lượng sinh viên tăng đáng kể trong tháng qua",
    trend: "up",
  },
  {
    title: "Tổng số doanh nghiệp",
    value: "50",
    change: "+5.8%",
    note: "Tăng 5.8% so với tháng trước",
    description: "Số doanh nghiệp tăng ổn định",
    trend: "up",
  },
  {
    title: "Tổng số tài khoản",
    value: "15,800",
    change: "+12.5%",
    note: "Tăng 12.5% so với tháng trước",
    description: "Số lượt đăng ký tài khoản tăng nhanh",
    trend: "up",
  },
  {
    title: "Tỷ lệ tăng trưởng",
    value: "4.5%",
    change: "+4.5%",
    note: "Tăng trưởng ổn định",
    description: "Tỷ lệ tăng trưởng đạt đúng với kỳ vọng đề ra",
    trend: "up",
  },
];

const lineChartData = {
  labels: Array.from({ length: 30 }, (_, i) => `May ${i + 1}`),
  datasets: [
    {
      label: "Sinh viên",
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 200 + 100)),
      fill: true,
      backgroundColor: "#FFF7E5",
      borderColor: "#FACC15",
      tension: 0.4,
    },
    {
      label: "Doanh nghiệp",
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 300 + 150)),
      fill: true,
      backgroundColor: "#E8EDF3",
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
            {["Last 3 months", "Last 30 days", "Last 7 days"].map((label, idx) => (
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
