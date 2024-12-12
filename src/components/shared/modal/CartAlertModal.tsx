/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import { addItem, resetCart } from "@/redux/api/features/cartSlice";
  import { useAppDispatch } from "@/redux/hooks";
  
  import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
  
  interface ICartAlertModal {
    isOpen: boolean;
    onClose: () => void;
    product: any;
  }
  
  export function CartAlertModal({ isOpen, onClose, product }: ICartAlertModal) {
    const dispatch = useAppDispatch();
  

    const handleReplaceCart = () => {
      dispatch(resetCart());
      dispatch(addItem(product));
      onClose();
    };
  
    const handleRetainCart = () => {
      onClose();
    };
  
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Product Cart Conflict</AlertDialogTitle>
            <AlertDialogDescription>
              {`You can't add products from different vendors to the cart.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <button
              onClick={handleReplaceCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Replace Cart
            </button>
            <button
              onClick={handleRetainCart}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 ml-2"
            >
              Retain Current Cart
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  