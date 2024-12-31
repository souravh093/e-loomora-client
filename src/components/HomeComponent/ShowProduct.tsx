import { useState, useEffect } from "react";
import { useGetProductsQuery } from "@/redux/api/features/productApi";
import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { IProduct } from "@/types/product.type";
import ProductCardSkeleton from "../ProductCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

const ShowProduct = () => {
  const [page, setPage] = useState(1);
  const [productsList, setProductsList] = useState<IProduct[]>([]);

  const {
    data: products,
    isLoading,
    isFetching,
    refetch,
  } = useGetProductsQuery([
    {
      name: "orderBy",
      value: JSON.stringify({
        createdAt: "desc",
      }),
    },
    {
      name: "page",
      value: page,
    }
  ]);

  useEffect(() => {
    if (products?.data?.result && Array.isArray(products?.data?.result)) {
      setProductsList((prevProducts) => [
        ...prevProducts,
        ...products.data.result,
      ]);
    }
  }, [products]);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const fetchMoreData = () => {
    if (!isFetching && products?.data?.result?.length >= 5) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="my-5">
      <Container>
        <div className="my-3">
          <h1 className="text-gray-700 font-bold text-2xl">Deals of The Day</h1>
        </div>
        <InfiniteScroll
          dataLength={productsList.length}
          next={fetchMoreData}
          hasMore={products?.data?.result?.length >= 5}
          loader={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
            {isLoading &&
              [0, 1, 2, 3, 4].map((i) => <ProductCardSkeleton key={i} />)}
            {productsList.length > 0
              ? productsList.map((product: IProduct) => (
                  <ProductCard key={product.id} product={product} />
                ))
              : !isLoading && <div>No products found</div>}
          </div>
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default ShowProduct;
