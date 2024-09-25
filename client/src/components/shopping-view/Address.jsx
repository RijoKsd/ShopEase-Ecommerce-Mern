import { useEffect, useState } from "react";
import { addressFormControls } from "../../config";
import CommonForm from "../common/Form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import { useToast } from "@/hooks/use-toast";
import AddressCard from "./AddressCard";

const initialState = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};
export default function Address() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const { addresses } = useSelector((store) => store.shopAddress);

  function handleSubmit() {
    if (addresses.length >= 3 && currentEditedId === null) {
      setFormData(initialState);
      toast({
        title: "Maximum 3 addresses allowed",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(fetchAllAddresses({ userId: user?.id }));
            setCurrentEditedId(null);
            setFormData(initialState);
            toast({
              title: data?.payload?.message,
              className: "bg-green-500 text-white",
              duration: 2000,
            });
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            setFormData(initialState);
            toast({
              title: data?.payload?.message,
              className: "bg-green-500 text-white",
              duration: 2000,
            });
            dispatch(fetchAllAddresses({ userId: user?.id }));
          }
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  // Delete address
  function handleDeleteAddress(currentAddress) {
    dispatch(
      deleteAddress({ userId: user?.id, addressId: currentAddress._id })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
          className: "bg-green-500 text-white",
          duration: 2000,
        });
        dispatch(fetchAllAddresses({ userId: user?.id }));
      }
    });
  }

  // Update address
  function handleUpdateAddress(currentAddress) {
    console.log(currentAddress, "update current address");
    setCurrentEditedId(currentAddress._id);
    setFormData({
      ...formData,
      address: currentAddress.address,
      city: currentAddress.city,
      phone: currentAddress.phone,
      pincode: currentAddress.pincode,
      notes: currentAddress.notes,
    });
  }

  useEffect(() => {
    dispatch(fetchAllAddresses({ userId: user?.id }));
  }, [dispatch]);
  return (
    <Card>
      {/* All saved address will list here */}
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {addresses && addresses.length > 0
          ? addresses.map((address) => (
              <AddressCard
                key={address._id}
                addressInfo={address}
                handleUpdateAddress={handleUpdateAddress}
                handleDeleteAddress={handleDeleteAddress}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {" "}
          {currentEditedId ? "Update Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          buttonText={currentEditedId ? "Update Address" : "Add Address"}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}
