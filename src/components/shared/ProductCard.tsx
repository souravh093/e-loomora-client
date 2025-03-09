"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Link } from "react-router"
import { ShoppingCart, Store, Star, Eye } from "lucide-react"

import type { IProduct } from "@/types/product.type"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { toast } from "@/hooks/use-toast"
import { addItem } from "@/redux/api/features/cartSlice"
import { selectCurrentUser } from "@/redux/api/features/authSlice"
import { CartAlertModal } from "./modal/CartAlertModal"

const ProductCard = ({ product }: { product: IProduct }) => {
  const currentUser = useAppSelector(selectCurrentUser)
  const userStatus = currentUser ? currentUser.status : null
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [imageInterval, setImageInterval] = useState<NodeJS.Timeout | null>(null)
  const dispatch = useAppDispatch()
  const cartProducts = useAppSelector((state) => state.cart.items)

  const hasMultipleImages = product.productImage && product.productImage.length > 1

  const discountedPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price

  const cart = {
    id: product.id,
    name: product.name,
    shopId: product.shopId,
    price: Number(discountedPrice.toFixed(2)),
    image: product?.productImage?.[0]?.url ?? "",
    stockQuantity: product.inventoryCount,
  }

  // Auto-rotate images on hover
  useEffect(() => {
    if (isHovering && hasMultipleImages) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev === (product.productImage?.length || 0) - 1 ? 0 : prev + 1))
      }, 1500)
      setImageInterval(interval)
      return () => clearInterval(interval)
    } else if (imageInterval) {
      clearInterval(imageInterval)
      setImageInterval(null)
    }
  }, [isHovering, hasMultipleImages, product.productImage?.length])

  const addToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    if (currentUser && userStatus === "SUSPENDED") {
      toast({
        variant: "destructive",
        description: "Your account is suspended",
      })
      return
    } else if (currentUser?.role === "VENDOR") {
      toast({
        variant: "destructive",
        description: "Vendor can't add product to cart",
      })
      return
    } else if (currentUser?.role === "ADMIN") {
      toast({
        variant: "destructive",
        description: "Admin can't add product to cart",
      })
      return
    }

    for (const item of cartProducts) {
      if (item.shopId !== product.shopId) {
        setIsModalOpen(true)
        return
      }
    }

    dispatch(addItem(cart))

    toast({
      variant: "default",
      description: "Product added to cart",
    })
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`w-3 h-3 ${index < Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
        />
      ))
  }

  return (
    <>
      {isModalOpen && <CartAlertModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={cart} />}
      <Card
        className="group relative h-[400px] w-full max-w-[280px] mx-auto border-0 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false)
          setCurrentImageIndex(0)
        }}
      >
        {/* Image Section with Hover Overlay */}
        <Link to={`/product-details/${product.id}`} className="block relative h-[280px] overflow-hidden bg-gray-50">
          {product.productImage && product.productImage.length > 0 ? (
            <img
              src={product.productImage[currentImageIndex]?.url ?? ""}
              alt={product.name}
              className="object-contain w-full h-full transition-all duration-500"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <span className="text-gray-400">No image</span>
            </div>
          )}

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${isHovering ? "opacity-100" : "opacity-0"}`}
          >
            <Button
              onClick={(e) => addToCart(e)}
              className="bg-white text-black hover:bg-yellow-500 hover:text-black transition-all transform hover:scale-105"
              disabled={product.inventoryCount <= 0}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.inventoryCount > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>

            <Link
              to={`/product-details/${product.id}`}
              className="inline-flex items-center gap-2 bg-black/70 text-white px-4 py-2 rounded-md hover:bg-black transition-all"
            >
              <Eye className="h-4 w-4" /> Quick View
            </Link>
          </div>

          {/* Badges */}
          <div className="absolute top-0 left-0 w-full p-3 flex justify-between pointer-events-none">
            {product?.discount ? (
              <Badge className="bg-red-500 hover:bg-red-600 text-xs font-medium">{product.discount}% OFF</Badge>
            ) : (
              <span></span> // Empty span to maintain flex layout
            )}

            <Badge className="bg-black/70 hover:bg-black/80 text-xs font-medium">{product.category.name}</Badge>
          </div>

          {/* Image indicators */}
          {hasMultipleImages && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
              {product?.productImage?.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    currentImageIndex === index ? "bg-white w-3" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </Link>

        {/* Product Info Section */}
        <div className="p-4 flex flex-col h-[120px]">
          <div className="flex items-center justify-between mb-1">
            <Link
              to={`/shop-products/${product.shopId}`}
              className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Store className="w-3 h-3" />
              <span className="truncate max-w-[120px]">{product.shop.name}</span>
            </Link>

            <div className="flex items-center">
              {renderStars(product.avgRating)}
              <span className="ml-1 text-xs text-gray-500">({product.review.length})</span>
            </div>
          </div>

          <Link to={`/product-details/${product.id}`} className="block mt-1">
            <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline gap-2">
              <p className="text-base font-bold text-primary">৳{discountedPrice.toLocaleString()}</p>
              {product.discount ? (
                <p className="text-xs text-gray-400 line-through">৳{product.price.toLocaleString()}</p>
              ) : null}
            </div>

            <Badge variant={product.inventoryCount > 0 ? "outline" : "destructive"} className="text-xs font-normal">
              {product.inventoryCount > 0 ? `Stock: ${product.inventoryCount}` : "Out of Stock"}
            </Badge>
          </div>
        </div>
      </Card>
    </>
  )
}

export default ProductCard

