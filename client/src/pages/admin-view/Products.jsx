import { Button } from "@/components/ui/button";
import { Fragment, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/Form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  deleteProduct,
  addNewProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "./ProductTile";

const initialState = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};
export default function AdminProducts() {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProducts);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  function handleSubmit() {
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "data after edit");
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setOpenCreateProduct(false);
            setCurrentEditedId(null);
            setFormData(initialState);
            toast({
              title: "Product Updated Successfully",
              className: "bg-green-500 text-white",
              duration: 2000,
            });
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        )
          .then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setImageFile(null);
              setUploadedImageUrl("");
              setFormData(initialState);
              toast({
                title: "Product Added Successfully",
                className: "bg-green-500 text-white",
                duration: 2000,
              });
              setOpenCreateProduct(false);
            }
          })
          .catch((err) => console.error("Error in adding product", err));
  }

  // This function check if the form has value for all the fields or not and return true or false
  // if the form return false, it will disable the submit button
  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  const handleDelete = (id) =>{
    dispatch(deleteProduct(id)).then((data)=>{
       if(data?.payload?.success){
        dispatch(fetchAllProducts());
        toast({
          title: "Product Deleted Successfully",
          className: "bg-green-500 text-white",
          duration: 2000,
        })
      }
    })
  }

  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full ">
        <Button onClick={() => setOpenCreateProduct(true)}>
          Create Product
        </Button>
      </div>
      {/* This is for displaying all the products */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 ">
        {products && products.length > 0
          ? products.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                product={productItem}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProduct={setOpenCreateProduct}
                setFormData={setFormData}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      {/*   This is for opening the the sidebar for adding new product */}
      <Sheet
        open={openCreateProduct}
        onOpenChange={() => {
          setOpenCreateProduct(false);
          setCurrentEditedId(null);
          setFormData(initialState);
          setImageFile(null);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle className=" my-5">
              {currentEditedId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoading={setImageLoading}
            imageLoading={imageLoading}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              buttonText={currentEditedId ? "Update Product" : "Add Product"}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}
