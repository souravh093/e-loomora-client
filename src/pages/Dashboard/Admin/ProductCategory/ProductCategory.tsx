import Avatar from "@/components/shared/Avatar";
import CreateCategory from "@/components/shared/modal/CreateCategory";
import { DeleteCategory } from "@/components/shared/modal/DeleteCategory";
import EditCategory from "@/components/shared/modal/EditCategory";
import { SkeletonLoading } from "@/components/shared/Skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetCategoriesQuery,
} from "@/redux/api/features/categoryApi";

const TABLE_HEAD = ["S/N", "Logo", "Category Name", "Action"];

const ProductCategory = () => {

  const {
    data: categoriesData,
    isLoading,
    isFetching,
  } = useGetCategoriesQuery(undefined)

  return (
    <div className="w-full">
      <div className="flex items-center justify-end my-3">
        <CreateCategory />
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
          {categoriesData?.data?.length < 1 ? (
            <span>No categories found</span>
          ) : isLoading || isFetching ? (
            <SkeletonLoading />
          ) : (
            categoriesData?.data?.map(
              (
                {
                  id,
                  logo,
                  name,
                }: {
                  id: string;
                  logo: string;
                  name: string;
                },
                index: number
              ) => (
                <TableRow key={id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {logo ? (
                        <img
                          src={logo}
                          alt="user image"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <Avatar />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{name}</TableCell>

                  <TableCell className="flex items-center gap-3">
                    <EditCategory id={id} />
                    <DeleteCategory id={id} />
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

export default ProductCategory;
