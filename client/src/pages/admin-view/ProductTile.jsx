import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function AdminProductTile({
  product,
  setFormData,
  handleDelete,
  setCurrentEditedId,
  setOpenCreateProduct,
}) {
  return (
    <Card className=" w-full max-w-sm mx-auto">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px]  object-cover
          rounded-t-lg"
        />
      </div>
      <CardContent>
        <h2 className="text-xl font-bold my-2">{product?.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span
            className={` ${
              product?.salePrice > 0 ? "line-through" : null
            } text-lg font-semibold text-primary`}
          >
            ${product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-bold"> ${product?.salePrice}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button onClick = {
          ()=> {
            setCurrentEditedId(product._id);
            setOpenCreateProduct(true);
            setFormData(product);
          }
        }>Edit</Button>
        <Button variant="destructive" onClick={() => handleDelete(product._id)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
