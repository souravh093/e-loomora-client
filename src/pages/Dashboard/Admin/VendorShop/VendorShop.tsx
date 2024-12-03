/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@/components/shared/Avatar";
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
import { useGetShopsQuery, useUpdateShopMutation } from "@/redux/api/features/shopApi";
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
  const [updateStatus] = useUpdateShopMutation();

  const query = [
    {
      name: "page",
      value: page.toString(),
    },
  ];

  const { data: shopsData, isLoading, isFetching } = useGetShopsQuery(query);


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
          {shopsData?.data?.length < 1 ? (
            <span>No shop found</span>
          ) : isLoading || isFetching ? (
            <SkeletonLoading />
          ) : (
            shopsData?.data?.map(
              (
                {
                  id,
                  logoUrl,
                  name,
                  status,
                  owner,
                  createdAt,
                }: {
                  owner: TUser;
                  id: string;
                  logoUrl: string;
                  name: string;
                  status: string;
                  createdAt: string;
                },
                index: number
              ) => (
                <TableRow key={id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {new Date(createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt="user image"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <Avatar />
                      )}
                      <span>{name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {owner.image ? (
                        <img
                          src={owner.image}
                          alt="user image"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <Avatar />
                      )}
                      <span>{owner.name}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <select
                      onChange={(event) => handleStatus(event.target.value, id)}
                      defaultValue={status}
                      className="outline-none px-2 py-[2px] ring-1 ring-gray-400 rounded-md"
                    >
                      <option value={"RESTRICTED"}>RESTRICTED</option>
                      <option value={"ACTIVE"}>ACTIVE</option>
                    </select>
                  </TableCell>

                  <TableCell>
                    <span className="bg-[#D6FFD2] text-[#069803] text-sm rounded-[40px] py-[4px] px-[10px] hover:bg-[#cdfac9]">
                      {owner.status}
                    </span>
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>

      {shopsData?.data?.meta?.page > 1 && (
        <div className="flex justify-end py-5">
          <Pagination
            active={page}
            totalPages={shopsData?.data?.meta?.page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default VendorShop;
