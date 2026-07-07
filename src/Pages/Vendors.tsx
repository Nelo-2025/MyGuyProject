import { useMemo, useState } from "react";
import AdminShell from "./Component/AdminShell.tsx";

type VendorTier = "Premium" | "Standard" | "Basic";
type VendorStatus = "ACTIVE" | "PENDING";

type VendorRecord = {
  id: string;
  initials: string;
  storeName: string;
  businessCategory: "Food" | "Fashion" | "Beauty";
  tierPlanLevel: VendorTier;
  ordersWk: number;
  revenueWk: number;
  rating: number;
  operationalStatus: VendorStatus;
  pendingDeposit: boolean;
};

type VendorTab = "all" | "active" | "pending";

const vendors: VendorRecord[] = [
  { id: "v-001", initials: "DK", storeName: "Daddy K", businessCategory: "Food", tierPlanLevel: "Premium", ordersWk: 196, revenueWk: 112800, rating: 4.8, operationalStatus: "ACTIVE", pendingDeposit: false },
  { id: "v-002", initials: "CR", storeName: "Crunchies", businessCategory: "Food", tierPlanLevel: "Standard", ordersWk: 152, revenueWk: 84200, rating: 4.7, operationalStatus: "ACTIVE", pendingDeposit: false },
  { id: "v-003", initials: "MN", storeName: "Mama Ngozi", businessCategory: "Food", tierPlanLevel: "Basic", ordersWk: 94, revenueWk: 47300, rating: 4.5, operationalStatus: "PENDING", pendingDeposit: true },
  { id: "v-004", initials: "BF", storeName: "Bella Fashion Hub", businessCategory: "Fashion", tierPlanLevel: "Premium", ordersWk: 121, revenueWk: 96500, rating: 4.9, operationalStatus: "ACTIVE", pendingDeposit: false },
  { id: "v-005", initials: "GL", storeName: "Glow Lab", businessCategory: "Beauty", tierPlanLevel: "Standard", ordersWk: 88, revenueWk: 53400, rating: 4.6, operationalStatus: "ACTIVE", pendingDeposit: false },
  { id: "v-006", initials: "PC", storeName: "Prime Cuts", businessCategory: "Food", tierPlanLevel: "Basic", ordersWk: 72, revenueWk: 39100, rating: 4.3, operationalStatus: "PENDING", pendingDeposit: true },
  { id: "v-007", initials: "SW", storeName: "Style Wave", businessCategory: "Fashion", tierPlanLevel: "Standard", ordersWk: 83, revenueWk: 44600, rating: 4.4, operationalStatus: "ACTIVE", pendingDeposit: false },
  { id: "v-008", initials: "NT", storeName: "Natura Touch", businessCategory: "Beauty", tierPlanLevel: "Premium", ordersWk: 134, revenueWk: 101300, rating: 4.8, operationalStatus: "ACTIVE", pendingDeposit: false },
  { id: "v-009", initials: "QS", storeName: "Quick Spices", businessCategory: "Food", tierPlanLevel: "Basic", ordersWk: 67, revenueWk: 32800, rating: 4.2, operationalStatus: "PENDING", pendingDeposit: true },
  { id: "v-010", initials: "BV", storeName: "Breezy Vogue", businessCategory: "Fashion", tierPlanLevel: "Standard", ordersWk: 109, revenueWk: 75800, rating: 4.6, operationalStatus: "ACTIVE", pendingDeposit: false },
];

const tabs: Array<{ key: VendorTab; label: string }> = [
  { key: "all", label: "All 10" },
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending deposit" },
];

function formatCompactCurrency(value: number) {
  const compact = value / 1000;
  return `₦${compact.toFixed(1)}k`;
}

function Vendors() {
  const [activeTab, setActiveTab] = useState<VendorTab>("all");

  const filteredVendors = useMemo(() => {
    if (activeTab === "active") {
      return vendors.filter((vendor) => vendor.operationalStatus === "ACTIVE");
    }

    if (activeTab === "pending") {
      return vendors.filter((vendor) => vendor.pendingDeposit);
    }

    return vendors;
  }, [activeTab]);

  const tabCounts = useMemo(
    () => ({
      all: vendors.length,
      active: vendors.filter((vendor) => vendor.operationalStatus === "ACTIVE").length,
      pending: vendors.filter((vendor) => vendor.pendingDeposit).length,
    }),
    [],
  );

  return (
    <AdminShell title="Vendors">
      <section className="mg-simple-content">
        <div className="mg-heading-row">
          <div>
            <p className="mg-eyebrow">Merchant Performance Monitoring</p>
            <h3>Vendors Profile Directory</h3>
            <p className="mg-overview-note">Tracks commercial merchant performance parameters, registered business types, and administrative subscription metrics.</p>
          </div>
        </div>

        <article className="mg-panel mg-vendors-panel">
          <div className="mg-panel-head">
            <h4>Vendor Directory</h4>
            <span className="mg-orders-total">{filteredVendors.length} visible</span>
          </div>

          <div className="mg-vendors-tabs" role="tablist" aria-label="Vendor list filters">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={activeTab === tab.key ? "active" : ""}
                onClick={() => setActiveTab(tab.key)}
              >
                <span>{tab.label}</span>
                <strong>{tabCounts[tab.key]}</strong>
              </button>
            ))}
          </div>

          <div className="mg-table-wrap">
            <table className="mg-vendors-table">
              <thead>
                <tr>
                  <th>Vendor Block</th>
                  <th>Business Category</th>
                  <th>Tier Plan Level</th>
                  <th>Orders (Wk)</th>
                  <th>Revenue (Wk)</th>
                  <th>Rating</th>
                  <th>Operational Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id}>
                    <td>
                      <div className="mg-vendor-block">
                        <span className="mg-vendor-initials">{vendor.initials}</span>
                        <div>
                          <strong>{vendor.storeName}</strong>
                        </div>
                      </div>
                    </td>
                    <td>{vendor.businessCategory}</td>
                    <td>
                      <span className={`mg-tier-pill ${vendor.tierPlanLevel.toLowerCase()}`}>{vendor.tierPlanLevel}</span>
                    </td>
                    <td className="mono">{vendor.ordersWk}</td>
                    <td className="mono">{formatCompactCurrency(vendor.revenueWk)}</td>
                    <td>
                      <span className="mg-rating-pill">{vendor.rating.toFixed(1)}</span>
                    </td>
                    <td>
                      <span className={`mg-vendor-status ${vendor.operationalStatus.toLowerCase()}`}>{vendor.operationalStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </AdminShell>
  );
}

export default Vendors;