import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleUpdateAddress,
  currentSelectedAddress,
  setCurrentSelectedAddress, 
}) {
  return (
    <Card
      onClick={() =>
        setCurrentSelectedAddress
          ? setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer ${
        currentSelectedAddress?._id === addressInfo?._id
          ? "outline outline-2 outline-primary "
          : ""
      } `}
    >
      <CardContent className="grid gap-4 p-4">
        <Label>
          <span className="font-bold">Address: </span>
          {addressInfo?.address}
        </Label>
        <Label>
          <span className="font-bold">City: </span>
          {addressInfo?.city}
        </Label>
        <Label>
          <span className="font-bold">Pincode: </span>
          {addressInfo?.pincode}
        </Label>
        <Label>
          <span className="font-bold">Phone: </span>
          {addressInfo?.phone}
        </Label>
        <Label>
          <span className="font-bold">Notes: </span>
          {addressInfo?.notes}
        </Label>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button
          variant="outline"
          onClick={() => handleUpdateAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
