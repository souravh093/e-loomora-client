/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useGetProductsQuery } from "@/redux/api/features/productApi";
import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { IProduct } from "@/types/product.type";

const ShowProduct = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const query = [
    {
      name: "page",
      value: page.toString(),
    },
  ]

  const { data, isLoading } = useGetProductsQuery(query);

  useEffect(() => {
    if (data?.data?.result) {
      setProducts((prev) => [...prev, ...data.data.result]);
      setHasMore(data.data.result.length > 0);
    }
  }, [data]);

  const loadMoreProducts = async () => {
    setLoading(true);
    setPage((prev) => prev + 1);
    setLoading(false);
  };

  const lastProductRef = (node: any) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProducts();
      }
    });

    if (node) observer.current.observe(node);
  };

  return (
    <div className="my-5">
      <Container>
        <div className="my-3">
          <h1 className="text-gray-700 font-bold text-2xl">Deals of The Day</h1>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {isLoading && <p>Loading...</p>}
          {products.map((product, index) => {
            if (index === products.length - 1) {
              return (
                <div ref={lastProductRef} key={product.id}>
                  <ProductCard key={product.id} product={product} />
                </div>
              );
            } else {
              return (
                <ProductCard key={product.id} product={product} />
              );
            }
          })}
        </div>
        {loading && <p>Loading more products...</p>}
        {!hasMore && <p>No more products to load.</p>}
      </Container>
    </div>
  );
};

export default ShowProduct;