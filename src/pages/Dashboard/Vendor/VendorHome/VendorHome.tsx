import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeekOrderChart } from "@/components/VendorDashboard/WeekOrderChart";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import { useGetCouponsQuery } from "@/redux/api/features/coupoonApi";
import {
  useGetAllInfoQuery,
  useGetOrderCountByWeekQuery,
  useGetOrdersQuery,
} from "@/redux/api/features/orderApi";
import { useGetShopByUserIdQuery } from "@/redux/api/features/shopApi";
import { useAppSelector } from "@/redux/hooks";
import {
  CircleDollarSign,
  PackageSearch,
  SquareChartGantt,
  TicketPercent,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SkeletonLoading } from "@/components/shared/Skeleton";
import { IOrder } from "@/types/product.type";

const TABLE_HEAD = ["Order time", "Customer Name", "Total Price", "OrderItem"];

const VendorHome = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const id = currentUser ? currentUser.id : null;
  const { data: shopData } = useGetShopByUserIdQuery(id);

  const { data: allVendorInfo } = useGetAllInfoQuery(undefined);
  const { data: allOrderInfoByWeek } = useGetOrderCountByWeekQuery(
    shopData?.data?.id
  );
  const { data: allCoupons } = useGetCouponsQuery(undefined);

  const query = [
    {
      name: "filter",
      value: JSON.stringify({
        shopId: shopData?.data?.id,
      }),
    },
    {
      name: "orderBy",
      value: JSON.stringify({
        createdAt: "desc",
      }),
    },
  ];

  const { data: orders, isLoading: orderLoading } = useGetOrdersQuery(query);
  console.log(orders);

  return (
    <div className="w-full">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <SquareChartGantt className="w-16 h-16 text-blue-400" />
              <span className="text-2xl font-bold">
                {allVendorInfo?.data?.ordersCount}
              </span>
              <h3>Total Orders</h3>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <PackageSearch className="w-16 h-16 text-red-400" />
              <span className="text-2xl font-bold">
                {allVendorInfo?.data?.productsCount}
              </span>
              <h3>Total Products</h3>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <CircleDollarSign className="w-16 h-16 text-green-400" />
              <span className="text-2xl font-bold">
                {allVendorInfo?.data?.totalRevenue?._sum?.totalAmount}৳
              </span>
              <h3>Total Revenue</h3>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <TicketPercent className="w-16 h-16 text-fuchsia-400" />
              <span className="text-2xl font-bold">
                {allCoupons?.data?.length}
              </span>
              <h3>Total Coupons</h3>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Order Information
              </CardTitle>
            </CardHeader>
            <CardContent >
              <WeekOrderChart chartData={allOrderInfoByWeek?.data} />
            </CardContent>
          </Card>
        </div>

        <div className="shadow-lg p-6 mt-6 rounded-lg bg-white border border-gray-200">
          <h2 className="text-xl font-semibold mb-3">Recent Order</h2>
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                {TABLE_HEAD.map((head, index) => (
                  <TableHead key={index}>{head}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.data?.length < 1 ? (
                <span>No orders user found</span>
              ) : orderLoading ? (
                <SkeletonLoading />
              ) : (
                orders?.data?.slice(0, 9).map((order: IOrder) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{order.user.name}</TableCell>
                    <TableCell>{order.totalAmount} BDT</TableCell>
                    <TableCell>{order.orderItem.length}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default VendorHome;
