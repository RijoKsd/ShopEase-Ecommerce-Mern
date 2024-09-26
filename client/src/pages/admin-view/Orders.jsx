import AdminOrdersView from "@/components/admin-view/AdminOrdersView";
import { useState } from "react";

export default function Orders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  return (
    <AdminOrdersView
      openDetailsDialog={openDetailsDialog}
      setOpenDetailsDialog={setOpenDetailsDialog}
    />
  );
}
