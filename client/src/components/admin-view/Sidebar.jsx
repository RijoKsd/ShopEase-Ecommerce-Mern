import { Fragment } from "react";
import { Menu, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { adminSidebarMenuItems } from "@/config";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function MenuItems({ navigate, setOpen }) {
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menu) => (
        <div
          key={menu.id}
          onClick={() => {
            navigate(menu.path);
            setOpen ? setOpen(false) : null;
          }}
          className="flex items-center gap-2 rounded-md px-3 py-2 cursor-pointer text-muted-foreground hover:bg:muted hover:text-foreground text-lg"
        >
          <menu.icon size={20} />

          <span> {menu.label}</span>
        </div>
      ))}
    </nav>
  );
}

export default function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 ">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b `">
              <SheetTitle className="flex items-center gap-2 my-5">
                <Settings size={30} />
                <p className="text-2xl font-extrabold ">Admin Panel</p>
              </SheetTitle>
            </SheetHeader>
            <MenuItems navigate={navigate} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col  border-4 bg-background p-6 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <Settings size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems navigate={navigate} />
      </aside>
    </Fragment>
  );
}
