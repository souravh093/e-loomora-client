/* eslint-disable @typescript-eslint/no-explicit-any */
import Avatar from "@/components/shared/Avatar";
import { ReviewModal } from "@/components/shared/modal/ReviewModal";
import { SkeletonLoading } from "@/components/shared/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import { useGetReviewsQuery } from "@/redux/api/features/reviewApi";
import { useGetShopByUserIdQuery } from "@/redux/api/features/shopApi";
import { useAppSelector } from "@/redux/hooks";
import { IReview } from "@/types/product.type";

const TABLE_HEAD = [
  "S/N",
  "Reviewer Name",
  "Rating",
  "Review Product",
  "Product Category",
  "View Review",
];

const CustomerReview = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const id = currentUser ? currentUser.id : null;
  const { data: shopData } = useGetShopByUserIdQuery(id);

  const {
    data: reviewData,
    isLoading,
    isFetching,
  } = useGetReviewsQuery(shopData?.data?.id);

  console.log(reviewData);

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
          {reviewData?.data?.length < 1 ? (
            <span>No reviews found</span>
          ) : isLoading || isFetching ? (
            <SkeletonLoading />
          ) : (
            reviewData?.data?.map(
              (
                { id, content, rating, user, product }: IReview,
                index: number
              ) => (
                <TableRow key={id}>
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
                  <TableCell>{rating}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell>
                    <ReviewModal content={content} />
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

export default CustomerReview;
