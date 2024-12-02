import { TMenuItem } from "@/types/navitems.type";
import {
  BookUser,
  BriefcaseBusiness,
  ChevronDown,
  Home,
  IdCard,
  LineChart,
  Newspaper,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";


const navItems: TMenuItem[] = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Portfolio",
    to: "/dashboard/all-projects",
    icon: <BriefcaseBusiness className="h-4 w-4" />,
    subMenu: [
      {
        name: "All Projects",
        to: "/dashboard/all-projects",
      },
      {
        name: "Add Project",
        to: "/dashboard/add-project",
      },
      {
        name: "Categories",
        to: "/dashboard/categories",
      },
    ],
  },
  {
    name: "Blogs",
    to: "/dashboard/all-blogs",
    icon: <Newspaper className="w-4 h-4" />,
    subMenu: [
      {
        name: "All Blogs",
        to: "/dashboard/all-blogs",
      },
      {
        name: "Add Blog",
        to: "/dashboard/add-blog",
      },
      {
        name: "Categories",
        to: "/dashboard/blog-categories",
      },
    ],
  },
  {
    name: "About",
    to: "/dashboard/about",
    icon: <IdCard className="w-4 h-4" />,
    subMenu: [
      {
        name: "Experience",
        to: "/dashboard/experience",
      },
      {
        name: "Education",
        to: "/dashboard/education",
      },
      {
        name: "Skills",
        to: "/dashboard/skills",
      },
      {
        name: "Achievements",
        to: "/dashboard/achievements",
      },
      {
        name: "Language",
        to: "/dashboard/language",
      },
      {
        name: "Goals & Interests",
        to: "/dashboard/goals-interests",
      },
      {
        name: "Add CV",
        to: "/dashboard/add-cv",
      },
    ],
  },
  {
    name: "Contact",
    to: "/dashboard/contact",
    icon: <BookUser className="w-4 h-4" />,
  },
  {
    name: "Our Success",
    to: "/dashboard/success",
    icon: <LineChart className="w-4 h-4" />,
  },
  {
    name: "Settings",
    to: "/dashboard/settings",
    icon: <Settings className="w-4 h-4" />,
    subMenu: [
      {
        name: "General Settings",
        to: "/dashboard/general-settings",
      },
      {
        name: "Appearance",
        to: "/dashboard/appearance",
      },
      {
        name: "Social Media",
        to: "/dashboard/social-media",
      },
    ],
  },
];

const DashboardNavigation = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => (
        <div key={item.name}>
          {item.subMenu ? (
            <div>
              <button
                onClick={() => toggleSubMenu(item.name)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.name}
                </div>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openMenus[item.name] ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openMenus[item.name] && (
                <div className="ml-6 mt-2 space-y-1">
                  {item.subMenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      to={subItem.to}
                      className="block rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              to={item.to}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary"
            >
              {item.icon}
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default DashboardNavigation;