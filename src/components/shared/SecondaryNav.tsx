import { Phone, Store, ShoppingCart, GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SecondaryNavbar() {
  return (
    <div className={cn("w-full bg-gray-100 px-4 py-2 shadow-md")}> 
      <div className="container mx-auto flex justify-between items-center text-sm">
        {/* Contact Number */}
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700">+123 456 7890</span>
        </div>
        
        {/* Compare Products */}
        <Button variant="ghost" className="flex items-center gap-2 text-gray-700">
          <GitCompare className="w-4 h-4" />
          Compare Products
        </Button>
        
        {/* Vendor Show */}
        <Button variant="ghost" className="flex items-center gap-2 text-gray-700">
          <Store className="w-4 h-4" />
          Vendor Show
        </Button>
        
        {/* Cart (Optional Extra) */}
        <Button variant="ghost" className="flex items-center gap-2 text-gray-700">
          <ShoppingCart className="w-4 h-4" />
          Cart
        </Button>
      </div>
    </div>
  );
}
