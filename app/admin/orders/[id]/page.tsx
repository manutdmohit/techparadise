// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import {
//   ArrowLeft,
//   Printer,
//   Mail,
//   Package,
//   Truck,
//   CheckCircle,
//   XCircle,
// } from 'lucide-react';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';

// // // Mock order details
// const getOrderDetails = (id: string) => {
//   return {
//     id,
//     customer: {
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//       phone: '+1 (555) 123-4567',
//       address: {
//         street: '123 Main St',
//         city: 'San Francisco',
//         state: 'CA',
//         zip: '94105',
//         country: 'United States',
//       },
//     },
//     date: 'April 12, 2023',
//     status: 'Processing',
//     paymentMethod: 'Credit Card (Visa ending in 4242)',
//     shippingMethod: 'Express Shipping',
//     items: [
//       {
//         id: 1,
//         name: 'Quantum Apex',
//         image: '/placeholder.svg?height=80&width=80',
//         price: 2499.99,
//         quantity: 1,
//       },
//       {
//         id: 5,
//         name: '32GB DDR5 RAM Upgrade',
//         image: '/placeholder.svg?height=80&width=80',
//         price: 199.99,
//         quantity: 1,
//       },
//       {
//         id: 8,
//         name: '3-Year Extended Warranty',
//         image: '/placeholder.svg?height=80&width=80',
//         price: 299.99,
//         quantity: 1,
//       },
//     ],
//     subtotal: 2999.97,
//     shipping: 49.99,
//     tax: 245.0,
//     total: 3294.96,
//     notes: 'Please leave package at the front door.',
//   };
// };

// // export default function OrderDetail(params: { id: string }) {
// //   const [order, setOrder] = useState<any>(null);
// //   const [status, setStatus] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);

// //   useEffect(() => {
// //     // In a real app, this would be an API call
// //     const orderDetails = getOrderDetails(params.id);
// //     setOrder(orderDetails);
// //     setStatus(orderDetails.status);
// //   }, [params.id]);

// //   const handleStatusChange = async (newStatus: string) => {
// //     setIsLoading(true);

// //     try {
// //       // In a real app, this would be an API call
// //       await new Promise((resolve) => setTimeout(resolve, 1000));

