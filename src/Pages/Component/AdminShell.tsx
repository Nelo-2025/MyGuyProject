import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import SystemTopBar from "./SystemTopBar.tsx";

type SidebarLink = {
  label: string;
  to: string;
  count?: string;
  countClassName?: string;
};

type AdminShellProps = {
  title: string;
  children: ReactNode;
};

const operationsLinks: SidebarLink[] = [
  { label: "Overview", to: "/overview" },
  { label: "Orders", to: "/orders", count: "14", countClassName: "orange" },
  { label: "Vendors", to: "/vendors", count: "10", countClassName: "gray" },
  { label: "Riders", to: "/riders", count: "15", countClassName: "gray" },
  { label: "Finance", to: "/finance" },
];

const growthLinks: SidebarLink[] = [
  { label: "Validation", to: "/validation" },
  { label: "Network Brain", to: "/network-brain" },
];

function SidebarLinkItem({ label, to, count, countClassName }: SidebarLink) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `mg-nav-link${isActive ? " active" : ""}`}
    >
      <span>{label}</span>
      {count ? <span className={`mg-pill ${countClassName ?? ""}`}>{count}</span> : null}
    </NavLink>
  );
}

function AdminShell({ title, children }: AdminShellProps) {
  return (
    <div className="mg-dashboard">
      <aside className="mg-sidenav">
        <div className="mg-brand-wrap">
          <div className="mg-brand-icon">MYGUY</div>
          <div>
            <h1>MYGUY</h1>
            <p>Logistics Management</p>
          </div>
        </div>

        <nav className="mg-nav-list" aria-label="Primary navigation">
          <div className="mg-nav-group">
            <h2>Operation</h2>
            <div className="mg-nav-links">
              {operationsLinks.map((link) => (
                <SidebarLinkItem key={link.to} {...link} />
              ))}
            </div>
          </div>

          <div className="mg-nav-group">
            <h2>Growth</h2>
            <div className="mg-nav-links">
              {growthLinks.map((link) => (
                <SidebarLinkItem key={link.to} {...link} />
              ))}
            </div>
          </div>
        </nav>

        <div className="mg-side-actions">
          <button type="button" className="mg-create-btn">
            Create Shipment
          </button>
          <button type="button" className="mg-nav-item muted">
            Help Center
          </button>
          <button type="button" className="mg-nav-item muted">
            Logout
          </button>
        </div>

        <div className="mg-profile-card" aria-label="Current administrator profile">
          <span className="mg-profile-avatar">EM</span>
          <div>
            <strong>Emmanuel</strong>
            <p>CEO &amp; Admin</p>
          </div>
        </div>
      </aside>

      <main className="mg-canvas">
        <SystemTopBar title={title} />
        {children}
        <nav className="mg-mobile-nav" aria-label="Mobile">
          <button type="button" className="active">
            Dashboard
          </button>
          <button type="button">Fleet</button>
          <button type="button">New</button>
          <button type="button">Alerts</button>
          <button type="button">Profile</button>
        </nav>
      </main>
    </div>
  );
}

export default AdminShell;
