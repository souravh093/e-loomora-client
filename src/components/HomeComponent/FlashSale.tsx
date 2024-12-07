import flashSaleImage from "@/assets/flash-sale.jpg";
import Container from "../shared/Container";
import { Button } from "../ui/button";
import { Link } from "react-router";

const FlashSale = () => {
  return (
    <div
      className={
        "bg-cover bg-center bg-no-repeat h-[450px] flex items-center justify-center"
      }
      style={{ backgroundImage: `url(${flashSaleImage})` }}
    >
      <Container className="flex justify-end">
        <div>
          <h2 className="text-7xl text-white font-black">FLASH SALE</h2>
          <p className="text-white flex items-center text-xl">
            Discount up to <span className="text-7xl font-black text-red-500">50%</span>
          </p>
          <Link to={"/discount-products"}>
          <Button size={"lg"} variant={"outline"}>Shop Now</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default FlashSale;
