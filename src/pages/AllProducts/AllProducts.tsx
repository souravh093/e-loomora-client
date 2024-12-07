/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  SearchIcon,
  ListOrderedIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-react";

import { useLocation } from "react-router";
import ProductCard from "@/components/shared/ProductCard";
import Container from "@/components/shared/Container";
import { ICategory, IProduct } from "@/types/product.type";
import { useGetProductsQuery } from "@/redux/api/features/productApi";
import { useGetCategoriesQuery } from "@/redux/api/features/categoryApi";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const AllProducts = () => {
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const searchTermData = location.state?.searchTerm;

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{
    category: string;
    price: { min: number | null; max: number | null };
  }>({
    category: categoryId || "",
    price: { min: null, max: null },
  });

  const [sortOrder, setSortOrder] = useState("asc");

  const query = [
    {
      name: "searchTerm",
      value: searchTerm || searchTermData || "",
    },
    {
      name: "orderBy",
      value: JSON.stringify({
        price: sortOrder,
      }),
    },
  ];

  if (filters.category) {
    query.push({
      name: "filter",
      value: JSON.stringify({
        categoryId: filters.category,
      }),
    });
  }

  if (filters.price.min && filters.price.max) {
    query.push({
      name: "filter",
      value: JSON.stringify({
        price: {
          gte: filters.price.min,
          lte: filters.price.max,
        },
      }),
    });
  }

  const { data: products, isLoading } = useGetProductsQuery(query);
  const { data: categoriesData } = useGetCategoriesQuery(undefined);

  console.log(filters);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (category: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: category,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: "",
      price: { min: 0, max: Infinity },
    });
  };

  const handleSortOrder = (order: string) => {
    setSortOrder(order);
  };

  const [priceFilter, setPriceFilters] = useState({
    price: {
      min: 0,
      max: 10000,
    },
  });

  const handlePriceChange = (value: number[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: {
        min: value[0],
        max: value[1],
      },
    }));
  };

  return (
    <div className=" px-4 md:px-6 py-8">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">All Products</h1>
          <div className="relative w-full md:w-auto">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 rounded-md w-full md:w-64"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-[240px_1fr] gap-8">
          <div className="bg-yellow-50 rounded-md shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <div className="grid gap-4">
              <div>
                <div>
                  <h3 className="text-base font-medium mb-2">Category</h3>
                  <div className="grid gap-2">
                    {categoriesData?.data?.map((category: ICategory) => (
                      <Label
                        key={category.id}
                        onClick={() => handleCategoryFilter(category.id)}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          checked={filters.category === category.id}
                          readOnly
                        />
                        {category.name}
                      </Label>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="my-5 flex flex-col gap-2">
                    <Label className="flex items-center gap-2">
                      Price Range: ৳{filters.price.min} - ৳{filters.price.max}
                    </Label>
                    <Slider
                      defaultValue={[
                        priceFilter.price.min,
                        priceFilter.price.max,
                      ]}
                      min={0}
                      max={10000}
                      step={1}
                      onValueChange={handlePriceChange}
                      className={cn("w-[60%]")}
                    />
                  </div>
                </div>
              </div>
              <Button onClick={handleClearFilters} className="bg-yellow-500">
                Clear Filters
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <ListOrderedIcon className="w-4 h-4" />
                    Sort by Price
                    {sortOrder === "asc" ? (
                      <ArrowUpIcon className="w-4 h-4" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup
                    value={sortOrder}
                    onValueChange={handleSortOrder}
                  >
                    <DropdownMenuRadioItem value="asc">
                      Price: Low to High
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="desc">
                      Price: High to Low
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              {products?.data?.result.length < 1 ? (
                <p className="text-gray-400 text-4xl font-bold flex items-center min-h-screen justify-center">
                  No products found
                </p>
              ) : isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-opacity-50"></div>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                  {products?.data?.result?.map((product: IProduct) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AllProducts;
