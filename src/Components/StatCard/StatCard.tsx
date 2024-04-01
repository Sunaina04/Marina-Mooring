import { Chart } from "primereact/chart";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface StatCardProps {
  title: string;
  percentage: number;
  count: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, percentage, count }) => {
  const data = [
    {
      name: title,
      Percentage: percentage,
      Count: count,
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-md p-4 mr-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="text-gray-600 text-sm font-bold">{title}</div>
        <div className="text-gray-600 text-sm">{percentage}%</div>
      </div>
      <div className="text-gray-600 text-sm mb-2">{count}</div>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatCard;
