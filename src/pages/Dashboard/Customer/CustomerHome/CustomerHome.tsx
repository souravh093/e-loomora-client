import { useState } from "react";
import { DollarSign, Package, ShoppingCart, Truck } from "lucide-react";
const TABLE_HEAD = [
  "S/N",
  "Order Created",
  "Order ID",
  "Customer Name",
  "Total Amount",
  "Status",
  "Order Details",
];
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  useGetCustomerOrdersCountByDayQuery,
  useGetCustomerOrdersCountByMonthQuery,
  useGetCustomerOrdersStatusQuery,
  useGetOrdersQuery,
} from "@/redux/api/features/orderApi";
import { SkeletonLoading } from "@/components/shared/Skeleton";
import { IOrder } from "@/types/product.type";
import Avatar from "@/components/shared/Avatar";
import { Link } from "react-router";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/api/features/authSlice";

export default function Dashboard() {
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?.id ? currentUser.id : null;
  const query = [
    {
      name: "orderBy",
      value: JSON.stringify({
        createdAt: "desc",
      }),
    },
    {
      name: "filter",
      value: JSON.stringify({
        userId: userId,
      }),
    },
  ];
  const [chartView, setChartView] = useState("weekly");

  const { data: customerOrderStatus } =
    useGetCustomerOrdersStatusQuery(undefined);
  const { data: customerMonthlyOrders } =
    useGetCustomerOrdersCountByMonthQuery(undefined);
  const { data: customerDayWeekOrders } =
    useGetCustomerOrdersCountByDayQuery(undefined);
  const { data: recentOrder, isLoading } = useGetOrdersQuery(query);

  const pieData = [
    {
      name: "Completed",
      value: customerOrderStatus?.data?.completedOrders,
      color: "#16a34a",
    },
    {
      name: "Pending",
      value: customerOrderStatus?.data?.pendingOrders,
      color: "#f59e0b",
    },
    {
      name: "Cancelled",
      value: customerOrderStatus?.data?.cancelOrders,
      color: "#dc2626",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-6 md:gap-8">
          <div className="grid auto-rows-max gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Orders
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {customerOrderStatus?.data?.totalOrders || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Orders
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {customerOrderStatus?.data?.pendingOrders || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Orders
                  </CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {customerOrderStatus?.data?.completedOrders || 0}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    BDT{" "}
                    {customerOrderStatus?.data?.totalAmount?._sum
                      ?.totalAmount || 0}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-5">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Order Analytics</CardTitle>
                    <CardDescription>
                      View your order statistics over time
                    </CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Select
                      defaultValue={chartView}
                      onValueChange={(value) => setChartView(value)}
                    >
                      <SelectTrigger className="h-8 w-[110px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      {chartView === "weekly" ? (
                        <AreaChart
                          data={customerDayWeekOrders?.data}
                          margin={{
                            top: 5,
                            right: 5,
                            left: 5,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="orders"
                            stroke="#8884d8"
                            fill="#8884d8"
                          />
                        </AreaChart>
                      ) : (
                        <BarChart
                          data={customerMonthlyOrders?.data}
                          margin={{
                            top: 5,
                            right: 5,
                            left: 5,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="orders" fill="#8884d8" />
                        </BarChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    You have {recentOrder?.data.length} orders in total
                  </CardDescription>
                </div>
                <Link
                  to="/dashboard/user/orders"
                  className="ml-auto flex items-center gap-2"
                >
                  <Button variant="outline" size="sm" className="h-8">
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader className="bg-gray-100">
                      <TableRow>
                        {TABLE_HEAD.map((head, index) => (
                          <TableHead key={index}>{head}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrder?.data?.length < 1 ? (
                        <span>No orders found</span>
                      ) : isLoading ? (
                        <SkeletonLoading />
                      ) : (
                        recentOrder?.data?.map(
                          (
                            {
                              id,
                              createdAt,
                              totalAmount,
                              status,
                              user,
                            }: IOrder,
                            index: number
                          ) => (
                            <TableRow key={id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>
                                {new Date(createdAt).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{id}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {user?.image ? (
                                    <img
                                      src={user.image}
                                      alt="user image"
                                      className="h-10 w-10 rounded-full object-cover"
                                    />
                                  ) : (
                                    <Avatar />
                                  )}
                                  <span>{user.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{totalAmount}</TableCell>
                              <TableCell>
                                <span
                                  className={`${
                                    status === "PENDING"
                                      ? "bg-yellow-500 px-2 py-1 rounded-md font-bold text-white"
                                      : status === "COMPLETED"
                                      ? "bg-green-500 px-2 py-1 rounded-md font-bold text-white"
                                      : "bg-red-500 px-2 py-1 rounded-md font-bold text-white"
                                  }`}
                                >
                                  {status}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Link
                                  to={`/dashboard/user/orders/details/${id}`}
                                >
                                  <Button variant={"outline"}>
                                    View Details
                                  </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          )
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
