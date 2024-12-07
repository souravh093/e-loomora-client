import { useGetPrioritizeProductsQuery } from "@/redux/api/features/productApi";
import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { IProduct } from "@/types/product.type";

const PrioritizeProduct = () => {
  const { data: products, isLoading } =
    useGetPrioritizeProductsQuery(undefined);
  return (
    <div className="my-5">
      <Container>
        <div className="my-3">
          <h1 className="text-gray-700 font-bold text-2xl">
            Your Prioritize Product
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
          {isLoading && <p>Loading...</p>}
          {products?.data.length < 1 ? (
            <div>Not prioritize product found</div>
          ) : (
            products?.data?.map((product: IProduct) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </Container>
    </div>
  );
};

export default PrioritizeProduct;
