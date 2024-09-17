import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { House, LogOut, Menu, ShoppingCart, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logout } from "@/store/auth-slice";

export default function ShoppingHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
  //  This function renders the nav links
  const MenuItems = () => {
    return (
      <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {shoppingViewHeaderMenuItems.map((item) => (
          <Link key={item.id} to={item.path} className="text-sm font-medium">
            {item.label}
          </Link>
        ))}
      </nav>
    );
  };

  const HeaderRightContent = () => {
    return (
      <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Button variant="outline" size="icon">
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">Cart</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">
                <span>
                  {user?.userName
                    ?.split(" ")
                    .map((item) => item[0].toUpperCase())}
                </span>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56 ">
            <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <User className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link className="flex items-center gap-2" to="/shop/home">
          <House className="w-6 h-6" />
          <span className="font-bold">ShopEase</span>
        </Link>
        {/* // This is for mobile device hamburger menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="w-6 h-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            {/* // nav links for mobile device */}
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        {/* // Nav links for desktop device */}
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}
