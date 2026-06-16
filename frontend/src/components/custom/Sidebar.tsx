import clsx from "clsx";
import { Link } from "react-router-dom";

import {
  ArrowLeftRight,
  BookCheck,
  Landmark,
  LayoutDashboard,
  NotebookPen,
  Package2,
  ShoppingCart,
  TicketPercent,
  Users,
} from "lucide-react";

export const sidebarItems = [
  {
    text: "Dashboard",
    link: "/",
    icon: LayoutDashboard,
  },
  {
    text: "Customers",
    link: "/customers",
    icon: Users,
  },
  {
    text: "Products",
    link: "/products",
    icon: Package2,
  },
  {
    text: "Discounts",
    link: "/discounts",
    icon: TicketPercent,
  },
  {
    text: "RMA",
    link: "/rma",
    icon: ArrowLeftRight,
  },
  {
    text: "Orders",
    link: "/orders",
    icon: ShoppingCart,
  },
  {
    text: "Invoices",
    link: "/invoices",
    icon: Landmark,
  },
  {
    text: "Courses",
    link: "/courses",
    icon: BookCheck,
  },
  {
    text: "Questions",
    link: "/tests",
    icon: NotebookPen,
  },
] as const;

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={clsx(
        "dark:bg-black bg-black text-stone-100 dark:text-stone-100 h-full transition-all duration-300 border-r border-stone-500 hidden lg:flex justify-start items-center flex-col lg:gap-y-1 lg:px-1.5 lg:py-2",
        isOpen ? "w-48" : "w-12 px-1",
        "overflow-hidden",
      )}
    >
      {sidebarItems.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.link}
            className="bg-transparent text-stone-100 dark:text-stone-100 w-full shadow-none flex justify-between items-center lg:px-1.5 lg:py-2 text-base font-normal hover:bg-gray-500/30 rounded-sm"
          >
            <Link to={item.link}>
              <span className="flex items-center gap-x-2 text-[15px] text-[#ABB9E8] hover:text-stone-50 transition duration-300 font-work">
                <Icon
                  size={20}
                  className="min-w-[20px] min-h-[20px] stroke-[1.5] mr-2"
                />

                {item.text}
              </span>

              <span />
            </Link>
          </button>
        );
      })}
    </aside>
  );
};

export default Sidebar;
