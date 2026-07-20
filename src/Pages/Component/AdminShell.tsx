import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SystemTopBar from "./SystemTopBar.tsx";
import { bottomNavItems, iconPaths, normalizeRoute } from "./navigation.ts";

type AdminShellProps = {
  title: string;
  children: ReactNode;
};

function NavIcon({ name }: { name: keyof typeof iconPaths }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={iconPaths[name]} />
    </svg>
  );
}

function AdminShell({ title, children }: AdminShellProps) {
  const { pathname } = useLocation();
  const activeRoute = normalizeRoute(pathname);

  return (
    <div className="mg-dashboard">
      <main className="mg-canvas">
        <SystemTopBar title={title} />
        {children}
        <nav className="mg-mobile-nav" aria-label="Primary mobile navigation">
          {bottomNavItems.map((item) => {
            const isActive = activeRoute === item.to;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={isActive ? "active" : ""}
              >
                <span className="mg-mobile-nav-icon" aria-hidden="true">
                  <NavIcon name={item.icon} />
                </span>
                <span className="mg-mobile-nav-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </main>
    </div>
  );
}

export default AdminShell;
