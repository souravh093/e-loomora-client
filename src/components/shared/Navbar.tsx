import { Link, NavLink, useNavigate } from "react-router";
import { Input } from "../ui/input";
import Container from "./Container";
import Cart from "./Cart";
import { Button } from "../ui/button";
import { logout, useCurrentToken } from "@/redux/api/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUser, SearchIcon } from "lucide-react";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("searchTerm") as string;
    navigate("/all-products", { state: { searchTerm } });
  }

  return (
    <nav className="py-3 border-y">
      <Container className="flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="font-black text-xl text-yellow-500">LOOMORA</h1>
        </Link>
        <div>
          <form className="flex" onSubmit={handleSearchSubmit}>
            <Input type="text" name="searchTerm" placeholder="Search" className="rounded-none" />
            <Button type="submit" variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 rounded-none px-3" size="icon">
              <SearchIcon />
            </Button>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <NavLink to={"/"}>Home</NavLink>
          <NavLink to={"/all-products"}>All Products</NavLink>
          <NavLink to={"/comparison"}>Comparison</NavLink>
          <NavLink to={"/shops"}>Shop</NavLink>
          <NavLink to={"/recent-viewed"}>Recent Product</NavLink>
        </div>
        <div className="flex items-center gap-4">
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <NavLink to={"/login"}>
                <Button variant={"outline"}>Login</Button>
              </NavLink>
              <NavLink to={"/signup"}>
                <Button className="bg-yellow-500 hover:bg-yellow-600">
                  Register
                </Button>
              </NavLink>
            </>
          )}

          <Cart />
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
