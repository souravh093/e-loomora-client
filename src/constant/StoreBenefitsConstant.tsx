import { TBenefits } from "@/types/storeBenefits.types";
import { Headset, LockKeyhole, Repeat2, Truck } from "lucide-react";

export const benefits: TBenefits[] = [
  {
    icon: <Truck />,
    title: "Free & Fast Delivery",
    description: "Enjoy free delivery on all orders over 100BDT",
  },
  {
    icon: <Headset />,
    title: "24/7 Customer Support",
    description: "Our customer support team is always available to help",
  },
  {
    icon: <Repeat2 />,
    title: "Easy Returns & Refunds",
    description: "Return your product within 30 days for a full refund",
  },
  {
    icon: <LockKeyhole />,
    title: "Secure Payment",
    description: "We ensure secure payment with SSL encryption",
  },
];
