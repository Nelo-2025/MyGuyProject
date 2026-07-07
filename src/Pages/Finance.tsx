import AdminShell from "./Component/AdminShell.tsx";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type FinanceMetric = {
	label: string;
	value: string;
	note: string;
};

type RevenueSlice = {
	label: string;
	percent: number;
	tone: "subscriptions" | "delivery" | "b2b";
	color: string;
};

type LedgerEntry = {
	id: string;
	time: string;
	counterparty: string;
	type: "Incoming" | "Outgoing";
	channel: string;
	amount: number;
};

const runwayMetrics: FinanceMetric[] = [
	{ label: "GMV This Month", value: "₦64.2M", note: "Total processing scale" },
	{ label: "MyGuy Revenue", value: "₦612k", note: "Subscription + delivery margin earnings" },
	{ label: "Pending Payouts", value: "₦489k", note: "Operational capital owed to partners" },
	{ label: "Runway Tracker", value: "14 mo", note: "Estimated at current spend cadence" },
];

const revenueMix: RevenueSlice[] = [
	{ label: "Subscriptions", percent: 62, tone: "subscriptions", color: "#f97316" },
	{ label: "Delivery margin", percent: 31, tone: "delivery", color: "#0ea5e9" },
	{ label: "B2B pipeline", percent: 7, tone: "b2b", color: "#22c55e" },
];

const ledgerEntries: LedgerEntry[] = [
	{ id: "LED-2011", time: "09:42", counterparty: "Vendor payout - Daddy K", type: "Outgoing", channel: "Settlement", amount: -180000 },
	{ id: "LED-2012", time: "10:15", counterparty: "Subscription renewals", type: "Incoming", channel: "Card", amount: 210000 },
	{ id: "LED-2013", time: "11:05", counterparty: "Rider incentive batch", type: "Outgoing", channel: "Wallet", amount: -95000 },
	{ id: "LED-2014", time: "12:11", counterparty: "Delivery margin inflow", type: "Incoming", channel: "App", amount: 126000 },
	{ id: "LED-2015", time: "13:08", counterparty: "Vendor payout - Crunchies", type: "Outgoing", channel: "Settlement", amount: -142000 },
	{ id: "LED-2016", time: "14:01", counterparty: "B2B bulk dispatch", type: "Incoming", channel: "Invoice", amount: 318000 },
];

const amountFormatter = new Intl.NumberFormat("en-NG", {
	style: "currency",
	currency: "NGN",
	maximumFractionDigits: 0,
});

function Finance() {
	return (
		<AdminShell title="Finance">

			<section className="mg-simple-content">
				<div className="mg-heading-row">
					<div>
						<p className="mg-eyebrow">Capital & Settlement Monitoring</p>
						<h3>Financial Ledger & Runway View</h3>
						<p className="mg-overview-note">Visibility over runtime capital scales and platform settlement ledgers for the finance team.</p>
					</div>
				</div>

				<div className="mg-metric-grid mg-finance-metric-grid">
					{runwayMetrics.map((metric) => (
						<article key={metric.label} className="mg-metric-card">
							<div className="mg-metric-head">
								<span>{metric.label}</span>
							</div>
							<p className="mg-metric-value">{metric.value}</p>
							<p className="mg-metric-note">{metric.note}</p>
						</article>
					))}
				</div>

				<div className="mg-live-row mg-finance-split-row">
					<article className="mg-panel mg-finance-donut-panel">
						<div className="mg-panel-head">
							<h4>Revenue Mix</h4>
						</div>

						<div className="mg-finance-donut-wrap">
							<div className="mg-finance-donut-chart" aria-label="Revenue mix: Subscriptions 62 percent, Delivery margin 31 percent, B2B pipeline 7 percent">
								<ResponsiveContainer width="100%" height={240}>
									<PieChart>
										<Pie
											data={revenueMix}
											dataKey="percent"
											nameKey="label"
											cx="50%"
											cy="50%"
											innerRadius={58}
											outerRadius={90}
											paddingAngle={2}
										>
											{revenueMix.map((slice) => (
												<Cell key={slice.label} fill={slice.color} />
											))}
										</Pie>
										<Tooltip
											formatter={(value) =>
												typeof value === "number" ? `${value}%` : String(value ?? "")
											}
											contentStyle={{
												borderRadius: "10px",
												border: "1px solid rgba(148, 163, 184, 0.24)",
												background: "#0f172a",
												color: "#f8fafc",
											}}
											labelStyle={{ color: "#cbd5e1", fontSize: "12px" }}
											itemStyle={{ color: "#f8fafc" }}
										/>
									</PieChart>
								</ResponsiveContainer>
								<span className="mg-finance-donut-total">100%</span>
							</div>

							<div className="mg-finance-legend">
								{revenueMix.map((slice) => (
									<div key={slice.label} className="mg-finance-legend-item">
										<span className={`mg-finance-dot ${slice.tone}`} />
										<p>{slice.label}</p>
										<strong>{slice.percent}%</strong>
									</div>
								))}
							</div>
						</div>
					</article>

					<article className="mg-panel mg-finance-ledger-panel">
						<div className="mg-panel-head">
							<h4>Recent Ledger Transactions</h4>
							<span className="mg-orders-total">{ledgerEntries.length} entries</span>
						</div>

						<div className="mg-table-wrap">
							<table className="mg-finance-ledger-table">
								<thead>
									<tr>
										<th>Ledger ID</th>
										<th>Time</th>
										<th>Counterparty</th>
										<th>Type</th>
										<th>Channel</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>
									{ledgerEntries.map((entry) => (
										<tr key={entry.id}>
											<td className="mono">{entry.id}</td>
											<td className="mono">{entry.time}</td>
											<td>{entry.counterparty}</td>
											<td>{entry.type}</td>
											<td>{entry.channel}</td>
											<td className={entry.amount < 0 ? "mg-ledger-amount outgoing mono" : "mg-ledger-amount incoming mono"}>
												{entry.amount < 0
													? `(${amountFormatter.format(Math.abs(entry.amount))})`
													: `+${amountFormatter.format(entry.amount)}`}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</article>
				</div>
			</section>
		</AdminShell>
	);
}

export default Finance;
