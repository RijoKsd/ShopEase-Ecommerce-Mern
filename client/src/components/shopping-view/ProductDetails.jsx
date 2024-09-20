import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
 
export default function ProductDetailsDialog({
  open,
  setOpen,
  productDetails,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        {/* product image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="w-full object-cover aspect-square"
          />
        </div>
        {/* product details */}
        <div>
          {/* product title and description */}
          <div>
            <h1 className="text-3xl font-bold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          {/* product price and sale price */}
          <div className="flex items-center justify-between">
            <p
              className={`${
                productDetails?.salePrice > 0 ? "line-through" : ""
              } text-2xl font-bold text-primary`}
            >
              {" "}
              ${productDetails?.price}
            </p>

            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-primary">
                $ {productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          {/* product rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0 5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
            </div>
            <span>(4.8/5)</span>
          </div>
          {/*  button  */}
          <div className="my-5">
            <Button className="w-full"> Add to cart</Button>
          </div>
          <Separator />

          {/* review section */}
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex gap-2 items-center">
                    <h3 className="font-bold">Rijo Sebastian</h3>
                  </div>
                  {/* view users review */}
                  <div className="flex items-center gap-0 5">
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                    <StarIcon className="w-5 h-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome product
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 my-1 ml-1 flex gap-2">
                <Input placeholder="Add a review" />
                <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
