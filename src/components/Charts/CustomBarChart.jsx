import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  // Bar colors based on priority
  const getBarColor = (entry) => {
    switch (entry?.priority) {
      case "Low":
        return "#00BC7D"; // green
      case "Medium":
        return "#FE9900"; // orange
      case "High":
        return "#FF1F57"; // red
      default:
        return "#00BC7D";
    }
  };

  // Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const info = payload[0].payload;

      return (
        <div className="bg-white shadow-lg rounded-lg p-3 border border-gray-100">
          <p className="text-xs font-semibold text-gray-800 mb-1">
            {info.priority}
          </p>
          <p className="text-sm text-gray-600">
            Count:{" "}
            <span className="font-semibold text-gray-900">{info.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6 rounded-xl p-2 md:p-4 shadow-sm">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />

          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: "#555" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#555" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />

          <Tooltip
            cursor={{ fill: "transparent" }}
            content={<CustomTooltip />}
          />

          <Bar
            dataKey="count"
            radius={[10, 10, 4, 4]}
            maxBarSize={45}
            animationDuration={700}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
