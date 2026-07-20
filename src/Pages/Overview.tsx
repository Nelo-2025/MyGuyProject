import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import AdminShell from "./Component/AdminShell.tsx";

type MetricCard = {
	label: string;
	value: string;
	statusText: string;
	statusType: "up" | "down" | "neutral";
	hint: string;
};

type RevenuePoint = {
	date: string;
	label: string;
	value: number;
};

type ActivityItem = {
	id: string;
	code: "P" | "V" | "O" | "D";
	title: string;
	detail: string;
	time: string;
	tone: "wallet" | "vendor" | "order" | "delivered";
};

type OrderStatus = "IN TRANSIT" | "PREPARING" | "DELIVERED" | "NEW";

type OrderRow = {
	id: string;
	vendorName: string;
	customerName: string;
	assignedRider: string | null;
	status: OrderStatus;
	fulfillmentSource: "App" | "WhatsApp" | "QR card";
	totalPrice: number;
	hasIssue?: boolean;
};

type OrdersTab = "all" | "in-progress" | "delivered" | "issues";

const metrics: MetricCard[] = [
	{
		label: "Revenue Today",
		value: "₦6,312,400",
		statusText: "+18%",
		statusType: "up",
		hint: "Gross Merchandise Value",
	},
	{
		label: "Orders Today",
		value: "128",
		statusText: "14 in progress",
		statusType: "neutral",
		hint: "Raw transaction count",
	},
	{
		label: "Dispatch Acceptance",
		value: "93%",
		statusText: "Stable",
		statusType: "up",
		hint: "11 of 15 riders online now",
	},
	{
		label: "Avg Delivery Time",
		value: "28 min",
		statusText: "-3m / On track",
		statusType: "up",
		hint: "Latency performance today",
	},
];

const revenueTrend: RevenuePoint[] = [
	{ date: "2026-06-12", label: "Jun 12", value: 4280000 },
	{ date: "2026-06-13", label: "Jun 13", value: 4520000 },
	{ date: "2026-06-14", label: "Jun 14", value: 4690000 },
	{ date: "2026-06-15", label: "Jun 15", value: 4870000 },
	{ date: "2026-06-16", label: "Jun 16", value: 4760000 },
	{ date: "2026-06-17", label: "Jun 17", value: 5140000 },
	{ date: "2026-06-18", label: "Jun 18", value: 5360000 },
	{ date: "2026-06-19", label: "Jun 19", value: 5580000 },
	{ date: "2026-06-20", label: "Jun 20", value: 5710000 },
	{ date: "2026-06-21", label: "Jun 21", value: 5480000 },
	{ date: "2026-06-22", label: "Jun 22", value: 5820000 },
	{ date: "2026-06-23", label: "Jun 23", value: 6040000 },
	{ date: "2026-06-24", label: "Jun 24", value: 6180000 },
	{ date: "2026-06-25", label: "Jun 25", value: 6312400 },
];

const liveActivity: ActivityItem[] = [
	{ id: "evt-1", code: "P", title: "Wallet top-up", detail: "Vendor wallet credited with ₦420,000", time: "14:22", tone: "wallet" },
	{ id: "evt-2", code: "V", title: "Vendor online", detail: "Fresh Basket Foods came online in Calabar zone", time: "14:19", tone: "vendor" },
	{ id: "evt-3", code: "O", title: "New order", detail: "Order #MG-93102 assigned to rider AM", time: "14:14", tone: "order" },
	{ id: "evt-4", code: "D", title: "Delivered", detail: "Order #MG-93087 marked delivered in 26 min", time: "14:05", tone: "delivered" },
	{ id: "evt-5", code: "O", title: "New order", detail: "Two same-zone orders auto-batched", time: "13:57", tone: "order" },
	{ id: "evt-6", code: "P", title: "Wallet top-up", detail: "Rider incentive wallet funded for evening rush", time: "13:43", tone: "wallet" },
	{ id: "evt-7", code: "V", title: "Vendor online", detail: "KiloMart completed onboarding checks", time: "13:31", tone: "vendor" },
	{ id: "evt-8", code: "D", title: "Delivered", detail: "Express parcel delivered and customer confirmed", time: "13:20", tone: "delivered" },
];

