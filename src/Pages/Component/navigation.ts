export type NavIconName =
  | "overview"
  | "orders"
  | "vendors"
  | "riders"
  | "finance"
  | "validation"
  | "network";

export type AppNavItem = {
  label: string;
  to: string;
  icon: NavIconName;
  count?: string;
  primary: boolean;
};

export const iconPaths: Record<NavIconName, string> = {
  overview: "M4 11.5V20h6v-5.5H14V20h6v-8.5L12 4 4 11.5Z",
  orders: "M5 6h14l-1 13H6L5 6Zm2 3h10M8 13h8M8 16h5",
  vendors: "M7 18v-2a5 5 0 0 1 10 0v2M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 18v-1.2a4 4 0 0 1 3-3.9M5.5 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  riders: "M6 17a3 3 0 1 0 0.01 0Zm12-1.5-3.5-1.2-1.7-4.3H9.5L8.2 6.7H5m9 9h-2.2L11 12.5m1.5-4.5h3.2l1.3 3.3",
  finance: "M12 6v12m-3.5-8.5A3.5 3.5 0 0 1 12 6.8c1.9 0 3.5 1 3.5 2.7S14.3 13 12 13s-3.5 1.1-3.5 2.5S10.1 18 12 18a3.6 3.6 0 0 0 3.2-1.8",
  validation: "M12 3 4.5 7v5.8C4.5 16.9 7.9 20 12 21c4.1-1 7.5-4.1 7.5-8.2V7L12 3Zm-1 11 5-5-1.4-1.4-3.6 3.6-1.6-1.6L8 11l3 3Z",
  network: "M7 7a2 2 0 1 0 0.01 0ZM17 7a2 2 0 1 0 0.01 0ZM12 17a2 2 0 1 0 0.01 0ZM8.7 8.3l2.1 2.1M15.3 8.3l-2.1 2.1M9.2 16.1l1.6-2.1m3.3 2.1-1.6-2.1",
};

export const appNavItems: AppNavItem[] = [
  { label: "Overview", to: "/overview", icon: "overview", primary: true },
  { label: "Orders", to: "/orders", icon: "orders", count: "14", primary: true },
  { label: "Vendors", to: "/vendors", icon: "vendors", count: "10", primary: true },
  { label: "Riders", to: "/riders", icon: "riders", count: "15", primary: true },
  { label: "Finance", to: "/finance", icon: "finance", primary: true },
  { label: "Validation", to: "/validation", icon: "validation", primary: false },
  { label: "Network Brain", to: "/network-brain", icon: "network", primary: false },
];

export const bottomNavItems = appNavItems.filter((item) => item.primary);

export function normalizeRoute(pathname: string): string {
  if (pathname === "/dashboard") {
    return "/overview";
  }

  return pathname;
}
