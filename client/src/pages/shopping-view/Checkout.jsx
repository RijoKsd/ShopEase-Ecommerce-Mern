import Address from "@/components/shopping-view/Address";
import bgImg from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/CartContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createOrder } from "@/store/shop/order-slice";

export default function ShoppingCheckout() {
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStarted, setIsPaymentStarted] = useState(false);
  const { cartItems } = useSelector((store) => store.shopCart);
  const { user } = useSelector((store) => store.auth);
  const { approvalURL } = useSelector((store) => store.shopOrder);

  const dispatch = useDispatch();

  const totalCartAmount = cartItems.items?.reduce(
    (sum, currentItem) =>
      sum +
      (currentItem?.salePrice > 0
        ? currentItem?.salePrice
        : currentItem?.price) *
        currentItem?.quantity,
    0
  );
  //   for paypal payment
  function handleInitializePayment() {
    const orderData = {
      userId: user?.id,
      cartId: cartItems._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        quantity: item?.quantity,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        title: item?.title,
        image: item?.image,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateData: new Date(),
      paymentId: "",
      payerId: "",
    };
    dispatch(createOrder(orderData)).then((data) => {
       if (data?.payload?.success) {
         setIsPaymentStarted(true);
      } else {
        setIsPaymentStarted(false);
      }
    });
  }

  if(approvalURL) {
    window.location.href = approvalURL
  }


  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={bgImg}
          alt="dress image"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        {/* Address component is used here to show address and edit, delete and add address */}
        <Address
          setCurrentSelectedAddress={setCurrentSelectedAddress}
          currentSelectedAddress={currentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {/* The cartItems will show the items in the cart list */}
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item?.productId} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-8">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button className="w-full" onClick={handleInitializePayment}>
              {" "}
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
