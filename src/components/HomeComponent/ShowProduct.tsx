import { useState, useEffect, useRef } from "react";
import { useGetProductsQuery } from "@/redux/api/features/productApi";
import Container from "../shared/Container";
import ProductCard from "../shared/ProductCard";
import { IProduct } from "@/types/product.type";

const ShowProduct = () => {
  const [page, setPage] = useState(1);
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const query = [
    {
      name: "orderBy",
      value: JSON.stringify({
        createdAt: "desc",
      }),
    },
    {
      name: "page",
      value: page,
    },
    {
      name: "limit",
      value: 5,
    },
  ];

  const { data: products, isLoading } = useGetProductsQuery(query);

  useEffect(() => {
    if (products?.data?.result) {
      setProductsList((prevProducts) => [
        ...prevProducts,
        ...products.data.result,
      ]);
    }
  }, [products]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (sentinelRef.current) {
      observer.current.observe(sentinelRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoading]);

  return (
    <div className="my-5">
      <Container>
        <div className="my-3">
          <h1 className="text-gray-700 font-bold text-2xl">Deals of The Day</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
          {productsList.map((product: IProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div ref={sentinelRef} style={{ height: 1 }} />
        {isLoading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-opacity-50"></div>
          </div>
        )}
        {!isLoading && productsList.length >= (products?.data?.total || 0) && (
          <p>No more products</p>
        )}
      </Container>
    </div>
  );
};

export default ShowProduct;
