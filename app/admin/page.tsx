'use client';

import { useState, useEffect } from 'react';
import {
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { products } from '@/data/products';

type Order = {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
};

type ProductStat = {
  id: number;
  name: string;
  sales: number;
  revenue: number;
};

type Stats = {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  recentOrders: Order[];
  topProducts: ProductStat[];
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: products.length,
    recentOrders: [],
    topProducts: [],
  });

  useEffect(() => {
    const mockStats: Stats = {
      totalRevenue: 124895.5,
      totalOrders: 342,
      totalCustomers: 189,
      totalProducts: products.length,
      recentOrders: [
        {
          id: 'ORD-9385',
          customer: 'John Doe',
          date: '2023-04-12',
          total: 2499.99,
          status: 'Completed',
        },
        {
          id: 'ORD-9384',
          customer: 'Sarah Smith',
          date: '2023-04-12',
          total: 1899.0,
          status: 'Processing',
        },
        {
          id: 'ORD-9383',
          customer: 'Michael Johnson',
          date: '2023-04-11',
          total: 3299.99,
          status: 'Completed',
        },
        {
          id: 'ORD-9382',
          customer: 'Emily Brown',
          date: '2023-04-11',
          total: 2199.0,
          status: 'Shipped',
        },
        {
          id: 'ORD-9381',
          customer: 'David Wilson',
          date: '2023-04-10',
          total: 1599.99,
          status: 'Completed',
        },
      ],
      topProducts: [
        { id: 1, name: 'Quantum Apex', sales: 42, revenue: 104958.0 },
        { id: 2, name: 'Quantum Nexus', sales: 38, revenue: 83562.0 },
        { id: 3, name: 'Quantum Stealth', sales: 29, revenue: 52171.0 },
        { id: 4, name: 'Quantum Titan', sales: 24, revenue: 71976.0 },
        { id: 5, name: 'Quantum Pulse', sales: 21, revenue: 31479.0 },
      ],
    };

    setStats(mockStats);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </span>
          <button className="rounded-full bg-purple-600 p-2 text-white hover:bg-purple-700">
            <Clock className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-green-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 text-white border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-red-400 flex items-center mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              No change from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription className="text-gray-400">
            Latest customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Order ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Customer
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Total
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order: any) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 text-sm">{order.id}</td>
                    <td className="px-4 py-2 text-sm">{order.customer}</td>
                    <td className="px-4 py-2 text-sm">{order.date}</td>
                    <td className="px-4 py-2 text-sm">
                      ${order.total.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${
                          order.status === 'Completed'
                            ? 'bg-green-900 text-green-300'
                            : order.status === 'Processing'
                            ? 'bg-blue-900 text-blue-300'
                            : 'bg-yellow-900 text-yellow-300'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="text-sm text-purple-400 hover:text-purple-300">
              View all orders →
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Top products */}
      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
          <CardDescription className="text-gray-400">
            Best selling products this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Product
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Sales
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.topProducts.map((product: any) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 text-sm">{product.name}</td>
                    <td className="px-4 py-2 text-sm">{product.sales} units</td>
                    <td className="px-4 py-2 text-sm">
                      ${product.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="text-sm text-purple-400 hover:text-purple-300">
              View all products →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
