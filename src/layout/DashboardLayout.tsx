import DashboardNavigation from "@/components/shared/DashboardNavigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { logout, selectCurrentUser } from "@/redux/api/features/authSlice";
import { useGetUserByIdQuery } from "@/redux/api/features/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ChevronRight, CircleUser, Menu } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import logo from "@/assets/logo.png";

export function DashboardLayout() {
  const currentUser = useAppSelector(selectCurrentUser);
  const userId = currentUser?.id ? currentUser.id : null;
  const { data: userData } = useGetUserByIdQuery(userId);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter(Boolean);
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  if (uuidRegex.test(pathSegments[pathSegments.length - 1])) {
    pathSegments.pop();
  }
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold text-yellow-500"
            >
              <img src={logo} alt="logo" className="w-8 h-8" loading="lazy" />
              <span className="font-black">LOOMORA</span>
            </Link>
          </div>
          <div className="flex-1">
            <DashboardNavigation />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <DashboardNavigation />
            </SheetContent>
          </Sheet>
          <div className="w-full justify-end"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {userData?.data.image ? (
                  <img
                    src={userData.data.image}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <CircleUser className="h-8 w-8" />
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/")}>
                Home
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <ol className="list-reset flex items-center bg-gray-200 px-2 py-1 rounded-sm">
              {pathSegments.map((segment, index) => {
                return (
                  <li key={index} className="flex items-center">
                    <span className="text-gray-600 hover:text-gray-800">
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </span>
                    {index < pathSegments.length - 1 && (
                      <ChevronRight className="mx-2 text-gray-400" />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
          <div
            className="flex flex-1  p-5 rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
