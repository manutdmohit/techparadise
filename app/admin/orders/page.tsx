'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-9385',
    customer: 'John Doe',
    email: 'john.doe@example.com',
    date: '2023-04-12',
    total: 2499.99,
    status: 'Completed',
    items: 3,
  },
  {
    id: 'ORD-9384',
    customer: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    date: '2023-04-12',
    total: 1899.0,
    status: 'Processing',
    items: 2,
  },
  {
    id: 'ORD-9383',
    customer: 'Michael Johnson',
    email: 'michael.j@example.com',
    date: '2023-04-11',
    total: 3299.99,
    status: 'Completed',
    items: 1,
  },
  {
    id: 'ORD-9382',
    customer: 'Emily Brown',
    email: 'emily.brown@example.com',
    date: '2023-04-11',
    total: 2199.0,
    status: 'Shipped',
    items: 4,
  },
  {
    id: 'ORD-9381',
    customer: 'David Wilson',
    email: 'david.wilson@example.com',
    date: '2023-04-10',
    total: 1599.99,
    status: 'Completed',
    items: 2,
  },
  {
    id: 'ORD-9380',
    customer: 'Jessica Taylor',
    email: 'jessica.t@example.com',
    date: '2023-04-10',
    total: 2899.0,
    status: 'Processing',
    items: 3,
  },
  {
    id: 'ORD-9379',
    customer: 'Robert Martinez',
    email: 'robert.m@example.com',
    date: '2023-04-09',
    total: 1799.99,
    status: 'Cancelled',
    items: 1,
  },
  {
    id: 'ORD-9378',
    customer: 'Jennifer Anderson',
    email: 'jennifer.a@example.com',
    date: '2023-04-09',
    total: 3499.0,
    status: 'Shipped',
    items: 2,
  },
  {
    id: 'ORD-9377',
    customer: 'Christopher Thomas',
    email: 'chris.t@example.com',
    date: '2023-04-08',
    total: 2099.99,
    status: 'Completed',
    items: 3,
  },
  {
    id: 'ORD-9376',
    customer: 'Lisa Jackson',
    email: 'lisa.j@example.com',
    date: '2023-04-08',
    total: 1899.0,
    status: 'Processing',
    items: 2,
  },
  {
    id: 'ORD-9375',
    customer: 'Daniel White',
    email: 'daniel.w@example.com',
    date: '2023-04-07',
    total: 2799.99,
    status: 'Completed',
    items: 4,
  },
  {
    id: 'ORD-9374',
    customer: 'Michelle Harris',
    email: 'michelle.h@example.com',
    date: '2023-04-07',
    total: 1699.0,
    status: 'Shipped',
    items: 1,
  },
];

export default function OrdersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Filter orders based on search term
  const filteredOrders = mockOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleExportOrders = () => {
    toast.success('Orders exported.', {
      description: 'Orders have been exported to CSV successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Orders</h1>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={handleExportOrders}
        >
          <Download className="mr-2 h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
          <CardDescription className="text-gray-400">
            View and manage customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search orders by ID, customer name, or email..."
                className="pl-8 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

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
                    Items
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Total
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 text-sm">{order.id}</td>
                    <td className="px-4 py-2 text-sm">
                      <div>
                        <div>{order.customer}</div>
                        <div className="text-xs text-gray-400">
                          {order.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm">{order.date}</td>
                    <td className="px-4 py-2 text-sm">{order.items}</td>
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
                            : order.status === 'Shipped'
                            ? 'bg-yellow-900 text-yellow-300'
                            : 'bg-red-900 text-red-300'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <Link href={`/admin/orders/${order.id}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 border-gray-600 text-purple-400 hover:text-purple-300 hover:bg-gray-700"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {startIndex + 1}-
                {Math.min(startIndex + itemsPerPage, filteredOrders.length)} of{' '}
                {filteredOrders.length} orders
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
