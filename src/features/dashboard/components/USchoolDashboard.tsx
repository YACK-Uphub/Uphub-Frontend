"use client";
import React from "react";
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/24/outline";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const summaryCards = [
  {
    title: "Tổng số sinh viên",
    value: "3,800",
    change: "+12.5%",
    note: "+12.5%",
    description: "Số lượng sinh viên tăng trong học kỳ này",
    trend: "up",
  },
  {
    title: "Tổng số doanh nghiệp",
    value: "56",
    change: "1.01%",
    note: "+1.01%",
    description: "Số lượng doanh nghiệp hợp tác ổn định",
    trend: "up",
  },
  {
    title: "Tổng số công việc",
    value: "4,500",
    change: "+12.5%",
    note: "+12.5%",
    description: "Cơ hội việc làm đang tăng mạnh",
    trend: "up",
  },
];

const barChartData = {
  labels: ["SE", "MC", "IB", "AI", "IA", "MKT"],
  datasets: [
    {
      label: "Success",
      data: [300, 500, 450, 200, 400, 420],
      backgroundColor: "#FFD147",
    },
    {
      label: "Pending",
      data: [100, 120, 80, 60, 150, 100],
      backgroundColor: "#2454B6",
    },
  ],
};

const donutChartData = {
  labels: ["A", "B", "C", "D", "E"],
  datasets: [
    {
      label: "Sinh viên",
      data: [250, 50],
      backgroundColor: ["#FFD147", "#2454B6"],
      borderWidth: 0,
    },
  ],
};

const USchoolDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <div key={card.title} className="rounded-xl bg-white p-5 shadow">
            <div className="text-lg font-semibold text-custom-blue-2">{card.title}</div>
            <div className="text-2xl font-semibold text-custom-yellow-3">{card.value}</div>
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Bar Chart Section - chiếm 2/3 */}
        <div className="rounded-xl bg-white p-6 shadow md:col-span-2">
          <h2 className="text-xl font-bold text-custom-blue-2">SUMMER 2025 - OJT</h2>
          <p className="text-sm text-gray-500">May - August 2025</p>
          <div className="mt-4">
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" } },
              }}
              height={240}
            />
          </div>
          <div className="mt-4 flex items-center justify-center text-sm font-medium text-green-600">
            Tăng 5.2% trong học kỳ này
            <ArrowTrendingUpIcon className="ml-1 h-4 w-4" />
          </div>
          <p className="text-center text-xs text-gray-400">
            Tỷ lệ sinh viên được phân bổ công việc thành công theo chuyên ngành
          </p>
        </div>

        {/* Donut Chart Section */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-custom-blue-2">SUMMER 2025</h2>
          <p className="text-sm text-gray-500">May - August 2025</p>

          <div className="relative mt-6 h-60 w-full">
            <Doughnut
              data={donutChartData}
              options={{
                cutout: "70%",
                plugins: {
                  legend: { display: false },
                },
              }}
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center leading-tight">
              <div className="text-2xl font-bold text-gray-900">3,800</div>
              <div className="text-sm text-gray-500">Sinh viên</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center text-sm font-medium text-green-600">
            Tăng 5.2% trong học kỳ này
            <ArrowTrendingUpIcon className="ml-1 h-4 w-4" />
          </div>

          <p className="text-center text-xs text-gray-400">
            Tỷ lệ sinh viên được phân bổ công việc thành công trong kỳ
          </p>
        </div>
      </div>
    </div>
  );
};

export default USchoolDashboard;
