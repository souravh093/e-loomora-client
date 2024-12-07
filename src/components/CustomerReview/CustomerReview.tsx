/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ReviewFormValues,
  reviewSchema,
} from "@/validations/review/review.validation";
import { useAddReviewMutation } from "@/redux/api/features/reviewApi";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/api/features/authSlice";

export function CustomerReviewForm({ productId }: { productId: string | undefined }) {
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser ? currentUser.id : null;
  const [addReview, { isLoading }] = useAddReviewMutation();
  const [hoveredRating, setHoveredRating] = useState(0);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      content: "",
      rating: 0,
    },
  });

  const onSubmit = async (data: ReviewFormValues) => {
    try {
      const response = await addReview({
        productId,
        userId,
        ...data,
      }).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });

        form.reset();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us what you think about the product..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your review helps others make better decisions about the
                product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-6 w-6 cursor-pointer",
                        hoveredRating >= star || field.value >= star
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      )}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => form.setValue("rating", star)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormDescription>
                Click on a star to rate the product from 1 to 5.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isLoading ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </Form>
  );
}
