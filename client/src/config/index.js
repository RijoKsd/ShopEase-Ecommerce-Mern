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
