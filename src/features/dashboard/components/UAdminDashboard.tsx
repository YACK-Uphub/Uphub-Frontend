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
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  ChartDataLabels
);

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
    value: "6,463,000 VNĐ",
    change: "15.6%",
    note: "Tăng 15.6% so với tháng trước",
    description: "Tỷ lệ tăng trưởng đạt đúng với kỳ vọng đề ra",
    trend: "up",
  },
];

const lineChartData = {
  labels: [
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
    "16/07",
    "17/07",
    "18/07",
    "19/07",
    "20/07",
    "21/07",
    "22/07",
    "23/07",
    "24/07",
  ],
  datasets: [
    {
      label: "Sinh viên",
      data: [0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 3, 1, 2, 1, 0, 1, 5, 3, 5, 4, 8, 2, 5, 3, 4, 2, 3, 2, 2, 1, 1, 1, 1],
      fill: true,
      backgroundColor: "rgba(250, 204, 21, 0.2)",
      borderColor: "#FACC15",
      tension: 0.4,
    },
    {
      label: "Doanh nghiệp",
      data: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 2, 1, 3, 1, 2, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0],
      fill: true,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "#3B82F6",
      tension: 0.4,
    },
  ],
};

const pieChartRevenueData = {
  labels: ["Doanh nghiệp", "Sinh viên"],
  datasets: [
    {
      data: [4600000, 1961000],
      backgroundColor: ["#FACC15", "#2454b6"],
    },
  ],
};

const pieChartOrderData = {
  labels: ["Doanh nghiệp", "Sinh viên"],
  datasets: [
    {
      data: [6, 16],
      backgroundColor: ["#FACC15", "#2454b6"],
    },
  ],
};

const UAdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-10">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.slice(0, 3).map((card) => (
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
      <h2 className="text-3xl font-semibold text-custom-blue-2 m-4">Thống kê doanh thu</h2>

      <div className="space-y-6">
        {/* --- Summary Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tổng doanh thu */}
          <div className="rounded-2xl bg-blue-50 p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-medium mb-1">Tổng doanh thu</h3>
            <p className="text-2xl font-bold text-custom-blue-2 mb-2">6,561,000 VNĐ</p>
            <div className="flex items-center gap-2 text-md">
              <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+9449% so với tháng trước</span>
            </div>
          </div>

          {/* Tổng đơn hàng */}
          <div className="rounded-2xl bg-yellow-50 p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-medium text-gray-700 mb-1">Tổng đơn hàng</h3>
            <p className="text-2xl font-bold text-custom-blue-2 mb-2">22 đơn hàng</p>
            <div className="flex items-center gap-2 text-md">
              <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
              <span className="text-green-600 font-medium">+20% so với tháng trước</span>
            </div>
          </div>
        </div>

        {/* --- Pie Charts --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
          {/* Pie Chart: Doanh thu */}
          <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-custom-blue-2 mb-4">Tỷ lệ doanh thu</h2>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="h-[350px] w-full max-w-xs mx-auto">
                <div className="p-3 bg-gray-50 rounded-xl shadow-inner">
                  <Pie
                    data={pieChartRevenueData}
                    options={{
                      responsive: true,
                      animation: false,
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: { boxWidth: 16, color: "#6B7280" },
                        },
                        datalabels: {
                          color: "#fff",
                          font: { weight: "bold" as const },
                          formatter: (value, context) => {
                            const total = (context.chart.data.datasets[0].data as number[]).reduce(
                              (acc, val) => acc + val,
                              0
                            );
                            const percent = ((value / total) * 100).toFixed(1);
                            return `${percent}%`;
                          },
                        },
                      },
                    }}
                    plugins={[ChartDataLabels]}
                  />
                </div>
              </div>

              {/* Mô tả doanh thu */}
              <div className="flex-1 text-sm text-gray-700 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                  <span className="w-3 h-3 mt-1 rounded-full bg-custom-yellow-3"></span>
                  <div>
                    <div className="font-medium">Từ doanh nghiệp</div>
                    <div className="text-sm text-gray-500">4,600,000 VNĐ</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                  <span className="w-3 h-3 mt-1 rounded-full bg-custom-blue-2"></span>
                  <div>
                    <div className="font-medium">Từ sinh viên</div>
                    <div className="text-sm text-gray-500">1,961,000 VNĐ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart: Đơn hàng */}
          <div className="rounded-2xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-custom-blue-2 mb-4">Tỷ lệ đơn hàng</h2>
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="h-[250px] w-full max-w-xs mx-auto">
                <div className="p-3 bg-gray-50 rounded-xl shadow-inner">
                  <Pie
                    data={pieChartOrderData}
                    options={{
                      responsive: true,
                      animation: false,
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: { boxWidth: 16, color: "#6B7280" },
                        },
                        datalabels: {
                          color: "#fff",
                          font: { weight: "bold" as const },
                          formatter: (value, context) => {
                            const total = (context.chart.data.datasets[0].data as number[]).reduce(
                              (acc, val) => acc + val,
                              0
                            );
                            const percent = ((value / total) * 100).toFixed(1);
                            return `${percent}%`;
                          },
                        },
                      },
                    }}
                    plugins={[ChartDataLabels]}
                  />
                </div>
              </div>

              {/* Mô tả đơn hàng */}
              <div className="flex-1 text-sm text-gray-700 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                  <span className="w-3 h-3 mt-1 rounded-full bg-custom-yellow-3"></span>
                  <div>
                    <div className="font-medium">Doanh nghiệp</div>
                    <div className="text-sm text-gray-500">6 đơn</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg shadow-sm">
                  <span className="w-3 h-3 mt-1 rounded-full bg-custom-blue-2"></span>
                  <div>
                    <div className="font-medium">Sinh viên</div>
                    <div className="text-sm text-gray-500">16 đơn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UAdminDashboard;
