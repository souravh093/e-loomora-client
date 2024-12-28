import Marquee from "../ui/marquee";
import Container from "../shared/Container";
import { useGetProductsQuery } from "@/redux/api/features/productApi";
import ProductMarqueeCard from "../shared/ProductMarqueeCard";
import { IProduct } from "@/types/product.type";

const FeaturesProduct = () => {
  const { data: products } = useGetProductsQuery(undefined);
  return (
    <div className="my-10">
      <Container>
        <h2 className="text-2xl font-bold mb-5">Feature Products</h2>
      </Container>
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Marquee pauseOnHover className="[--duration:20s]">
          {products?.data?.result.map((product: IProduct) => (
            <ProductMarqueeCard key={product.id} product={product} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {products?.data?.result.map((product: IProduct) => (
            <ProductMarqueeCard key={product.id} product={product} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </div>
  );
};

export default FeaturesProduct;
