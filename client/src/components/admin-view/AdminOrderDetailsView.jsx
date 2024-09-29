import React, { useState } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/Form";


const initialState = {
  status: ''
}
export default function AdminOrderDetailsView() {
  const [ formData, setFormData] = useState(initialState)

  function handleSubmit() {
    console.log(formData)
  }
  
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogTitle>Order Details</DialogTitle>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label> 123</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label> 123</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Total</p>
            <Label> 123</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label> In Process</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className=" grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>Price</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0 5 text-muted-foreground">
              <span>Rijo</span>
              <span>Address</span>
              <span>city</span>
              <span>pincode</span>
              <span>phone number</span>
              <span>notes</span>
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
                  {id: "delivered", label: "Delivered"},
                  
                ],
              },
            ]}
            formData = {formData}
            setFormData={setFormData}
            buttonText= { "Update Order Status"}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </DialogContent>
  );
}
