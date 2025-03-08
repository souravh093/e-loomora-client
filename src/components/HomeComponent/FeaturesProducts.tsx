"use client"

import { useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router"

import Container from "../shared/Container"
import { useGetProductsQuery } from "@/redux/api/features/productApi"
import type { IProduct } from "@/types/product.type"
import { Button } from "../ui/button"
import ProductCard from "../shared/ProductCard"

const FeaturesProduct = () => {
  const { data: products } = useGetProductsQuery(undefined)
  const [currentPage, setCurrentPage] = useState(0)

  // Number of products to show per page
  const productsPerPage = 6
  const featuredProducts = products?.data?.result || []

  // Calculate total pages
  const totalPages = Math.ceil(featuredProducts.length / productsPerPage)

  // Get current page products
  const currentProducts = featuredProducts.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  return (
    <section className="py-12 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left side - Feature Poster */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden relative group">
            <div className="relative h-full min-h-[300px] md:min-h-[500px] bg-gradient-to-r from-primary/90 to-primary/70 flex flex-col justify-between p-8">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="relative z-10">
                <span className="inline-block bg-white text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Special Offer
                </span>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  Discover Our Premium Selection
                </h3>
                <p className="text-white/90 mb-6 max-w-md">
                  Explore our handpicked featured products with exclusive deals and limited-time offers.
                </p>
              </div>

              <div className="relative z-10">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 group-hover:translate-x-2 transition-transform"
                >
                  <Link to="/products">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute top-20 -right-10 w-20 h-20 bg-white/10 rounded-full"></div>
            </div>
          </div>

          {/* Right side - Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentProducts.map((product: IProduct) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-8">
                <div className="text-sm text-gray-500">
                  Showing page {currentPage + 1} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prevPage} className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous page</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextPage} className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next page</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FeaturesProduct

