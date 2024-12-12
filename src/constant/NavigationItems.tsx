import { TMenuItem } from "@/types/navigation.type";
import {
  ChartBarStacked,
  Home,
  Landmark,
  Lock,
  Logs,
  PackageSearch,
  Star,
  Store,
  TicketPercent,
  User,
} from "lucide-react";

const adminNavItems: TMenuItem[] = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Users",
    to: "/dashboard/admin/user",
    icon: <User className="h-4 w-4" />,
  },
  {
    name: "Vendor Shop",
    to: "/dashboard/admin/shop",
    icon: <Store className="w-4 h-4" />,
  },
  {
    name: "Product Categories",
    to: "/dashboard/admin/categories",
    icon: <ChartBarStacked className="w-4 h-4" />,
  },
  {
    name: "Transactions History",
    to: "/dashboard/admin/transactions",
    icon: <Landmark className="w-4 h-4" />,
  },
  {
    name: "Change Password",
    to: "/dashboard/admin/change-password",
    icon: <Lock className="w-4 h-4" />,
  }
];

const vendorNavItems: TMenuItem[] = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Add Product",
    to: "/dashboard/vendor/products/add",
    icon: <Store className="w-4 h-4" />,
  },
  {
    name: "Customers Reviews",
    to: "/dashboard/vendor/reviews",
    icon: <Star className="w-4 h-4" />,
  },
  {
    name: "Inventory",
    to: "/dashboard/vendor/inventory",
    icon: <PackageSearch className="w-4 h-4" />,
  },
  {
    name: "Orders",
    to: "/dashboard/vendor/orders",
    icon: <Logs className="w-4 h-4" />,
  },
  {
    name: "Coupons",
    to: "/dashboard/vendor/coupons",
    icon: <TicketPercent className="w-4 h-4" />,
  },
  {
    name: "Shop Management",
    to: "/dashboard/vendor/shop-management",
    icon: <Landmark className="w-4 h-4" />,
  },
  {
    name: "Change Password",
    to: "/dashboard/vendor/change-password",
    icon: <Lock className="w-4 h-4" />,
  }
];

const userNavItems: TMenuItem[] = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "My Orders",
    to: "/dashboard/user/orders",
    icon: <Logs className="w-4 h-4" />,
  },
  {
    name: "Change Password",
    to: "/dashboard/user/change-password",
    icon: <Lock className="w-4 h-4" />,
  }
];

export { adminNavItems, vendorNavItems, userNavItems };
