import { toast } from "@/hooks/use-toast"
import { CartItem, removeItem, updateQuantity } from "@/redux/api/features/cartSlice"
import { useAppDispatch } from "@/redux/hooks"
import { Minus, Plus, Trash2 } from 'lucide-react'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const CartCard = ({ product }: { product: CartItem }) => {
  const dispatch = useAppDispatch()
  const { id, image, name, price, quantity } = product

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      toast({
        variant: "destructive",
        title: "Quantity can't be less than 1",
      })
      return
    }
    dispatch(updateQuantity({ id, quantity: newQuantity }))
  }

  const handleRemoveItem = () => {
    dispatch(removeItem(id))
    toast({
      title: "Item removed from cart",
      description: `${name} has been removed from your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 overflow-hidden">
            <AspectRatio ratio={1 / 1}>
              <img
                src={image}
                alt={name}
                className="object-cover w-full h-full transition-transform hover:scale-110"
              />
            </AspectRatio>
          </div>
          <div className="flex-grow py-4 pr-4">
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
                  className="w-16 h-8 text-center"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold">৳{price * quantity}</span>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8"
                  onClick={handleRemoveItem}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CartCard