// //       setStatus(newStatus);
// //       toast.success(`Order status has been updated to ${newStatus}.`);
// //     } catch (error) {
// //       toast.error('An error occurred. Please try again.', {});
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handlePrintOrder = () => {
// //     window.print();
// //   };

// //   const handleSendEmail = () => {
// //     toast.success('Order confirmation email has been sent to the customer.');
// //   };

// //   if (!order) {
// //     return (
// //       <div className="flex h-full items-center justify-center">
// //         <div className="text-center">
// //           <div className="text-2xl font-bold text-white">
// //             Loading order details...
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
// //         <div className="flex items-center gap-2">
// //           <Link href="/admin/orders">
// //             <Button
// //               variant="outline"
// //               size="sm"
// //               className="h-8 w-8 p-0 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
// //             >
// //               <ArrowLeft className="h-4 w-4" />
// //               <span className="sr-only">Back</span>
// //             </Button>
// //           </Link>
// //           <h1 className="text-3xl font-bold tracking-tight text-white">
// //             Order {order.id}
// //           </h1>
// //         </div>
// //         <div className="flex flex-wrap gap-2">
// //           <Button
// //             variant="outline"
// //             onClick={handlePrintOrder}
// //             className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
// //           >
// //             <Printer className="mr-2 h-4 w-4" />
// //             Print
// //           </Button>
// //           <Button
// //             variant="outline"
// //             onClick={handleSendEmail}
// //             className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
// //           >
// //             <Mail className="mr-2 h-4 w-4" />
// //             Email Customer
// //           </Button>
// //         </div>
// //       </div>

// //       <div className="grid gap-6 md:grid-cols-3">
// //         {/* Order Summary */}
// //         <Card className="md:col-span-2 bg-gray-800 text-white border-gray-700">
// //           <CardHeader>
// //             <CardTitle>Order Summary</CardTitle>
// //             <CardDescription className="text-gray-400">
// //               Order details and line items
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent className="space-y-6">
// //             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
// //               <div>
// //                 <div className="text-sm text-gray-400">Order Date</div>
// //                 <div>{order.date}</div>
// //               </div>
// //               <div>
// //                 <div className="text-sm text-gray-400">Payment Method</div>
// //                 <div>{order.paymentMethod}</div>
// //               </div>
// //               <div>
// //                 <div className="text-sm text-gray-400">Shipping Method</div>
// //                 <div>{order.shippingMethod}</div>
// //               </div>
// //             </div>

// //             <div className="space-y-4">
// //               <h3 className="font-medium">Items</h3>
// //               <div className="space-y-4">
// //                 {order.items.map((item: any) => (
// //                   <div
// //                     key={item.id}
// //                     className="flex items-start gap-4 rounded bg-gray-700 p-4"
// //                   >
// //                     <img
// //                       src={item.image || '/placeholder.svg'}
// //                       alt={item.name}
// //                       className="h-20 w-20 rounded object-cover"
// //                     />
// //                     <div className="flex-1">
// //                       <div className="font-medium">{item.name}</div>
// //                       <div className="mt-1 text-sm text-gray-400">
// //                         Quantity: {item.quantity} × $
// //                         {item.price.toLocaleString()}
// //                       </div>
// //                     </div>
// //                     <div className="text-right">
// //                       <div className="font-medium">
// //                         ${(item.price * item.quantity).toLocaleString()}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //             <div className="space-y-2 rounded bg-gray-700 p-4">
// //               <div className="flex justify-between">
// //                 <div className="text-gray-400">Subtotal</div>
// //                 <div>${order.subtotal.toLocaleString()}</div>
// //               </div>
// //               <div className="flex justify-between">
// //                 <div className="text-gray-400">Shipping</div>
// //                 <div>${order.shipping.toLocaleString()}</div>
// //               </div>
// //               <div className="flex justify-between">
// //                 <div className="text-gray-400">Tax</div>
// //                 <div>${order.tax.toLocaleString()}</div>
// //               </div>
// //               <div className="flex justify-between border-t border-gray-600 pt-2">
// //                 <div className="font-medium">Total</div>
// //                 <div className="font-medium">
// //                   ${order.total.toLocaleString()}
// //                 </div>
// //               </div>
// //             </div>

// //             {order.notes && (
// //               <div className="space-y-2">
// //                 <h3 className="font-medium">Order Notes</h3>
// //                 <div className="rounded bg-gray-700 p-4 text-sm">
// //                   {order.notes}
// //                 </div>
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>

// //         {/* Customer & Status */}
// //         <div className="space-y-6">
// //           <Card className="bg-gray-800 text-white border-gray-700">
// //             <CardHeader>
// //               <CardTitle>Customer</CardTitle>
// //               <CardDescription className="text-gray-400">
// //                 Customer information
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent className="space-y-4">
// //               <div>
// //                 <div className="font-medium">{order.customer.name}</div>
// //                 <div className="text-sm text-gray-400">
// //                   {order.customer.email}
// //                 </div>
// //                 <div className="text-sm text-gray-400">
// //                   {order.customer.phone}
// //                 </div>
// //               </div>

// //               <div>
// //                 <div className="text-sm font-medium text-gray-400">
// //                   Shipping Address
// //                 </div>
// //                 <div className="text-sm">
// //                   {order.customer.address.street}
// //                   <br />
// //                   {order.customer.address.city}, {order.customer.address.state}{' '}
// //                   {order.customer.address.zip}
// //                   <br />
// //                   {order.customer.address.country}
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card className="bg-gray-800 text-white border-gray-700">
// //             <CardHeader>
// //               <CardTitle>Order Status</CardTitle>
// //               <CardDescription className="text-gray-400">
// //                 Update order status
// //               </CardDescription>
// //             </CardHeader>
// //             <CardContent className="space-y-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="status">Current Status</Label>
// //                 <Select
// //                   value={status}
// //                   onValueChange={handleStatusChange}
// //                   disabled={isLoading}
// //                 >
// //                   <SelectTrigger
// //                     id="status"
// //                     className="bg-gray-700 border-gray-600 text-white"
// //                   >
// //                     <SelectValue placeholder="Select status" />
// //                   </SelectTrigger>
// //                   <SelectContent className="bg-gray-700 border-gray-600 text-white">
// //                     <SelectItem value="Processing">Processing</SelectItem>
// //                     <SelectItem value="Shipped">Shipped</SelectItem>
// //                     <SelectItem value="Completed">Completed</SelectItem>
// //                     <SelectItem value="Cancelled">Cancelled</SelectItem>
// //                     <SelectItem value="Refunded">Refunded</SelectItem>
// //                   </SelectContent>
// //                 </Select>
// //               </div>

// //               <div className="space-y-2">
// //                 <div className="text-sm font-medium text-gray-400">
// //                   Status Timeline
// //                 </div>
// //                 <div className="space-y-2">
// //                   <div className="flex items-center gap-2 text-sm">
// //                     <CheckCircle className="h-4 w-4 text-green-400" />
// //                     <div className="flex-1">Order Placed</div>
// //                     <div className="text-gray-400">
// //                       April 12, 2023 - 10:23 AM
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2 text-sm">
// //                     <CheckCircle className="h-4 w-4 text-green-400" />
// //                     <div className="flex-1">Payment Confirmed</div>
// //                     <div className="text-gray-400">
// //                       April 12, 2023 - 10:25 AM
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2 text-sm">
// //                     {status === 'Processing' ||
// //                     status === 'Shipped' ||
// //                     status === 'Completed' ? (
// //                       <CheckCircle className="h-4 w-4 text-green-400" />
// //                     ) : (
// //                       <XCircle className="h-4 w-4 text-red-400" />
// //                     )}
// //                     <div className="flex-1">Processing</div>
// //                     <div className="text-gray-400">
// //                       April 12, 2023 - 11:42 AM
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2 text-sm">
// //                     {status === 'Shipped' || status === 'Completed' ? (
// //                       <CheckCircle className="h-4 w-4 text-green-400" />
// //                     ) : (
// //                       <Package className="h-4 w-4 text-gray-400" />
// //                     )}
// //                     <div className="flex-1">Shipped</div>
// //                     <div className="text-gray-400">
// //                       {status === 'Shipped' || status === 'Completed'
// //                         ? 'April 13, 2023 - 2:15 PM'
// //                         : 'Pending'}
// //                     </div>
// //                   </div>
// //                   <div className="flex items-center gap-2 text-sm">
// //                     {status === 'Completed' ? (
// //                       <CheckCircle className="h-4 w-4 text-green-400" />
// //                     ) : (
// //                       <Truck className="h-4 w-4 text-gray-400" />
// //                     )}
// //                     <div className="flex-1">Delivered</div>
// //                     <div className="text-gray-400">
// //                       {status === 'Completed'
// //                         ? 'April 15, 2023 - 10:30 AM'
// //                         : 'Pending'}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// export default function OrderDetails() {
//   const router = useRouter();
//   const params = useParams();
//   const { id } = params;
//   const [order, setOrder] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // In a real app, this would be an API call
//     const orderDetails = getOrderDetails(id);
//     setOrder(orderDetails);
//   }, [id]);

//   if (!order) {
//     return (
//       <div className="flex h-full items-center justify-center">
//         <div className="text-center">
//           <div className="text-2xl font-bold text-white">
//             Loading order details...
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex items-center gap-2">
//           <Link href="/admin/orders">
//             <Button
//               variant="outline"
//               size="sm"
//               className="h-8 w-8 p-0 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               <span className="sr-only">Back</span>
//             </Button>
//           </Link>
//           <h1 className="text-3xl font-bold tracking-tight text-white">
//             Order {order.id}
//           </h1>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           <Button
//             variant="outline"
//             onClick={() => router.push('/admin/orders')}
//             className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             <span className="sr-only">Back</span>
//           </Button>
//           <Button
//             variant="outline"
//             onClick={() => router.push('/admin/orders/print')}
//             className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
//           >
//             <Printer className="mr-2 h-4 w-4" />
//             Print
//           </Button>
//           <Button
//             variant="outline"
//             onClick={() => router.push('/admin/orders/email')}
//             className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
//           >
//             <Mail className="mr-2 h-4 w-4" />
//             Email Customer
//           </Button>
//         </div>
//       </div>

//       {/* Order Summary */}
//       <div className="grid gap-6 md:grid-cols-3">
//         <Card className="md:col-span-2 bg-gray-800 text-white border-gray-700">
//           <CardHeader>
//             <CardTitle>Order Summary</CardTitle>
//             <CardDescription className="text-gray-400">
//               Order details and line items
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <div>
//                 <div className="text-sm text-gray-400">Order Date</div>
//                 <div>{order.date}</div>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-400">Payment Method</div>
//                 <div>{order.paymentMethod}</div>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-400">Shipping Method</div>
//                 <div>{order.shippingMethod}</div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h3 className="font-medium">Items</h3>
//               <div className="space-y-4">
//                 {order.items.map((item: any) => (
//                   <div
//                     key={item.id}
//                     className="flex items-start gap-4 rounded bg-gray-700 p-4"
//                   >
//                     <img
//                       src={item.image || '/placeholder.svg'}
//                       alt={item.name}
//                       className="h-20 w-20 rounded object-cover"
//                     />
//                     <div className="flex-1">
//                       <div className="font-medium">{item.name}</div>
//                       <div className="mt-1 text-sm text-gray-400">
//                         Quantity: {item.quantity} × $
//                         {item.price.toLocaleString()}
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <div className="font-medium">
//                         ${(item.price * item.quantity).toLocaleString()}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="space-y-2 rounded bg-gray-700 p-4">
//               <div className="flex justify-between">
//                 <div className="text-gray-400">Subtotal</div>
//                 <div>${order.subtotal.toLocaleString()}</div>
//               </div>
//               <div className="flex justify-between">
//                 <div className="text-gray-400">Shipping</div>
//                 <div>${order.shipping.toLocaleString()}</div>
//               </div>
//               <div className="flex justify-between">
//                 <div className="text-gray-400">Tax</div>
//                 <div>${order.tax.toLocaleString()}</div>
//               </div>
//               <div className="flex justify-between border-t border-gray-600 pt-2">
//                 <div className="font-medium">Total</div>
//                 <div className="font-medium">
//                   ${order.total.toLocaleString()}
//                 </div>
//               </div>
//             </div>

//             {order.notes && (
//               <div className="space-y-2">
//                 <h3 className="font-medium">Order Notes</h3>
//                 <div className="rounded bg-gray-700 p-4 text-sm">
//                   {order.notes}
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Customer & Status */}
//         <div className="space-y-6">
//           <Card className="bg-gray-800 text-white border-gray-700">
//             <CardHeader>
//               <CardTitle>Customer</CardTitle>
//               <CardDescription className="text-gray-400">
//                 Customer information
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <div className="font-medium">{order.customer.name}</div>
//                 <div className="text-sm text-gray-400">
//                   {order.customer.email}
//                 </div>
//                 <div className="text-sm text-gray-400">
//                   {order.customer.phone}
//                 </div>
//               </div>

