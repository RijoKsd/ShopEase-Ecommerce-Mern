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
import { addNewProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { useToast } from "@/hooks/use-toast";

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
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProducts);
const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, []);

  function handleSubmit() {
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
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
    });
  }
  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full ">
        <Button onClick={() => setOpenCreateProduct(true)}>
          Create Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openCreateProduct}
          onOpenChange={() => {
            setOpenCreateProduct(false);
          }}
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
              <SheetTitle className=" my-5">Add New Product</SheetTitle>
            </SheetHeader>
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoading={setImageLoading}
              imageLoading={imageLoading}
            />
            <div className="py-6">
              <CommonForm
                formControls={addProductFormElements}
                buttonText={"Add Product"}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </Fragment>
  );
}
