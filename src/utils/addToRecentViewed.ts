import { IProduct } from "@/types/product.type";

const recentViewedProduct = (product: IProduct) => {
  const recentViewedProducts = JSON.parse(
    localStorage.getItem("recentViewedProducts") || "[]"
  );

  const isProductExist = recentViewedProducts.find(
    (item: IProduct | null) => item?.id === product?.id
  );

  if (recentViewedProducts.length > 10) {
    recentViewedProducts.shift();
  }

  if (!isProductExist) {
    recentViewedProducts.push(product);
    localStorage.setItem(
      "recentViewedProducts",
      JSON.stringify(recentViewedProducts)
    );
  }
};

export default recentViewedProduct;
