import { NavLink } from "react-router";
import { Input } from "../ui/input";
import Container from "./Container";
import Cart from "./Cart";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="py-3 border-y">
      <Container className="flex items-center justify-between">
        <div>
          <h1 className="font-black text-xl text-yellow-500">LOOMORA</h1>
        </div>
        <div>
          <Input placeholder="Search" />
        </div>
        <div className="flex items-center gap-4">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/"}>All Products</NavLink>
          <NavLink to={"/"}>Product Comparison</NavLink>
          <NavLink to={"/"}>Shop</NavLink>
          <NavLink to={"/"}>Recent Product</NavLink>
        </div>
        <div className="flex items-center gap-4">
          <NavLink to={"/login"}>
            <Button variant={"outline"}>
              Login
            </Button>
          </NavLink>
          <NavLink to={"/signup"}>
            <Button className="bg-yellow-500 hover:bg-yellow-600">
              Register
            </Button>
          </NavLink>

          <Cart />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
