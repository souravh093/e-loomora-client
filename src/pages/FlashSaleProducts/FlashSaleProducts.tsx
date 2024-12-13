import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Container from "@/components/shared/Container";
import ProductCard from "@/components/shared/ProductCard";
import { useGetProductsQuery } from "@/redux/api/features/productApi";
import { IProduct } from "@/types/product.type";

const FlashSaleProducts = () => {
  const query = [
    {
      name: "filter",
      value: JSON.stringify({
        discount: { gt: 0 },
      }),
    },
  ];
  const { data: discountProducts, isLoading } = useGetProductsQuery(query);

  return (
    <Container>
      <h1 className="my-5 text-4xl font-bold">Flash Sale Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {discountProducts?.data?.result?.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      )}
    </Container>
  );
};

export default FlashSaleProducts;
