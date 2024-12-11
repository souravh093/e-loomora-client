import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeekOrderChart } from "@/components/VendorDashboard/WeekOrderChart";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import {
  useGetAllInfoQuery,
  useGetOrderCountByWeekQuery,
} from "@/redux/api/features/orderApi";
import { useGetShopByUserIdQuery } from "@/redux/api/features/shopApi";
import { useAppSelector } from "@/redux/hooks";

const VendorHome = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const id = currentUser ? currentUser.id : null;
  const { data: shopData } = useGetShopByUserIdQuery(id);

  const { data: allVendorInfo } = useGetAllInfoQuery(undefined);
  const { data: allOrderInfoByWeek } = useGetOrderCountByWeekQuery(
    shopData?.data?.id
  );

  return (
    <div className="w-full">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <div className="text-4xl font-black">Total Orders</div>
              <div className="text-6xl font-bold">
                {allVendorInfo?.data?.ordersCount}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <div className="text-4xl font-black">Total Products</div>
              <div className="text-6xl font-bold">
                {allVendorInfo?.data?.productsCount}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <div className="text-4xl font-black">Total Revenue</div>
              <div className="text-6xl font-bold">
                {allVendorInfo?.data?.totalRevenue?._sum?.totalAmount}৳
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <div className="p-6 space-y-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Order Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <WeekOrderChart chartData={allOrderInfoByWeek?.data} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorHome;
