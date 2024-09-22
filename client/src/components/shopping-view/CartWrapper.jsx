import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./CartContent";

export default function UserCartWrapper({ cartItems }) {
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
          <span className="font-bold">$1000</span>
        </div>
      </div>
      <Button className="mt-6 w-full">Checkout</Button>
    </SheetContent>
  );
}
