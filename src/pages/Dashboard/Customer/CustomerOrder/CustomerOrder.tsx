/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@/components/shared/Avatar";
import Pagination from "@/components/shared/Pagination";
import { SkeletonLoading } from "@/components/shared/Skeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import { useGetOrdersQuery } from "@/redux/api/features/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { IOrder } from "@/types/product.type";
import { useState } from "react";
import { Link } from "react-router";

const TABLE_HEAD = [
  "S/N",
  "Order Created",
  "Order ID",
  "Customer Name",
  "Total Amount",
  "Status",
  "Order Details",
];

const CustomerOrder = () => {
  const [page, setPage] = useState(1);
  const currentUser = useAppSelector(selectCurrentUser);
  const id = currentUser ? currentUser.id : null;

  const query = [
    {
      name: "filter",
      value: JSON.stringify({
        userId: id,
      }),
    },
    {
      name: "page",
      value: page.toString(),
    },
  ];

  const { data: orderData, isLoading, isFetching } = useGetOrdersQuery(query);

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
          {orderData?.data?.length < 1 ? (
            <span>No orders found</span>
          ) : isLoading || isFetching ? (
            <SkeletonLoading />
          ) : (
            orderData?.data?.map(
              (
                { id, createdAt, totalAmount, status, user }: IOrder,
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
                    <Link to={`/dashboard/user/orders/details/${id}`}>
                      <Button variant={"outline"}>View Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>

      {orderData?.meta?.page > 1 && (
        <div className="flex justify-end py-5">
          <Pagination
            active={page}
            totalPages={orderData?.meta?.page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default CustomerOrder;
