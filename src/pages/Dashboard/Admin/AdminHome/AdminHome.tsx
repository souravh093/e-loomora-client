import { Card, CardContent } from "@/components/ui/card";
import { useGetCategoriesQuery } from "@/redux/api/features/categoryApi";
import { useGetProductsQuery } from "@/redux/api/features/productApi";
import { useGetUsersQuery } from "@/redux/api/features/userApi";

const AdminHome = () => {
  const {data: products} = useGetProductsQuery(undefined);
  const {data: users} = useGetUsersQuery(undefined);
  const {data: categories} = useGetCategoriesQuery(undefined);

  return (
    <div className="w-full">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <div className="text-4xl font-black">Total Products</div>
              <div className="text-6xl font-bold">
                {products?.data?.meta?.total}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <div className="text-4xl font-black">Total Users</div>
              <div className="text-6xl font-bold">
                {users?.data?.meta?.total}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <div className="text-3xl font-black">Total Categories</div>
              <div className="text-6xl font-bold">
                {categories?.data?.length}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
