/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@/components/shared/Avatar";
import { DeleteUser } from "@/components/shared/modal/DeleteUser";
import Pagination from "@/components/shared/Pagination";
import { SkeletonLoading } from "@/components/shared/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  useGetUsersQuery,
  useUpdateUsersMutation,
} from "@/redux/api/features/userApi";
import { TUser } from "@/types/user.type";
import { useState } from "react";

const TABLE_HEAD = [
  "S/N",
  "Register Date",
  "Shop Name",
  "User Name",
  "Shop Status",
  "User Status",
];

const VendorShop = () => {
  const [page, setPage] = useState(1);
  const [updateStatus] = useUpdateUsersMutation();

  const query = [
    {
      name: "page",
      value: page.toString(),
    },
  ];

  const { data: usersData, isLoading, isFetching } = useGetUsersQuery(query);

  const handleStatus = async (status: string, id: string) => {
    try {
      const response = await updateStatus({
        id,
        data: {
          status,
        },
      }).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });
      }
    } catch (error: any) {
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
          {usersData?.data?.result.length < 1 ? (
            <span>No Users found</span>
          ) : isLoading || isFetching ? (
            <SkeletonLoading />
          ) : (
            usersData?.data?.result?.map((user: TUser, index: number) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
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
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className="bg-[#D6FFD2] text-[#069803] text-sm rounded-[40px] py-[4px] px-[10px] hover:bg-[#cdfac9]">
                    {user.role}
                  </span>
                </TableCell>

                <TableCell>
                  <select
                    onChange={(event) =>
                      handleStatus(event.target.value, user.id)
                    }
                    defaultValue={user.status}
                    className="outline-none px-2 py-[2px] ring-1 ring-gray-400 rounded-md"
                  >
                    <option value={"SUSPENDED"}>SUSPENDED</option>
                    <option value={"ACTIVE"}>ACTIVE</option>
                  </select>
                </TableCell>
                <TableCell>
                  <DeleteUser id={user.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {usersData?.data?.meta?.page > 1 && (
        <div className="flex justify-end py-5">
          <Pagination
            active={page}
            totalPages={usersData?.data?.meta?.page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default VendorShop;
