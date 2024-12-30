/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { selectCurrentUser } from "@/redux/api/features/authSlice";
import {
  useGetUserByIdQuery,
  useUpdateUsersMutation,
} from "@/redux/api/features/userApi";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  profileFormSchema,
  ProfileFormValues,
} from "@/validations/auth/signup.validation";
import { uploadImageToFirebase } from "@/utils/uploadFile";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const [imagePreview, setImagePreview] = useState<string>();
  const currentUser = useAppSelector(selectCurrentUser);
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const userId = currentUser?.id ? currentUser.id : null;
  const { data: userData } = useGetUserByIdQuery(userId);
  const [updateUser, { isLoading }] = useUpdateUsersMutation();
  console.log(userData);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    let downloadUrl: string | null | undefined = null;
    if (data.image) {
      downloadUrl = await uploadImageToFirebase(
        data.image,
        setIsImageUploading
      );
      if (downloadUrl) {
        console.log("Image uploaded successfully:", downloadUrl);
      } else {
        toast({
          variant: "destructive",
          title: "Image upload failed",
        });
      }
    }

    try {
      const response = await updateUser({
        id: userId,
        data: {
          name: data.name || userData?.data.name,
          image: downloadUrl || userData?.data.image,
        },
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
  }

  useEffect(() => {
    if (userData) {
      form.setValue("name", userData?.data.name);
      form.setValue("email", userData?.data.email);
      form.setValue("role", userData?.data.role);
      setImagePreview(userData?.data.image);
    }
  }, [userData, form]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex items-center space-x-4">
                {
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={imagePreview} alt={userData?.data.name} />
                    <AvatarFallback>
                      <AvatarImage
                        src={userData?.data.image}
                        alt={userData?.data.name}
                      />
                    </AvatarFallback>
                  </Avatar>
                }
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            onChange(file);
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setImagePreview(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload a profile picture.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@example.com"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormDescription>
                      Your email address is used for important notifications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormDescription>
                      Your role in the organization.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading || isImageUploading
                  ? "Updating..."
                  : "Update Profile"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
