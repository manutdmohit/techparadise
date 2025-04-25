'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data for sales by month
const salesData = [
  { name: 'Jan', sales: 12500 },
  { name: 'Feb', sales: 15000 },
  { name: 'Mar', sales: 18000 },
  { name: 'Apr', sales: 22000 },
  { name: 'May', sales: 19500 },
  { name: 'Jun', sales: 23500 },
  { name: 'Jul', sales: 29000 },
  { name: 'Aug', sales: 32500 },
  { name: 'Sep', sales: 36000 },
  { name: 'Oct', sales: 42000 },
  { name: 'Nov', sales: 48000 },
  { name: 'Dec', sales: 55000 },
];

// Mock data for visitors
const visitorData = [
  { name: 'Jan', visitors: 5200 },
  { name: 'Feb', visitors: 5800 },
  { name: 'Mar', visitors: 6500 },
  { name: 'Apr', visitors: 7200 },
  { name: 'May', visitors: 6800 },
  { name: 'Jun', visitors: 7500 },
  { name: 'Jul', visitors: 8200 },
  { name: 'Aug', visitors: 8900 },
  { name: 'Sep', visitors: 9600 },
  { name: 'Oct', visitors: 10500 },
  { name: 'Nov', visitors: 11200 },
  { name: 'Dec', visitors: 12000 },
];

// Mock data for sales by category
const categoryData = [
  { name: 'Gaming PCs', value: 65 },
  { name: 'Workstations', value: 20 },
  { name: 'Accessories', value: 10 },
  { name: 'Components', value: 5 },
];

// Mock data for top products
const topProductsData = [
  { name: 'Quantum Apex', sales: 120 },
  { name: 'Quantum Nexus', sales: 98 },
  { name: 'Quantum Stealth', sales: 86 },
  { name: 'Quantum Titan', sales: 72 },
  { name: 'Quantum Pulse', sales: 65 },
];

const COLORS = ['#8b5cf6', '#6366f1', '#ec4899', '#f43f5e', '#f97316'];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('year');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Analytics
        </h1>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600 text-white">
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-purple-600 hover:bg-purple-700">Export</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Sales Overview */}
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription className="text-gray-400">
              Monthly sales performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      borderColor: '#374151',
                      color: '#fff',
                    }}
                    formatter={(value: any) => [
                      `$${value.toLocaleString()}`,
                      'Sales',
                    ]}
                  />
                  <Bar dataKey="sales" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Visitors */}
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle>Website Visitors</CardTitle>
            <CardDescription className="text-gray-400">
              Monthly visitor traffic
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={visitorData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      borderColor: '#374151',
                      color: '#fff',
                    }}
                    formatter={(value) => [
                      `${value.toLocaleString()}`,
                      'Visitors',
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#ec4899"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sales by Category */}
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription className="text-gray-400">
              Distribution of sales across product categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      borderColor: '#374151',
                      color: '#fff',
                    }}
                    formatter={(value) => [`${value}%`, 'Percentage']}
                  />
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription className="text-gray-400">
              Best selling products by units sold
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={topProductsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#9ca3af"
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      borderColor: '#374151',
                      color: '#fff',
                    }}
                    formatter={(value) => [`${value} units`, 'Sales']}
                  />
                  <Bar dataKey="sales" fill="#6366f1" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
