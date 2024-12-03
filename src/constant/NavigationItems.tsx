import { TMenuItem } from "@/types/navigation.type";
import {
  ChartBarStacked,
  Home,
  Landmark,
  Logs,
  PackageSearch,
  Star,
  Store,
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
];

const vendorNavItems: TMenuItem[] = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Products Management",
    to: "/dashboard/vendor/products",
    icon: <Store className="w-4 h-4" />,
    subMenu: [
      {
        name: "All Products",
        to: "/dashboard/vendor/products",
      },
      {
        name: "Add Product",
        to: "/dashboard/vendor/products/add",
      },
    ],
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
];

export { adminNavItems, vendorNavItems, userNavItems };
