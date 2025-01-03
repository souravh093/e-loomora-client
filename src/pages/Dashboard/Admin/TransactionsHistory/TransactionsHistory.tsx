import { SkeletonLoading } from "@/components/shared/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTransactionsQuery } from "@/redux/api/features/paymentApi";

const TABLE_HEAD = [
  "S/N",
  "Payment Date",
  "Method",
  "Amount",
  "Status",
  "Transaction ID",
];

const TransactionsHistory = () => {
  const {
    data: paymentData,
    isLoading,
    isFetching,
  } = useGetTransactionsQuery(undefined);

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
          {paymentData?.data?.length < 1 ? (
            <span>No Users found</span>
          ) : isLoading || isFetching ? (
            <SkeletonLoading />
          ) : (
            paymentData?.data?.map(
              (
                {
                  transactionId,
                  method,
                  amount,
                  status,
                  createdAt,
                  id,
                }: {
                  transactionId: string;
                  method: string;
                  amount: number;
                  status: string;
                  createdAt: string;
                  id: string;
                },
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
                  <TableCell>{method}</TableCell>
                  <TableCell>{amount}</TableCell>
                  <TableCell>
                    <span
                      className={`${
                        status === "COMPLETED"
                          ? "bg-green-400 px-3 py-1 rounded-md text-white"
                          : status === "FAILED"
                          ? "bg-red-400 px-3 py-1 rounded-md text-white"
                          : "bg-yellow-400 px-3 py-1 rounded-md text-white"
                      }`}
                    >
                      {status}
                    </span>
                  </TableCell>
                  <TableCell>{transactionId}</TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsHistory;
