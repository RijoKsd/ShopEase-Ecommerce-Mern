import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./OrderDetailsView";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUser } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
 
export default function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.shopOrder);

  console.log(orderList, "orderList");
  useEffect(() => {
    dispatch(getAllOrdersByUser(user?.id));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle> Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Id</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0 ? (
              orderList.map((orderItem) => (
                <TableRow>
                  <TableCell> {orderItem?._id}</TableCell>
                  <TableCell> {orderItem?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge className={`py-1 px-3 ${orderItem.orderStatus === "confirmed" ? "bg-green-500" : "bg-black"}`}> {orderItem?.orderStatus}</Badge>
                  </TableCell>
                  <TableCell>$ {orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={setOpenDetailsDialog}
                    >
                      <Button onClick={() => setOpenDetailsDialog(true)}>
                        View Details
                      </Button>
                      <ShoppingOrderDetailsView />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <h1>No Orders Found</h1>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
