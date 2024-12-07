import { useGetProductsQuery } from "@/redux/api/features/productApi";
import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { IProduct } from "@/types/product.type";

const ShowProduct = () => {
  const query = [
    {
      name: "orderBy",
      value: JSON.stringify({
        createdAt: "desc",
      }),
    }
  ]
  const { data: products, isLoading } = useGetProductsQuery(query);
  return (
    <div className="my-5">
      <Container>
        <div className="my-3">
          <h1 className="text-gray-700 font-bold text-2xl">Deals of The Day</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
          {isLoading && <p>Loading...</p>}
          {products?.data?.result?.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ShowProduct;
