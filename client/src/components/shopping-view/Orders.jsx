import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function ShoppingOrders() {
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
              <TableHead >
                 Action
              </TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow >
              <TableCell> 123</TableCell>
              <TableCell> 123</TableCell>
              <TableCell> 123</TableCell>
              <TableCell> 123</TableCell>
              <TableCell>
                <Button> View Details</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
