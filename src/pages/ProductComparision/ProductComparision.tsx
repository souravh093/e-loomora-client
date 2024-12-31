import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle } from "lucide-react"
import { useGetProductsQuery } from "@/redux/api/features/productApi"
import { IProduct } from "@/types/product.type"
import BannerPage from "@/components/shared/BannerPage"

export function ProductComparison() {
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([])
  const [warning, setWarning] = useState<string | null>(null)
  const { data: productsData } = useGetProductsQuery(undefined)

  const addProduct = (productId: string) => {
    const product = productsData?.data?.result.find((p: IProduct) => p.id === productId)
    if (!product) return

    if (selectedProducts.length === 0 || product.category.name === selectedProducts[0].category.name) {
      if (selectedProducts.length < 3) {
        setSelectedProducts([...selectedProducts, product])
        setWarning(null)
      } else {
        setWarning("You can compare up to 3 products at a time.")
      }
    } else {
      setWarning("You can only compare products from the same category.")
    }
  }

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
    setWarning(null)
  }

  return (
    <>
    <BannerPage title="Product Comparison" />
    <div className="container mx-auto p-4 h-screen">
      <h1 className="text-2xl font-bold mb-4">Product Comparison</h1>
      <div className="mb-4">
        <Select onValueChange={addProduct}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a product to compare" />
          </SelectTrigger>
          <SelectContent>
            {productsData?.data?.result.map((product: IProduct) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {warning && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>{warning}</AlertDescription>
        </Alert>
      )}
      {selectedProducts.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Feature</TableHead>
              {selectedProducts.map((product) => (
                <TableHead key={product.id}>
                  {product.name}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeProduct(product.id)}
                    className="ml-2"
                  >
                    Remove
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Price</TableCell>
              {selectedProducts.map((product) => (
                <TableCell key={product.id}>${product.price.toFixed(2)}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Category</TableCell>
              {selectedProducts.map((product) => (
                <TableCell key={product.id}>{product.category.name}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Description</TableCell>
              {selectedProducts.map((product) => (
                <TableCell key={product.id}>
                    <p className="line-clamp-3">{product.description}</p>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Images</TableCell>
              {selectedProducts.map((product) => (
                <TableCell key={product.id}>
                  <div className="flex gap-2">
                    {product.productImage && product.productImage.map((img) => (
                      <img
                        key={img.id}
                        src={img.url ? img.url : ""}
                        alt={product.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    ))}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
    </>
  )
}
