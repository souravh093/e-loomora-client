/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useDeleteProductMutation } from "@/redux/api/features/productApi";
import { Trash2 } from "lucide-react";

export function DeleteProduct({ id }: { id: string }) {
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteProduct(id).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <Trash2 className="hover:text-red-800 text-red-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete user
            account and remove user data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500">
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