//               <div>
//                 <div className="text-sm font-medium text-gray-400">
//                   Shipping Address
//                 </div>
//                 <div className="text-sm">
//                   {order.customer.address.street}
//                   <br />
//                   {order.customer.address.city}, {order.customer.address.state}{' '}
//                   {order.customer.address.zip}
//                   <br />
//                   {order.customer.address.country}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800 text-white border-gray-700">
//             <CardHeader>
//               <CardTitle>Order Status</CardTitle>
//               <CardDescription className="text-gray-400">
//                 Update order status
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="status">Current Status</Label>
//                 <Select
//                   value={status}
//                   onValueChange={handleStatusChange}
//                   disabled={isLoading}
//                 >
//                   <SelectTrigger
//                     id="status"
//                     className="bg-gray-700 border-gray-600 text-white"
//                   >
//                     <SelectValue placeholder="Select status" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-gray-700 border-gray-600 text-white">
//                     <SelectItem value="Processing">Processing</SelectItem>
//                     <SelectItem value="Shipped">Shipped</SelectItem>
//                     <SelectItem value="Completed">Completed</SelectItem>
//                     <SelectItem value="Cancelled">Cancelled</SelectItem>
//                     <SelectItem value="Refunded">Refunded</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <div className="text-sm font-medium text-gray-400">
//                   Status Timeline
//                 </div>
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle className="h-4 w-4 text-green-400" />
//                     <div className="flex-1">Order Placed</div>
//                     <div className="text-gray-400">
//                       April 12, 2023 - 10:23 AM
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <CheckCircle className="h-4 w-4 text-green-400" />
//                     <div className="flex-1">Payment Confirmed</div>
//                     <div className="text-gray-400">
//                       April 12, 2023 - 10:25 AM
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     {status === 'Processing' ||
//                     status === 'Shipped' ||
//                     status === 'Completed' ? (
//                       <CheckCircle className="h-4 w-4 text-green-400" />
//                     ) : (
//                       <XCircle className="h-4 w-4 text-red-400" />
//                     )}
//                     <div className="flex-1">Processing</div>
//                     <div className="text-gray-400">
//                       April 12, 2023 - 11:42 AM
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     {status === 'Shipped' || status === 'Completed' ? (
//                       <CheckCircle className="h-4 w-4 text-green-400" />
//                     ) : (
//                       <Package className="h-4 w-4 text-gray-400" />
//                     )}
//                     <div className="flex-1">Shipped</div>
//                     <div className="text-gray-400">
//                       {status === 'Shipped' || status === 'Completed'
//                         ? 'April 13, 2023 - 2:15 PM'
//                         : 'Pending'}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     {status === 'Completed' ? (
//                       <CheckCircle className="h-4 w-4 text-green-400" />
//                     ) : (
//                       <Truck className="h-4 w-4 text-gray-400" />
//                     )}
//                     <div className="flex-1">Delivered</div>
//                     <div className="text-gray-400">
//                       {status === 'Completed'
//                         ? 'April 15, 2023 - 10:30 AM'
//                         : 'Pending'}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function OrderDetails() {
  return <h1>Order Details</h1>;
}
