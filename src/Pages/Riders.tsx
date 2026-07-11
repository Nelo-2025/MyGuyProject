import AdminShell from "./Component/AdminShell.tsx";

type VehicleType = "Motorcycle" | "Bicycle" | "Car";
type RiderStatus = "ONLINE" | "OFFLINE";

type RiderRecord = {
    id: string;
    initials: string;
    riderName: string;
    vehicleType: VehicleType;
    tripsToday: number;
    acceptanceRate: number;
    avgLatencyMin: number;
    status: RiderStatus;
};

const riders: RiderRecord[] = [
    { id: "r-001", initials: "UD", riderName: "Udeme", vehicleType: "Motorcycle", tripsToday: 18, acceptanceRate: 94, avgLatencyMin: 24, status: "ONLINE" },
    { id: "r-002", initials: "BA", riderName: "Bassey", vehicleType: "Bicycle", tripsToday: 12, acceptanceRate: 88, avgLatencyMin: 27, status: "ONLINE" },
    { id: "r-003", initials: "OK", riderName: "Okon", vehicleType: "Car", tripsToday: 16, acceptanceRate: 91, avgLatencyMin: 25, status: "ONLINE" },
    { id: "r-004", initials: "EM", riderName: "Emeka", vehicleType: "Motorcycle", tripsToday: 9, acceptanceRate: 84, avgLatencyMin: 31, status: "OFFLINE" },
    { id: "r-005", initials: "JO", riderName: "John", vehicleType: "Bicycle", tripsToday: 11, acceptanceRate: 89, avgLatencyMin: 28, status: "ONLINE" },
    { id: "r-006", initials: "AN", riderName: "Anita", vehicleType: "Car", tripsToday: 7, acceptanceRate: 79, avgLatencyMin: 33, status: "OFFLINE" },
    { id: "r-007", initials: "IF", riderName: "Ifeoma", vehicleType: "Motorcycle", tripsToday: 14, acceptanceRate: 92, avgLatencyMin: 26, status: "ONLINE" },
    { id: "r-008", initials: "TO", riderName: "Tobi", vehicleType: "Car", tripsToday: 10, acceptanceRate: 86, avgLatencyMin: 29, status: "OFFLINE" },
];

function Riders() {
    return (
        <AdminShell title="Riders">
            <section className="mg-simple-content">
                <div className="mg-heading-row">
                    <div>
                        <p className="mg-eyebrow">Fleet Efficiency Monitoring</p>
                        <h3>Riders Logistics Network View</h3>
                        <p className="mg-overview-note">Tracks active fulfillment personnel, fleet equipment allocation types, and delivery efficiencies.</p>
                    </div>
                </div>

                <article className="mg-panel mg-riders-panel">
                    <div className="mg-panel-head">
                        <h4>Rider Registry</h4>
                        <span className="mg-orders-total">{riders.length} riders tracked</span>
                    </div>

                    <div className="mg-table-wrap">
                        <table className="mg-riders-table">
                            <thead>
                                <tr>
                                    <th>Rider Name</th>
                                    <th className="mg-cell-status">Vehicle Type</th>
                                    <th className="mg-cell-number">Trips Today</th>
                                    <th className="mg-cell-number">Acceptance Rate</th>
                                    <th className="mg-cell-number">Avg Performance Latency</th>
                                    <th className="mg-cell-status">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riders.map((rider) => (
                                    <tr key={rider.id}>
                                        <td>
                                            <div className="mg-rider-block">
                                                <span className="mg-rider-avatar">{rider.initials}</span>
                                                <div>
                                                    <strong>{rider.riderName}</strong>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="mg-cell-status">
                                            <span className={`mg-vehicle-pill ${rider.vehicleType.toLowerCase()}`}>{rider.vehicleType}</span>
                                        </td>
                                        <td className="mono mg-cell-number">{rider.tripsToday}</td>
                                        <td className="mg-cell-number">
                                            <div className="mg-rate-cell">
                                                <div className="mg-rate-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={rider.acceptanceRate}>
                                                    <span style={{ width: `${rider.acceptanceRate}%` }} />
                                                </div>
                                                <strong>{rider.acceptanceRate}%</strong>
                                            </div>
                                        </td>
                                        <td className="mono mg-cell-number">{rider.avgLatencyMin} min</td>
                                        <td className="mg-cell-status">
                                            <span className={`mg-rider-status ${rider.status.toLowerCase()}`}>{rider.status}</span>
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

export default Riders;