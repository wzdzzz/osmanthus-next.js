"use client"

import React, { PureComponent } from "react"
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jul",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    uv: 1490,
    pv: 1300,
    amt: 2100,
  },
  {
    name: "Sep",
    uv: 2222,
    pv: 2200,
    amt: 2100,
  },
  {
    name: "Oct",
    uv: 3490,
    pv: 9300,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 3311,
    pv: 3300,
    amt: 2100,
  },
  {
    name: "Dec",
    uv: 4000,
    pv: 7300,
    amt: 2100,
  },
]

export default class SimpleLineChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            axisLine={false}
            tickLine={false}
            fontSize={12}
            dataKey="name"
          />
          <YAxis axisLine={false} tickLine={false} fontSize={12} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}
