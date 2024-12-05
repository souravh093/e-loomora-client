import ProductCard from "@/components/shared/ProductCard";
import { useGetProductsQuery } from "@/redux/api/features/productApi";
import { IProduct } from "@/types/product.type";

const CategoryProduct = ({
  id,
  categoryId,
}: {
  id: string | undefined;
  categoryId: string | undefined;
}) => {
  const query = [
    {
      name: "filter",
      value: JSON.stringify({ categoryId: categoryId }),
    },
  ];

  const { data: products, isLoading } = useGetProductsQuery(query);

  const productsData =
    products?.data?.result.filter((product: IProduct) => product.id !== id) ||
    [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
      {isLoading && <p>Loading...</p>}
      {productsData.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CategoryProduct;
