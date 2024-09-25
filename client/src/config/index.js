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

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

export const sortOptions = [
  { id: "price-low-to-high", label: "Price: Low to High" },
  { id: "price-high-to-low", label: "Price: High to Low" },
  { id: "title-a-to-z", label: "Title: A to Z" },
  { id: "title-z-to-a", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "Input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "Input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "Input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "Input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "Textarea",
    placeholder: "Enter any additional notes",
  },
];

