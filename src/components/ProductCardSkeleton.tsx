import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const ProductCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="absolute right-2 top-2 h-5 w-16" />
        <Skeleton className="absolute left-2 top-2 h-5 w-16" />
      </div>
      <CardContent className="p-4">
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-full" />
            ))}
            <Skeleton className="h-4 w-8 ml-1" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            <Skeleton className="h-6 w-20 mb-1" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

export default ProductCardSkeleton

