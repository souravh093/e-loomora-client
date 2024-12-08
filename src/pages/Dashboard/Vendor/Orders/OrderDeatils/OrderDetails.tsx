import { format } from "date-fns";
import {
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  ShoppingBagIcon,
  UserIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useParams } from "react-router";
import { useGetOrderByIdQuery } from "@/redux/api/features/orderApi";
import { IOrderItem } from "@/types/product.type";


export default function OrderDetailsPage() {
  const { id } = useParams();
  const { data: orderData } = useGetOrderByIdQuery(id);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
            <CardDescription>
              Details about the order and its current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ShoppingBagIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Order ID:</span>
                <span>{orderData?.data?.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Order Date:</span>
                <span>
                  {orderData?.data?.createdAt &&
                    format(new Date(orderData?.data?.createdAt), "PPP")}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant={
                    orderData?.data?.status === "COMPLETED"
                      ? "secondary"
                      : "default"
                  }
                >
                  {orderData?.data?.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>
              Details about the customer who placed the order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Name:</span>
                <span>{orderData?.data?.user?.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Address:</span>
                <span>{`${orderData?.data?.shippingAddress?.address}, ${orderData?.data?.shippingAddress?.city}, ${orderData?.data?.shippingAddress?.state}, ${orderData?.data?.shippingAddress?.country} ${orderData?.data?.shippingAddress?.zip}`}</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Phone:</span>
                <span>{orderData?.data?.shippingAddress?.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>List of items in this order</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderData?.data?.orderItem?.map((item: IOrderItem) => (
                  <TableRow key={item?.id}>
                    <TableCell>{item?.productId}</TableCell>
                    <TableCell>{item?.product?.name}</TableCell>
                    <TableCell>{item?.quantity}</TableCell>
                    <TableCell>${item?.price.toFixed(2)}</TableCell>
                    <TableCell>
                      ${(item.quantity * item.price).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-right">
              <span className="font-bold">
                Total Amount: ${orderData?.data?.totalAmount}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Link to={"/dashboard/vendor/orders"} className="mt-6 flex justify-end">
        <Button>Back to Orders</Button>
      </Link>
    </div>
  );
}
