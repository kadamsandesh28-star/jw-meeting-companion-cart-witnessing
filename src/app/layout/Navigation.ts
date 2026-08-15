import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import MapIcon from "@mui/icons-material/Map";
import EventIcon from "@mui/icons-material/Event";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import { SvgIconComponent } from "@mui/icons-material";

export interface NavigationItem {
  title: string;
  path: string;
  icon: SvgIconComponent;
  section: string;
}

export const navigationItems: NavigationItem[] = [
  {
    section: "General",
    title: "Dashboard",
    path: "/",
    icon: DashboardIcon,
  },

  {
    section: "Congregation",
    title: "Publishers",
    path: "/congregation/publishers",
    icon: PeopleIcon,
  },
  {
    section: "Congregation",
    title: "Body of Elders",
    path: "/congregation/body-of-elders",
    icon: BusinessIcon,
  },
  {
    section: "Congregation",
    title: "Service Groups",
    path: "/congregation/service-groups",
    icon: GroupIcon,
  },
  {
    section: "Congregation",
    title: "Territories",
    path: "/congregation/territories",
    icon: MapIcon,
  },
  {
    section: "Congregation",
    title: "Cart Witnessing",
    path: "/congregation/cart-witnessing",
    icon: EventIcon,
  },

  {
    section: "Meetings",
    title: "Meetings",
    path: "/meetings",
    icon: EventIcon,
  },
  {
    section: "Meetings",
    title: "Assignments",
    path: "/assignments",
    icon: AssignmentIcon,
  },

  {
    section: "Reports",
    title: "Reports",
    path: "/reports",
    icon: AssessmentIcon,
  },

  {
    section: "Administration",
    title: "Settings",
    path: "/settings",
    icon: SettingsIcon,
  },
];