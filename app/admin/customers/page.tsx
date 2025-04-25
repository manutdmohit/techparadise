'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  UserPlus,
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

// Mock customers data
const mockCustomers = [
  {
    id: 'CUST-1001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    totalSpent: 4599.97,
    orders: 3,
    lastOrder: '2023-04-12',
  },
  {
    id: 'CUST-1002',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    totalSpent: 1899.0,
    orders: 1,
    lastOrder: '2023-04-12',
  },
  {
    id: 'CUST-1003',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Los Angeles, CA',
    totalSpent: 6599.98,
    orders: 2,
    lastOrder: '2023-04-11',
  },
  {
    id: 'CUST-1004',
    name: 'Emily Brown',
    email: 'emily.brown@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Chicago, IL',
    totalSpent: 8796.0,
    orders: 4,
    lastOrder: '2023-04-11',
  },
  {
    id: 'CUST-1005',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    phone: '+1 (555) 567-8901',
    location: 'Austin, TX',
    totalSpent: 3199.98,
    orders: 2,
    lastOrder: '2023-04-10',
  },
  {
    id: 'CUST-1006',
    name: 'Jessica Taylor',
    email: 'jessica.t@example.com',
    phone: '+1 (555) 678-9012',
    location: 'Seattle, WA',
    totalSpent: 2899.0,
    orders: 1,
    lastOrder: '2023-04-10',
  },
  {
    id: 'CUST-1007',
    name: 'Robert Martinez',
    email: 'robert.m@example.com',
    phone: '+1 (555) 789-0123',
    location: 'Miami, FL',
    totalSpent: 1799.99,
    orders: 1,
    lastOrder: '2023-04-09',
  },
  {
    id: 'CUST-1008',
    name: 'Jennifer Anderson',
    email: 'jennifer.a@example.com',
    phone: '+1 (555) 890-1234',
    location: 'Denver, CO',
    totalSpent: 6998.0,
    orders: 2,
    lastOrder: '2023-04-09',
  },
  {
    id: 'CUST-1009',
    name: 'Christopher Thomas',
    email: 'chris.t@example.com',
    phone: '+1 (555) 901-2345',
    location: 'Portland, OR',
    totalSpent: 6299.97,
    orders: 3,
    lastOrder: '2023-04-08',
  },
  {
    id: 'CUST-1010',
    name: 'Lisa Jackson',
    email: 'lisa.j@example.com',
    phone: '+1 (555) 012-3456',
    location: 'Boston, MA',
    totalSpent: 1899.0,
    orders: 1,
    lastOrder: '2023-04-08',
  },
];

export default function CustomersManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Filter customers based on search term
  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSendEmail = (email: string) => {
    toast.success(`Preparing to send email to ${email}.`, {
      description: 'Preparing to send email to ' + email,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Customers
        </h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <Card className="bg-gray-800 text-white border-gray-700">
        <CardHeader>
          <CardTitle>Customer Management</CardTitle>
          <CardDescription className="text-gray-400">
            View and manage your customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search customers by name, email, or location..."
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
                    Customer
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Location
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Orders
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Total Spent
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Last Order
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="px-4 py-2 text-sm">
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-xs text-gray-400">
                          {customer.email}
                        </div>
                        <div className="text-xs text-gray-400">
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-sm">{customer.location}</td>
                    <td className="px-4 py-2 text-sm">{customer.orders}</td>
                    <td className="px-4 py-2 text-sm">
                      ${customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-sm">{customer.lastOrder}</td>
                    <td className="px-4 py-2 text-sm">
                      <div className="flex space-x-2">
                        <Link href={`/admin/customers/${customer.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 border-gray-600 text-purple-400 hover:text-purple-300 hover:bg-gray-700"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 border-gray-600 text-blue-400 hover:text-blue-300 hover:bg-gray-700"
                          onClick={() => handleSendEmail(customer.email)}
                        >
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Email</span>
                        </Button>
                      </div>
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
                {Math.min(startIndex + itemsPerPage, filteredCustomers.length)}{' '}
                of {filteredCustomers.length} customers
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
