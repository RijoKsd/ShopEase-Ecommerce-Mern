import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./CartContent";
import { useNavigate } from "react-router-dom";

export default function UserCartWrapper({ cartItems, setOpenCart }) {
  const navigate = useNavigate();
  const totalCartAmount = cartItems?.reduce(
    (sum, currentItem) =>
      sum +
      (currentItem?.salePrice > 0
        ? currentItem?.salePrice
        : currentItem?.price) *
        currentItem?.quantity,
    0
  );
  return (
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader>
        <SheetTitle> Your Cart</SheetTitle>
      </SheetHeader>
      {/* cart items */}
      <div className="mt-8 space-y-8  ">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))
          : null}
      </div>
      <div className="mt-8 space-y-8">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">${totalCartAmount.toFixed(2)}</span>
        </div>
      </div>
      <Button
        className="mt-6 w-full"
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCart(false);
        }}
      >
        Checkout
      </Button>
    </SheetContent>
  );
}
