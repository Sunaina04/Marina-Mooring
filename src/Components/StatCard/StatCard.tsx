import { ArrowUpward } from "@mui/icons-material";
import { Chart } from "primereact/chart";
import React from "react";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";

interface StatCardProps {
  items: {
    title: string;
    percentage: number;
    count: number;
  }[];
}

const StatCard: React.FC<StatCardProps> = ({ items }) => {
  const color1 = "#C8C8C8";
  const color2 = "rgba(255, 255, 255, 0)";

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div
          className="text-[2rem] font-extrabold text-[#A6A6A6]"
          style={{ fontWeight: "bolder" }}
        >
          {items[0].title}
        </div>
        <div className="text-gray-400 text-[2.50rem] font-extrabold">
          {items[0].percentage}%
          <ArrowUpward
            style={{ rotate: "40deg", color: "#A6A6A6", fontSize: "5rem" }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center ml-12">
        <div className=" font-extrabold text-[#000]  text-[3rem]">
          {items[0].count}
        </div>
        <div style={{ width: "50%", height: 100, fontWeight: "bolder" }}>
          <ResponsiveContainer>
            <AreaChart
              data={items}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id={"abc"} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color1} stopOpacity={0.4}></stop>
                  <stop
                    offset="75%"
                    stopColor={color2}
                    stopOpacity={0.05}
                  ></stop>
                </linearGradient>
              </defs>
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke={color1}
                activeDot={{ r: 8 }}
                fill="url(#abc)"
                min={400000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
