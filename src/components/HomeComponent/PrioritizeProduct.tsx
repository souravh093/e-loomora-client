import { useState, useEffect } from "react";
import { useGetPrioritizeProductsQuery } from "@/redux/api/features/productApi";
import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { IProduct } from "@/types/product.type";
import ProductCardSkeleton from "../ProductCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

const PrioritizeProduct = () => {
  const [page, setPage] = useState(1);
  const [productsList, setProductsList] = useState<IProduct[]>([]);

  const {
    data: products,
    isLoading,
    isFetching,
    refetch,
  } = useGetPrioritizeProductsQuery([
    {
      name: "page",
      value: page,
    },
    {
      name: "limit",
      value: 10,
    },
  ]);

  useEffect(() => {
    if (products?.data?.result) {
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
    if (!isFetching && products?.data?.result?.length >= 10) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="my-5">
      <Container>
        <div className="my-3 flex justify-between items-center">
          <div>
            <h1 className="text-gray-700 font-bold text-2xl">
              Your Prioritize Product
            </h1>
          </div>
        </div>
        <InfiniteScroll
          dataLength={productsList.length}
          next={fetchMoreData}
          hasMore={products?.data?.result?.length >= 10}
          loader={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }
          endMessage={
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              <b>No more products to display</b>
            </p>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
            {isLoading &&
              [0, 1, 2, 3, 4].map((i) => <ProductCardSkeleton key={i} />)}
            {productsList.length > 0
              ? productsList.map((product: IProduct) => (
                  <ProductCard key={product.id} product={product} />
                ))
              : !isLoading && <div>No prioritize product found</div>}
          </div>
        </InfiniteScroll>
      </Container>
    </div>
  );
};

export default PrioritizeProduct;
