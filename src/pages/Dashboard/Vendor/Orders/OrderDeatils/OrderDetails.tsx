import { format } from 'date-fns'
import { CalendarIcon, MapPinIcon, PhoneIcon, ShoppingBagIcon, UserIcon } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// This would typically come from your API or database
const orderData = {
  "id": "472efc97-c51f-4058-be31-1f042f92fca8",
  "userId": "ae801892-473a-4006-a1c1-bd93f84fc345",
  "shopId": "9bf3063f-ab7a-4f3c-8e79-28882d958e1c",
  "totalAmount": 100,
  "status": "COMPLETED",
  "createdAt": "2024-12-04T10:59:24.209Z",
  "updatedAt": "2024-12-04T10:59:54.863Z",
  "orderItem": [
    {
      "id": "d5d4bd2a-98e4-4499-b3ac-b40a49b651a2",
      "orderId": "472efc97-c51f-4058-be31-1f042f92fca8",
      "productId": "9104d460-07c9-4cf8-9232-7c81cae5027a",
      "quantity": 2,
      "price": 50
    }
  ],
  "user": {
    "id": "ae801892-473a-4006-a1c1-bd93f84fc345",
    "name": "sozuwoh",
    "email": "user@gmail.com",
    "image": "https://firebasestorage.googleapis.com/v0/b/bike-booker-f4a7f.appspot.com/o/images%2Fkarsten-winegeart-x9Kh98kFxiM-unsplash.jpg?alt=media&token=aec0a2b2-5e7e-4fed-bb35-e3f8a9cfca41",
    "role": "USER",
    "status": "ACTIVE",
  },
  "shop": {
    "id": "9bf3063f-ab7a-4f3c-8e79-28882d958e1c",
    "name": "Vendor Shop",
    "logoUrl": "https://firebasestorage.googleapis.com/v0/b/bike-booker-f4a7f.appspot.com/o/images%2FWhatsApp%20Image%202024-10-31%20at%2000.55.41_28776cd1.jpg?alt=media&token=3c852420-f6a3-42fb-9d1b-ff8e3c70c2b3",
    "description": "This is my new Vendor Shop",
    "status": "ACTIVE",
  },
  "shippingAddress": {
    "id": "59941a54-98ec-42d3-bf08-5b982cd75ea1",
    "userId": "ae801892-473a-4006-a1c1-bd93f84fc345",
    "orderId": "472efc97-c51f-4058-be31-1f042f92fca8",
    "address": "123 Main St",
    "phone": "123-456-7890",
    "city": "Anytown",
    "state": "Anystate",
    "country": "USA",
    "zip": "12345",
    "createdAt": "2024-12-04T10:59:24.209Z"
  }
}

export default function OrderDetailsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
            <CardDescription>Details about the order and its current status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ShoppingBagIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Order ID:</span>
                <span>{orderData.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Order Date:</span>
                <span>{format(new Date(orderData.createdAt), 'PPP')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={orderData.status === 'COMPLETED' ? 'secondary' : 'default'}>
                  {orderData.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Details about the customer who placed the order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Name:</span>
                <span>{orderData.user.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Address:</span>
                <span>{`${orderData.shippingAddress.address}, ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state}, ${orderData.shippingAddress.country} ${orderData.shippingAddress.zip}`}</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Phone:</span>
                <span>{orderData.shippingAddress.phone}</span>
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
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderData.orderItem.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.productId}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-right">
              <span className="font-bold">Total Amount: ${orderData.totalAmount.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-6 flex justify-end">
        <Button>Back to Orders</Button>
      </div>
    </div>
  )
}

