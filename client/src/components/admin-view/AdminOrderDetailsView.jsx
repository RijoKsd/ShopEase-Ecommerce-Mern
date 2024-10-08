import React, { useState } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/Form";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/order-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  status: "",
};
export default function AdminOrderDetailsView({ orderDetails }) {
  const [formData, setFormData] = useState(initialState);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const {toast} = useToast();

  function handleSubmit() {
     dispatch(
      updateOrderStatus({
        id: orderDetails?._id,
        orderStatus: formData.status,
      })
    ).then(data=>{
      if(data?.payload?.success){
        dispatch(getOrderDetailsForAdmin(orderDetails?._id))
        dispatch(getAllOrdersForAdmin());
        setFormData(initialState)
        toast({
          title: data?.payload?.message,
          className: "bg-green-500 text-white",
          duration: 2000,
        });
      }
    })
  }

  return (
    <DialogContent className="sm:max-w-[600px]  h-full overflow-auto ">
      <DialogTitle>Order Details</DialogTitle>
      <div className="grid gap-6  ">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label> {orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label> {orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Total</p>
            <Label>$ {orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium"> Payment Method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium"> Payment Status</p>
            <Label> {orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-500"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className=" grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems?.map((item) => (
                    <li className="flex items-center justify-between">
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>

        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0 5 text-muted-foreground">
              <span> Name: {user?.userName}</span>
              <span>Address: {orderDetails?.addressInfo?.address}</span>
              <span>City : {orderDetails?.addressInfo?.city}</span>
              <span>Pincode : {orderDetails?.addressInfo?.pincode}</span>
              <span>Phone : {orderDetails?.addressInfo?.phone}</span>
              <span>Notes : {orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "Select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "rejected", label: "Rejected" },
                  { id: "delivered", label: "Delivered" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </DialogContent>
  );
}
