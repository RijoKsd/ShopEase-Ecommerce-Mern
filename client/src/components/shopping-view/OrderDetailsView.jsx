import   { useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
 
export default function ShoppingOrderDetailsView() {
  return (
    <DialogContent className="sm:max-w-[600px]">
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
      </div>
    </DialogContent>
  );
}
