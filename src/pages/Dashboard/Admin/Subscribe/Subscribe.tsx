import DeleteSubscription from "@/components/shared/modal/DeleteSubscription";
import { SkeletonLoading } from "@/components/shared/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSubscriptionsQuery } from "@/redux/api/features/subscriptionApi";

const TABLE_HEAD = ["S/N", "Subscribe time", "Email", "Action"];

const Subscribe = () => {
  const {
    data: subscribedUsers,
    isLoading,
    isFetching,
  } = useGetSubscriptionsQuery(undefined);
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
          {subscribedUsers?.data?.length < 1 ? (
            <span>No subscribed user found</span>
          ) : isLoading || isFetching ? (
            <SkeletonLoading />
          ) : (
            subscribedUsers?.data?.map(
              (
                user: { id: string; email: string; createdAt: string },
                index: number
              ) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <DeleteSubscription id={user.id} />
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

export default Subscribe;
