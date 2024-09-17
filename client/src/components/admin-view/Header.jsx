import { logout } from "@/store/auth-slice";
import { Button } from "../ui/button";
import { AlignJustify, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";

export default function AdminHeader({ open, setOpen }) {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }
  return (
    <header className="flex items-center justify-center px-4 py-3 bg-background border-b ">
      <Button className="lg:hidden sm:block" onClick={() => setOpen(!open)}>
        <AlignJustify />
        <span className="sr-only"> Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
          onClick={handleLogout}
        >
          <LogOut /> Logout
        </Button>
      </div>
    </header>
  );
}
