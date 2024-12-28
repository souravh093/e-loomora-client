import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Input } from "../ui/input";
import Container from "./Container";
import Cart from "./Cart";
import { Button } from "../ui/button";
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/api/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CircleUser, SearchIcon, Menu, X, ChevronDown } from "lucide-react";
import { useGetUserByIdQuery } from "@/redux/api/features/userApi";
import logo from "@/assets/logo.png";
import { useGetCategoriesQuery } from "@/redux/api/features/categoryApi";
import { ICategory } from "@/types/product.type";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?.id ? currentUser.id : null;
  const { data: userData } = useGetUserByIdQuery(userId);
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const {data: categories} = useGetCategoriesQuery(undefined);

  const handleCategory = (id: string) => {
    navigate("/all-products", {state: {categoryId: id}});
    setOpenMenu(null);
  }

  return (
    <nav
      className={`py-3 border-b border-gray-700 sticky top-0 z-10 bg-gray-900 shadow-sm ${
        isScrolled ? "glassmorphism" : ""
      }`}
    >
      <Container className="flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <span className="font-black text-2xl text-yellow-500 ">
              LOOMORA
            </span>
          </h1>
        </Link>
        <div className="hidden md:flex">
          <form className="flex" onSubmit={handleSearchSubmit}>
            <Input
              type="text"
              name="searchTerm"
              placeholder="Search"
              className={`rounded-none ${
                isScrolled ? "text-gray-700" : "bg-gray-200"
              }`}
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
              isActive
                ? "text-yellow-500 font-bold"
                : `${isScrolled ? "text-gray-900" : "text-gray-200"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-bold"
                : `${isScrolled ? "text-gray-900" : "text-gray-200"}`
            }
          >
            All Products
          </NavLink>
          <div className="relative">
            <button
              className="inline-flex items-center px-1 pt-1 border-b-2 leading-5 text-gray-200 focus:outline-none transition duration-150 ease-in-out border-transparent focus:border-gray-300"
              onMouseEnter={() => setOpenMenu("Categories")}
              onClick={() =>
                setOpenMenu(openMenu === "Categories" ? null : "Categories")
              }
            >
              Categories
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {openMenu && (
              <div
                className="absolute left-0 mt-2 w-screen max-w-md sm:px-0 lg:max-w-3xl"
                onMouseLeave={() => setOpenMenu(null)}
              >
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-3">
                    {categories?.data?.map((category: ICategory) => (
                      <div
                        onClick={() => handleCategory(category.id)}
                        key={category.id}
                        className="flex items-center cursor-pointer gap-2 text-gray-900 hover:text-yellow-500"
                      >
                        <img
                          src={category.logo}
                          alt={category.name}
                          className="w-10 h-10"
                        />
                        <span>{category.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <NavLink
            to="/comparison"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-bold"
                : `${isScrolled ? "text-gray-900" : "text-gray-200"}`
            }
          >
            Comparison
          </NavLink>
          <NavLink
            to="/shops"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-bold"
                : `${isScrolled ? "text-gray-900" : "text-gray-200"}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/recent-viewed"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 font-bold"
                : `${isScrolled ? "text-gray-900" : "text-gray-200"}`
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
                  {userData?.data?.image ? (
                    <img
                      src={userData.data.image}
                      alt="user"
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <CircleUser className="h-5 w-5" />
                  )}
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
        <div className="md:hidden text-gray-200 bg-gray-900">
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
