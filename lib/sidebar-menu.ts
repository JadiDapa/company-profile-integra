import { UserRole } from "@/generated/prisma";
import {
  Home,
  Settings,
  LucideIcon,
  Server,
  UserRoundCogIcon,
  Ticket,
  Image,
  FileText,
} from "lucide-react";

type SubmenuItem = {
  title: string;
  url: string;
  roles?: UserRole[];
};

type MenuItem = {
  title: string;
  url?: string;
  icon: LucideIcon;
  submenu?: SubmenuItem[];
  roles?: UserRole[];
};

export const technicianItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Perangkat",
    url: "/dashboard/devices",
    icon: Server,
  },
  {
    title: "Tiket Saya",
    url: "/dashboard/my-tickets",
    icon: Ticket,
  },
];

export const adminItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Perangkat",
    url: "/dashboard/devices",
    icon: Server,
  },
  {
    title: "Tiket",
    url: "/dashboard/tickets",
    icon: Ticket,
  },
  {
    title: "Galeri",
    url: "/dashboard/galleries",
    icon: Image,
  },
  {
    title: "Aktivitas",
    url: "/dashboard/activities",
    icon: FileText,
  },
];

export const settingsItems = [
  {
    title: "Profil",
    url: "/profile",
    icon: UserRoundCogIcon,
  },
  {
    title: "Pengaturan",
    url: "/settings",
    icon: Settings,
  },
];

export const canSee = (role: UserRole, roles?: UserRole[]) =>
  !roles || roles.includes(role);

export const filterMenuByRole = (items: MenuItem[], role: UserRole) => {
  return items
    .filter((item) => canSee(role, item.roles))
    .map((item) => {
      if (!item.submenu) return item;

      const submenu = item.submenu.filter((sub) => canSee(role, sub.roles));

      // If a group ends up with no visible sub-items, hide the whole group
      if (submenu.length === 0) return null;

      return { ...item, submenu };
    })
    .filter(Boolean) as MenuItem[];
};
