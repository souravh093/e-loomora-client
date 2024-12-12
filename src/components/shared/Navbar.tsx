import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Input } from "../ui/input";
import Container from "./Container";
import Cart from "./Cart";
import { Button } from "../ui/button";
import { logout, selectCurrentUser, useCurrentToken } from "@/redux/api/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUser, SearchIcon, Menu, X } from "lucide-react";
import { useGetUserByIdQuery } from "@/redux/api/features/userApi";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser)
  const userId = currentUser?.id ? currentUser.id : null;
  const {data: userData} = useGetUserByIdQuery(userId);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("searchTerm") as string;
    navigate("/all-products", { state: { searchTerm } });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="py-3 border-y sticky top-0 z-10 bg-white shadow-md">
      <Container className="flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="font-black text-xl text-yellow-500">LOOMORA</h1>
        </Link>
        <div className="hidden md:flex">
          <form className="flex" onSubmit={handleSearchSubmit}>
            <Input
              type="text"
              name="searchTerm"
              placeholder="Search"
              className="rounded-none"
            />
            <Button
              type="submit"
              variant="secondary"
              className="bg-yellow-500 hover:bg-yellow-600 rounded-none px-3"
              size="icon"
            >
              <SearchIcon />
            </Button>
          </form>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 font-bold" : "text-gray-700"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 font-bold" : "text-gray-700"
            }
          >
            All Products
          </NavLink>
          <NavLink
            to="/comparison"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 font-bold" : "text-gray-700"
            }
          >
            Comparison
          </NavLink>
          <NavLink
            to="/shops"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 font-bold" : "text-gray-700"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/recent-viewed"
            className={({ isActive }) =>
              isActive ? "text-yellow-500 font-bold" : "text-gray-700"
            }
          >
            Recent Product
          </NavLink>
        </div>
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  {
                    userData?.data?.image ? (
                      <img src={userData.data.image} alt="user" className="w-8 h-8 rounded-full" />
                    ) : (
                      <CircleUser className="h-5 w-5" />
                    )
                  }
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
        <div className="md:hidden flex items-center">
          <Button variant="secondary" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </Container>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center gap-4 p-4">
            <form className="flex w-full" onSubmit={handleSearchSubmit}>
              <Input
                type="text"
                name="searchTerm"
                placeholder="Search"
                className="rounded-none w-full"
              />
              <Button
                type="submit"
                variant="secondary"
                className="bg-yellow-500 hover:bg-yellow-600 rounded-none px-3"
                size="icon"
              >
                <SearchIcon />
              </Button>
            </form>
            <NavLink to={"/"} onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to={"/all-products"} onClick={toggleMenu}>
              All Products
            </NavLink>
            <NavLink to={"/comparison"} onClick={toggleMenu}>
              Comparison
            </NavLink>
            <NavLink to={"/shops"} onClick={toggleMenu}>
              Shop
            </NavLink>
            <NavLink to={"/recent-viewed"} onClick={toggleMenu}>
              Recent Product
            </NavLink>
            {token ? (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  onClick={() => {
                    navigate("/dashboard");
                    toggleMenu();
                  }}
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Button>
                <Button variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <NavLink to={"/login"} onClick={toggleMenu}>
                  <Button variant={"outline"}>Login</Button>
                </NavLink>
                <NavLink to={"/signup"} onClick={toggleMenu}>
                  <Button className="bg-yellow-500 hover:bg-yellow-600">
                    Register
                  </Button>
                </NavLink>
              </>
            )}
            <Cart />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
