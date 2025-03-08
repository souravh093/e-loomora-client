import { useGetProductsQuery } from "@/redux/api/features/productApi";
import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { IProduct } from "@/types/product.type";
import ProductCardSkeleton from "../ProductCardSkeleton";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const ShowProduct = () => {
  const { data: products, isLoading } = useGetProductsQuery([
    {
      name: "orderBy",
      value: JSON.stringify({
        createdAt: "desc",
      }),
    },
    {
      name: "limit",
      value: 10,
    },
  ]);

  return (
    <div className="my-5">
      <Container>
        <div className="flex justify-between items-center my-3">
          <h1 className="text-gray-700 font-bold text-2xl">Deals of The Day</h1>
          <Link to="/all-products">
            <Button variant="outline">
              <ArrowRight className="text-gray-700" /> View All
            </Button>
          </Link>
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

export default ShowProduct;