const ordersRows: OrderRow[] = [
	{ id: "#1294", vendorName: "Daddy K", customerName: "Blessing O.", assignedRider: "Udeme", status: "IN TRANSIT", fulfillmentSource: "App", totalPrice: 4300 },
	{ id: "#1293", vendorName: "Crunchies", customerName: "Walk-in", assignedRider: "Bassey", status: "PREPARING", fulfillmentSource: "WhatsApp", totalPrice: 2500 },
	{ id: "#1292", vendorName: "Mama Ngozi", customerName: "Emeka A.", assignedRider: "Okon", status: "DELIVERED", fulfillmentSource: "QR card", totalPrice: 6100 },
	{ id: "#1291", vendorName: "Daddy K", customerName: "Favour T.", assignedRider: null, status: "NEW", fulfillmentSource: "App", totalPrice: 3700, hasIssue: true },
	{ id: "#1290", vendorName: "Crunchies", customerName: "Chika M.", assignedRider: "Udeme", status: "IN TRANSIT", fulfillmentSource: "WhatsApp", totalPrice: 5400 },
	{ id: "#1289", vendorName: "Mama Ngozi", customerName: "Timi P.", assignedRider: null, status: "PREPARING", fulfillmentSource: "App", totalPrice: 2900 },
	{ id: "#1288", vendorName: "Daddy K", customerName: "Walk-in", assignedRider: "Okon", status: "DELIVERED", fulfillmentSource: "QR card", totalPrice: 8200 },
	{ id: "#1287", vendorName: "Crunchies", customerName: "Eno A.", assignedRider: null, status: "NEW", fulfillmentSource: "App", totalPrice: 1800, hasIssue: true },
];

const ordersTabs: Array<{ key: OrdersTab; label: string }> = [
	{ key: "all", label: "All" },
	{ key: "in-progress", label: "In progress" },
	{ key: "delivered", label: "Delivered" },
	{ key: "issues", label: "Issues" },
];

