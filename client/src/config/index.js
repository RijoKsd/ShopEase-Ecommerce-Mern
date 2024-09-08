import { LayoutDashboard, ShoppingBag, ClipboardList } from "lucide-react";

// This is the input fields for the register form
export const registerFormControls = [
  {
    name: "userName",
    type: "text",
    placeholder: "Enter your user name",
    componentType: "Input",
    label: "User Name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    componentType: "Input",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    componentType: "Input",
    label: "Password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    componentType: "Input",
    label: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    componentType: "Input",
    label: "Password",
  },
];

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "products",
    label: "Products",
    icon: ShoppingBag,
    path: "/admin/products",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ClipboardList,
    path: "/admin/orders",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "Input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "Textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "Select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "Select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "Input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "Input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "Input",
    type: "number",
    placeholder: "Enter total stock",
  },
];
