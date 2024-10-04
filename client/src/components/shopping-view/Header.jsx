import { Button } from "../ui/button";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
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
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
 import { Avatar, AvatarFallback } from "../ui/avatar";
import { logout } from "@/store/auth-slice";
import UserCartWrapper from "./CartWrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

export default function ShoppingHeader() {

  //  This function renders the nav links
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams,  setSearchParams] = useSearchParams();
  const MenuItems = () => {

    function handleNavigate(currentMenuItem) {
       sessionStorage.removeItem("filters");
      const currentFilter =
        currentMenuItem.id !== "home" && currentMenuItem.id !== "products"
          ? {
              category: [currentMenuItem.id],
            }
          : null;
      sessionStorage.setItem("filters", JSON.stringify(currentFilter));
      location.pathname.includes("listing") && currentFilter !== null
        ? setSearchParams(
            new URLSearchParams(`?category=${currentMenuItem.id}`)
          )
        : navigate(currentMenuItem.path);
    }

 

    return (
      <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
        {shoppingViewHeaderMenuItems.map((item) => (
          <Label
            key={item.id}
            className="text-sm font-medium cursor-pointer"
            onClick={() => handleNavigate(item)}
          >
            {item.label}
          </Label>
        ))}
      </nav>
    );
  };

  const HeaderRightContent = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [openCart, setOpenCart] = useState(false);
    const { cartItems } = useSelector((store) => store.shopCart);

    const handleLogout = () => {
      dispatch(logout());
    };

    useEffect(() => {
      dispatch(fetchCartItems(user?.id));
    }, [dispatch, openCart]);

    return (
      <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpenCart(true)}
          >
            <ShoppingCart className="w-6 h-6" />

            <span className="sr-only">Cart</span>
          </Button>
          {/* for viewing cart items */}
          <UserCartWrapper
            setOpenCart = {setOpenCart}
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
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
