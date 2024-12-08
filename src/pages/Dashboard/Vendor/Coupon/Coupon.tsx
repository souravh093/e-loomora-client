import { DeleteCoupon } from "@/components/shared/modal/DeleteCoupon";
import { SkeletonLoading } from "@/components/shared/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCouponsQuery } from "@/redux/api/features/coupoonApi";
import CreateCoupon from "./CreateCoupon";

const TABLE_HEAD = ["S/N", "Coupon Code", "Discount", "Action"];

const Coupon = () => {
  const {
    data: couponeData,
    isLoading,
    isFetching,
  } = useGetCouponsQuery(undefined);

  return (
    <div className="w-full">
      <div className="max-w-xl shadow-lg px-2 border my-10">
        <CreateCoupon />
      </div>

      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            {TABLE_HEAD.map((head, index) => (
              <TableHead key={index}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {couponeData?.data?.length < 1 ? (
            <span>No orders found</span>
          ) : isLoading || isFetching ? (
            <SkeletonLoading />
          ) : (
            couponeData?.data?.map(
              (
                {
                  id,
                  code,
                  discount,
                }: { id: string; code: string; discount: number },
                index: number
              ) => (
                <TableRow key={id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{code}</TableCell>
                  <TableCell>{discount}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <DeleteCoupon id={id} />
                    </div>
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Coupon;
