/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAddSubscriptionMutation } from "@/redux/api/features/subscriptionApi";
import { useState } from "react";

export default function Subscribe() {
  const [createSubscription, { isLoading }] = useAddSubscriptionMutation();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createSubscription({ email }).unwrap();

      if (response.success) {
        toast({
          variant: "default",
          title: response.message,
        });
        setEmail("");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.data.message,
      });
    }
  };

  return (
    <section className="container mx-auto mt-10 rounded-lg relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-600 py-16 sm:py-24">
      <div className="absolute inset-0">
        <svg
          className="absolute left-full transform translate-x-1/2 translate-y-1/4"
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-white/20"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="404"
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>
        <svg
          className="absolute right-full bottom-0 transform -translate-x-1/2"
          width="404"
          height="404"
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y="0"
                width="4"
                height="4"
                className="text-white/20"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width="404"
            height="404"
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>
      </div>
      <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="rounded-2xl bg-white/10 px-6 py-10 backdrop-blur-md sm:py-16 sm:px-12 lg:flex lg:items-center lg:p-20">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get exclusive deals and updates
            </h2>
            <p className="mt-4 max-w-3xl text-lg text-gray-800">
              Join our newsletter and be the first to know about new arrivals,
              special promotions, and insider-only discounts.
            </p>
          </div>
          <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
            <form className="sm:flex" onSubmit={handleSubmit}>
              <Input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-md border-gray-300 bg-white/80 px-5 py-3 placeholder-gray-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                className="mt-3 w-full rounded-md px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-300 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {status === "success" && (
              <p className="mt-3 text-sm text-gray-800">
                Thanks for subscribing! Check your email for confirmation.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-red-600">
                Oops! Something went wrong. Please try again.
              </p>
            )}
            <p className="mt-3 text-sm text-gray-800">
              We care about the protection of your data. Read our{" "}
              <a href="#" className="font-medium text-gray-900 underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
