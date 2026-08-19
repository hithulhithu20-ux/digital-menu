import { LayoutDashboard, ClipboardList, Package, Tag, Sparkles, QrCode, Users, HandHelping,  BarChart3, Settings } from "lucide-react";

export const sidebarItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    path: "/admin/overview",
  },
  {
    id: "orders",
    label: "Orders",
    icon: ClipboardList,
    path: "/admin/orders",
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
    path: "/admin/products",
  },
  {
    id: "offers",
    label: "Offers",
    icon: Tag,
    path: "/admin/offers",
  },
  {
    id: "specials",
    label: "Today's Specials",
    icon: Sparkles,
    path: "/admin/specials",
  },
  {
    id: "tables",
    label: "Tables & QR",
    icon: QrCode,
    path: "/admin/tables",
  },
  {
    id: "waiters",
    label: "Waiters",
    icon: Users,
    path: "/admin/waiters",
  },
  {
    id: "help-requests",
    label: "Help Requests",
    icon: HandHelping,
    path: "/admin/help-requests",
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    path: "/admin/reports",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];