function Overview() {
	const { pathname } = useLocation();
	const [ordersSearchQuery, setOrdersSearchQuery] = useState("");
	const [activeOrdersTab, setActiveOrdersTab] = useState<OrdersTab>("all");
	const pageTitleMap: Record<string, string> = {
		"/overview": "Overview",
		"/orders": "Orders",
		"/dashboard": "Overview",
		"/finance": "Finance",
		"/validation": "Validation",
		"/network-brain": "Network Brain",
	};
	const pageTitle = pageTitleMap[pathname] ?? "Overview";
	const currencyFormatter = useMemo(
		() =>
			new Intl.NumberFormat("en-NG", {
				style: "currency",
				currency: "NGN",
				maximumFractionDigits: 0,
			}),
		[],
	);

	const isOverviewRoute = pathname === "/overview" || pathname === "/dashboard";
	const isOrdersRoute = pathname === "/orders";

	const ordersCurrencyFormatter = useMemo(
		() =>
			new Intl.NumberFormat("en-NG", {
				style: "currency",
				currency: "NGN",
				maximumFractionDigits: 0,
			}),
		[],
	);

	const filteredOrders = useMemo(() => {
		const normalizedQuery = ordersSearchQuery.trim().toLowerCase();

		return ordersRows.filter((order) => {
			const matchesTab =
				activeOrdersTab === "all"
					? true
					: activeOrdersTab === "in-progress"
						? order.status === "IN TRANSIT" || order.status === "PREPARING"
						: activeOrdersTab === "delivered"
							? order.status === "DELIVERED"
							: order.hasIssue === true || order.status === "NEW";

			if (!matchesTab) {
				return false;
			}

			if (!normalizedQuery) {
				return true;
			}

			const orderSearchText = [
				order.id,
				order.vendorName,
				order.customerName,
				order.assignedRider ?? "",
				order.fulfillmentSource,
			]
				.join(" ")
				.toLowerCase();

			return orderSearchText.includes(normalizedQuery);
		});
	}, [ordersSearchQuery, activeOrdersTab]);

	const tabCountByKey = useMemo(() => {
		return {
			all: ordersRows.length,
			"in-progress": ordersRows.filter((order) => order.status === "IN TRANSIT" || order.status === "PREPARING").length,
			delivered: ordersRows.filter((order) => order.status === "DELIVERED").length,
			issues: ordersRows.filter((order) => order.hasIssue === true || order.status === "NEW").length,
		};
	}, []);

	return (
		<AdminShell title={pageTitle}>
				<section className="mg-content mg-overview-content">
					<div className="mg-heading-row">
						<div>
							<p className="mg-eyebrow">{isOrdersRoute ? "Delivery Checkout Analytics" : "Operational Insights"}</p>
							<h3>{isOrdersRoute ? "Orders Management" : "Operations Overview"}</h3>
							<p className="mg-overview-note">
								{isOrdersRoute
									? "Deep analytical insight and state monitoring of all system delivery checkouts."
									: "Current-day snapshot of platform health, volumes, and dispatch performance."}
							</p>
						</div>
					</div>

					{isOverviewRoute ? (
						<>
							<div className="mg-metric-grid">
								{metrics.map((metric, index) => (
									<article
										key={metric.label}
										className={`mg-metric-card${index === 0 ? " is-primary-metric" : ""}`}
									>
										<div className="mg-metric-head">
											<span>{metric.label}</span>
											<strong className={metric.statusType}>{metric.statusText}</strong>
										</div>
										<p className="mg-metric-value">{metric.value}</p>
										<p className="mg-metric-note">{metric.hint}</p>
									</article>
								))}
							</div>

							<div className="mg-live-row">
								<article className="mg-panel mg-chart-panel">
									<div className="mg-panel-head">
										<h4>Revenue Trend (Last 14 Days)</h4>
									</div>
									<div className="mg-chart-wrap">
										<div className="mg-chart-recharts" role="img" aria-label="14-day gross merchandise value trend">
											<ResponsiveContainer width="100%" height={280}>
												<AreaChart data={revenueTrend} margin={{ top: 16, right: 18, left: 6, bottom: 6 }}>
													<defs>
														<linearGradient id="mgRevenueFill" x1="0" y1="0" x2="0" y2="1">
															<stop offset="0%" stopColor="#F3621F" stopOpacity={0.28} />
															<stop offset="100%" stopColor="#F3621F" stopOpacity={0.03} />
														</linearGradient>
													</defs>
													<CartesianGrid strokeDasharray="4 4" stroke="rgba(148, 163, 184, 0.28)" />
													<XAxis dataKey="label" stroke="#5A6A82" tickLine={false} axisLine={false} tick={{ fontSize: 11, fontFamily: "var(--mono)" }} />
													<YAxis
														stroke="#5A6A82"
														tickLine={false}
														axisLine={false}
														tick={{ fontSize: 11, fontFamily: "var(--mono)" }}
														tickFormatter={(value) => currencyFormatter.format(value)}
													/>
													<Tooltip
														formatter={(value) =>
															typeof value === "number" ? currencyFormatter.format(value) : String(value ?? "")
														}
														labelFormatter={(label) => `${label}`}
														contentStyle={{
															borderRadius: "10px",
															border: "1px solid rgba(249, 115, 22, 0.5)",
															background: "#0E1F3D",
															color: "#F8FAFC",
														}}
														labelStyle={{ color: "#BFDCEC", fontSize: "12px" }}
														itemStyle={{ color: "#F8FAFC" }}
													/>
													<Area
														type="monotone"
														dataKey="value"
														stroke="#F3621F"
														strokeWidth={3}
														fill="url(#mgRevenueFill)"
														dot={{ r: 3.4, stroke: "#F8FAFC", strokeWidth: 2, fill: "#0E1F3D" }}
														activeDot={{ r: 5, stroke: "#F8FAFC", strokeWidth: 2, fill: "#F3621F" }}
													/>
												</AreaChart>
											</ResponsiveContainer>
										</div>
									</div>
								</article>

								<article className="mg-panel mg-activity-panel">
									<div className="mg-panel-head">
										<h4>Real-Time Live Activity Feed</h4>
									</div>
									<div className="mg-activity-feed" aria-live="polite">
										{liveActivity.map((item) => (
											<section key={item.id} className="mg-activity-item">
												<div className={`mg-activity-icon ${item.tone}`}>[{item.code}]</div>
												<div className="mg-activity-content">
													<div className="mg-activity-meta">
														<h5>{item.title}</h5>
														<time>{item.time}</time>
													</div>
													<p>{item.detail}</p>
												</div>
											</section>
										))}
									</div>
								</article>
							</div>
						</>
					) : isOrdersRoute ? (
						<article className="mg-panel mg-orders-panel">
							<div className="mg-panel-head">
								<h4>Orders Data Matrix</h4>
								<span className="mg-orders-total">{filteredOrders.length} visible</span>
							</div>

							<div className="mg-orders-toolbar">
								<label className="mg-orders-search-wrap" htmlFor="orders-search">
									<input
										id="orders-search"
										type="search"
										className="mg-orders-search"
										placeholder="Search order, customer, vendor..."
										value={ordersSearchQuery}
										onChange={(event) => setOrdersSearchQuery(event.target.value)}
									/>
								</label>

								<div className="mg-orders-tabs" role="tablist" aria-label="Order status filters">
									{ordersTabs.map((tab) => (
										<button
											key={tab.key}
											type="button"
											role="tab"
											aria-selected={activeOrdersTab === tab.key}
											className={activeOrdersTab === tab.key ? "active" : ""}
											onClick={() => setActiveOrdersTab(tab.key)}
										>
											<span>{tab.label}</span>
											<strong>{tabCountByKey[tab.key]}</strong>
										</button>
									))}
								</div>
							</div>

							<div className="mg-table-wrap">
								<table className="mg-orders-table">
									<thead>
										<tr>
											<th className="mg-cell-number">Order ID</th>
											<th>Vendor Name</th>
											<th>Customer ID / Name</th>
											<th>Assigned Rider</th>
											<th className="mg-cell-status">Status</th>
											<th className="mg-cell-status">Fulfillment Source</th>
											<th className="mg-cell-number">Total Pricing</th>
										</tr>
									</thead>
									<tbody>
										{filteredOrders.length > 0 ? (
											filteredOrders.map((order) => (
												<tr key={order.id}>
													<td className="mono mg-cell-number">{order.id}</td>
													<td>{order.vendorName}</td>
													<td>{order.customerName}</td>
													<td>{order.assignedRider ?? "-"}</td>
													<td className="mg-cell-status">
														<span className={`mg-order-status ${order.status.toLowerCase().replace(" ", "-")}`}>{order.status}</span>
													</td>
													<td className="mg-cell-status">
														<span className="mg-source-pill">{order.fulfillmentSource}</span>
													</td>
													<td className="mono mg-cell-number">{ordersCurrencyFormatter.format(order.totalPrice)}</td>
												</tr>
											))
										) : (
											<tr>
												<td colSpan={7} className="mg-orders-empty">No orders match the active filters.</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						</article>
					) : (
						<article className="mg-panel mg-route-placeholder">
							<div className="mg-panel-head">
								<h4>{pageTitle}</h4>
							</div>
							<div className="mg-placeholder-body">
								<p>This section is connected to the global operations shell. Detailed workflow modules can be expanded here.</p>
							</div>
						</article>
					)}
				</section>
		</AdminShell>
	);
}

export default Overview;
