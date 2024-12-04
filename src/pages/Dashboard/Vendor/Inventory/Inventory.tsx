/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@/components/shared/Avatar";
import { DeleteProduct } from "@/components/shared/modal/DeleteProduct";
import Pagination from "@/components/shared/Pagination";
import { SkeletonLoading } from "@/components/shared/Skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/redux/api/features/productApi";
import { useGetShopByUserIdQuery } from "@/redux/api/features/shopApi";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/product.type";
import { FilePenLine } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const TABLE_HEAD = [
  "S/N",
  "Entry Date",
  "Name",
  "Price",
  "Stock",
  "Category",
  "Action",
];

const Inventory = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser ? currentUser.id : null;
  const { data: shopData } = useGetShopByUserIdQuery(userId);

  const [page, setPage] = useState(1);
  const [updateStock] = useUpdateProductMutation();

  const query = [
    {
      name: "page",
      value: page.toString(),
    },
    {
      name: "filter",
      value: JSON.stringify({
        shopId: shopData?.data?.id,
      }),
    },
  ];

  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetProductsQuery(query);

  const updateStockHandler = async (id: string, stock: string) => {
    try {
      const response = await updateStock({
        id,
        data: {
          inventoryCount: Number(stock),
        },
      }).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            {TABLE_HEAD.map((head, index) => (
              <TableHead key={index}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData?.data?.result.length < 1 ? (
            <span>No product found</span>
          ) : isLoading || isFetching ? (
            <SkeletonLoading />
          ) : (
            productData?.data?.result?.map(
              (
                {
                  id,
                  category: { name: categoryName },
                  createdAt,
                  price,
                  productImage,
                  name,
                  inventoryCount,
                }: IProduct,
                index: number
              ) => (
                <TableRow key={id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {productImage ? (
                        <img
                          src={productImage[0]?.url}
                          alt="user image"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <Avatar />
                      )}
                      <span>{name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{price}</TableCell>
                  <TableCell>
                    <Input
                      onBlur={(e) => updateStockHandler(id, e.target.value)}
                      type="number"
                      defaultValue={inventoryCount}
                      className="w-20"
                    />
                  </TableCell>

                  <TableCell>
                    <span>{categoryName}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Link to={`/dashboard/vendor/edit-product/${id}`}>
                        <Button variant={"outline"}>
                          <FilePenLine />
                        </Button>
                      </Link>
                      <DeleteProduct id={id} />
                    </div>
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>

      {productData?.data?.meta?.page > 1 && (
        <div className="flex justify-end py-5">
          <Pagination
            active={page}
            totalPages={productData?.data?.meta?.page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Inventory;
