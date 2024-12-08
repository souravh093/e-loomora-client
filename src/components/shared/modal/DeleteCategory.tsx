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
  import { toast } from "@/hooks/use-toast";
import { useDeleteCategoryMutation } from "@/redux/api/features/categoryApi";
  import { Trash2 } from "lucide-react";
  
  export function DeleteCategory({id}: {id: string}) {
    const [deleteCat] = useDeleteCategoryMutation();
  
    const handleDelete = async () => {
      try {
        const response = await deleteCat(id).unwrap();
  
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
          <button>
            <Trash2 className="hover:text-red-800 text-red-500 text-sm rounded-[40px] py-[4px]" />
          </button>
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
            <AlertDialogAction onClick={handleDelete} className="bg-red-500">Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  