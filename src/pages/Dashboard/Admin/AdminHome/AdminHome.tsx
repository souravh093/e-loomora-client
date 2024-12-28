import { Card, CardContent } from "@/components/ui/card";
import { useGetCategoriesQuery } from "@/redux/api/features/categoryApi";
import { useGetProductsQuery } from "@/redux/api/features/productApi";
import { useGetShopsQuery } from "@/redux/api/features/shopApi";
import { useGetUsersQuery } from "@/redux/api/features/userApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartBarStacked, PackageSearch, Store, Users } from "lucide-react";
import { SkeletonLoading } from "@/components/shared/Skeleton";
import { IProduct } from "@/types/product.type";

const TABLE_HEAD_USER = ["Name", "Join Time", "Email", "Role"];
const TABLE_HEAD_PRODUCTS = ["Title", "Price", "Category"];

const AdminHome = () => {
  const { data: products } = useGetProductsQuery(undefined);
  const { data: users, isLoading: userLoading } = useGetUsersQuery(undefined);
  const { data: categories } = useGetCategoriesQuery(undefined);
  const { data: shops } = useGetShopsQuery(undefined);

  console.log(users);

  return (
    <div className="w-full">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <PackageSearch className="w-16 h-16 text-blue-400" />
              <span className="text-2xl font-bold">
                {products?.data?.meta?.total}
              </span>
              <h3>Total Products</h3>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <Users className="w-16 h-16 text-red-400" />
              <span className="text-2xl font-bold">
                {users?.data?.meta?.total}
              </span>
              <h3>Total Users</h3>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <ChartBarStacked className="w-16 h-16 text-yellow-400" />
              <span className="text-2xl font-bold">
                {categories?.data?.length}
              </span>
              <h3>Total Categories</h3>
            </CardContent>
          </Card>
          <Card className="bg-white text-gray-800 shadow-lg">
            <CardContent className="flex flex-col items-center justify-center h-44">
              <Store className="w-16 h-16 text-orange-400" />
              <span className="text-2xl font-bold">{shops?.data?.length}</span>
              <h3>Total Shops</h3>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
        <div className="shadow-lg p-6 rounded-lg bg-white border border-gray-200">
          <h2 className="text-xl font-semibold mb-3">Recent Users</h2>
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                {TABLE_HEAD_USER.map((head, index) => (
                  <TableHead key={index}>{head}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.data?.result?.length < 1 ? (
                <span>No users user found</span>
              ) : userLoading ? (
                <SkeletonLoading />
              ) : (
                users?.data?.result
                  ?.slice(0, 9)
                  .map(
                    (user: {
                      id: string;
                      email: string;
                      createdAt: string;
                      role: string;
                      image: string;
                      name: string;
                    }) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <span className="flex gap-2 items-center">
                            <img
                              src={user.image}
                              alt="avatar"
                              className="w-6 h-6 rounded-full"
                            />
                            <h2>{user.name}</h2>
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className="bg-blue-300 px-2 py-1 rounded-xl text-white">
                            {user.role}
                          </span>
                        </TableCell>
                      </TableRow>
                    )
                  )
              )}
            </TableBody>
          </Table>
        </div>

        <div className="shadow-lg p-6 rounded-lg bg-white border border-gray-200">
          <h2 className="text-xl font-semibold mb-3">Recent Products</h2>
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                {TABLE_HEAD_PRODUCTS.map((head, index) => (
                  <TableHead key={index}>{head}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.data?.result?.length < 1 ? (
                <span>No products user found</span>
              ) : userLoading ? (
                <SkeletonLoading />
              ) : (
                products?.data?.result?.slice(0, 9).map((product: IProduct) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <span className="flex gap-2 items-center">
                        <img
                          src={
                            product.productImage?.[0]?.url ||
                            "default-image-url"
                          }
                          alt="avatar"
                          className="w-6 h-6 rounded-full"
                        />
                        <h2>{product.name}</h2>
                      </span>
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
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

export default AdminHome;
