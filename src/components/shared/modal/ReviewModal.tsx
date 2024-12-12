/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAddReviewReplyMutation } from "@/redux/api/features/reviewApi";
import { IReplayReview } from "@/types/product.type";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { View } from "lucide-react";

export function ReviewModal({
  content,
  id,
  replayReview,
}: {
  content: string;
  id: string;
  replayReview: IReplayReview[];
}) {

  const [addReplayReview, { isLoading }] = useAddReviewReplyMutation();

  const handleReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const review = new FormData(e.currentTarget).get("content") as string;

    try {
      const response = await addReplayReview({
        content: review,
        reviewId: id,
      }).unwrap();

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
        <Button variant={"outline"} size={"icon"}>
          <View />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Customer Review Content</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="relative">
              <div>
                <span className="font-bold">Customer: </span>
                {content}
              </div>
              <div>
                {replayReview.length > 0 && (
                  <div className="flex items-center">
                    <span className="font-bold">Replay Review: </span>
                    {replayReview.map((review) => (
                      <div key={review.id}>{review.content}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogHeader>
          <AlertDialogTitle>Replay Review</AlertDialogTitle>
          <form onSubmit={handleReview}>
            <Input type="text" name="content" placeholder="Replay Review" />
            <Button
              type="submit"
              disabled={replayReview.length > 0}
              className="text-black bg-yellow-500 hover:bg-yellow-600 mt-2"
              variant={"default"}
            >
              {isLoading ? "Loading..." : "Replay"}
            </Button>
          </form>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
