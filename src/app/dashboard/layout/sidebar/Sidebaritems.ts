import { uniqueId } from "lodash";

export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
  disabled?: boolean;
  subtitle?: string;
  badge?: boolean;
  badgeType?: string;
  isPro?: boolean;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
  disabled?: boolean;
  subtitle?: string;
  badgeType?: string;
  badge?: boolean;
  isPro?: boolean;
}

const SidebarContent: MenuItem[] = [
  {
    heading: "Dashboards",
    children: [
      {
        name: "Dashboard",
        icon: "solar:widget-2-linear",
        id: uniqueId(),
        url: "/dashboard",
        isPro: false,
      },

      {
        name: "Front Pages",
        id: uniqueId(),
        icon: "solar:document-linear",
        url: "#",
        children: [
          {
            name: "Pricing",
            id: uniqueId(),
            url: "https://material-m-nextjs-main.vercel.app/frontend-pages/pricing",
            isPro: true,
          },
        ],
      },
    ],
  },

  {
    heading: "Utilities",
    children: [
      {
        name: "Typography",
        icon: "solar:text-circle-outline",
        id: uniqueId(),
        url: "/dashboard/utilities/typography",
      },
      {
        name: "Table",
        icon: "solar:server-linear",
        id: uniqueId(),
        url: "/dashboard/utilities/table",
      },
      {
        name: "Form",
        icon: "solar:document-add-linear",
        id: uniqueId(),
        url: "/dashboard/utilities/form",
      },

      {
        id: uniqueId(),
        name: "User Profile",
        icon: "solar:user-circle-linear",
        url: "/dashboard/user-profile",
        isPro: false,
      },
    ],
  },
  {
    heading: "Apps",
    children: [
      {
        id: uniqueId(),
        name: "Notes",
        icon: "solar:notes-linear",
        url: "/dashboard/apps/notes",
        isPro: false,
      },
      {
        id: uniqueId(),
        name: "Tickets",
        icon: "solar:ticker-star-linear",
        url: "/dashboard/apps/tickets",
        isPro: false,
      },

      {
        name: "Blogs",
        id: uniqueId(),
        url: "#",
        icon: "solar:sort-by-alphabet-linear",
        children: [
          {
            id: uniqueId(),
            name: "Blog Post",
            url: "/dashboard/apps/blog/post",
            isPro: false,
          },
          {
            id: uniqueId(),
            name: "Blog Detail",
            url: "/dashboard/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow",
            isPro: false,
          },
        ],
      },
    ],
  },

  {
    heading: "Extra",
    isPro: false,
    children: [
      {
        name: "Icons",
        icon: "solar:smile-circle-outline",
        id: uniqueId(),
        url: "/dashboard/icons/solar",
        isPro: false,
      },
      {
        name: "Sample Page",
        icon: "solar:notes-minimalistic-outline",
        id: uniqueId(),
        url: "/dashboard/sample-page",
        isPro: false,
      },
    ],
  },
];

export default SidebarContent;
