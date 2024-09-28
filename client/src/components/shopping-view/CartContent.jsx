import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateCartQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

export default function UserCartItemsContent({ cartItem }) {
 
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { toast } = useToast();

  function handleUpdateQuantity(cartItem, action) {
    dispatch(
      updateCartQuantity({
        userId: user?.id,
        productId: cartItem?.productId,
        quantity:
          action === "plus" ? cartItem?.quantity + 1 : cartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        console.log("data dispatch");
        toast({
          title: "Quantity Updated Successfully",
          className: "bg-green-500 text-white",
          duration: 2000,
        });
      }
    });
  }
  function handleCartItemDelete(currentItem) {
    dispatch(
      deleteFromCart({ userId: user?.id, productId: currentItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
          duration: 2000,
        });
      }
    });
  }
  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex gap-2 items-center mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
            disabled={cartItem?.quantity === 1}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Minus</span>
          </Button>
          <span className="font-semibold"> {cartItem?.quantity}</span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Plus</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash
          className="mt-1 cursor-pointer"
          size={20}
          onClick={() => handleCartItemDelete(cartItem)}
        />
      </div>
    </div>
  );
}
