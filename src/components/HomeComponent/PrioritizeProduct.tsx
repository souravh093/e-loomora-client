import { useGetPrioritizeProductsQuery } from "@/redux/api/features/productApi";
import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { IProduct } from "@/types/product.type";
import ProductCardSkeleton from "../ProductCardSkeleton";

const PrioritizeProduct = () => {
  const { data: products, isLoading } = useGetPrioritizeProductsQuery([
    {
      name: "limit",
      value: 10,
    },
  ]);

  return (
    <div className="my-5">
      <Container>
        <div className="flex justify-between items-center my-3">
          <h1 className="text-gray-700 font-bold text-2xl">
            Prioritize Products
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {isLoading &&
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          {products?.data?.result.length > 0
            ? products?.data?.result?.map((product: IProduct) => (
                <ProductCard key={product.id} product={product} />
              ))
            : !isLoading && <div>No products found</div>}
        </div>
      </Container>
    </div>
  );
};

export default PrioritizeProduct;
