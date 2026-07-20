import { useLocation, useNavigate } from "react-router-dom";
import { appNavItems, normalizeRoute } from "./navigation.ts";

type SystemTopBarProps = {
	title: string;
};

function SystemTopBar({ title }: SystemTopBarProps) {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const activeRoute = normalizeRoute(pathname);

	return (
		<header className="mg-topbar mg-system-topbar">
			<div className="mg-topbar-head">
				<div className="mg-topbar-brand">
					<img className="mg-topbar-logo" src="/mg-logo.png" alt="MyGuy logo" />
					<div className="mg-topbar-brand-copy">
						<p className="mg-topbar-eyebrow">MyGuy Operations</p>
						<h2>{title}</h2>
					</div>
				</div>
			</div>

			<label className="mg-route-picker-wrap" htmlFor="mg-route-picker">
				<select
					id="mg-route-picker"
					className="mg-route-picker"
					value={activeRoute}
					onChange={(event) => navigate(event.target.value)}
				>
					{appNavItems.map((item) => (
						<option key={item.to} value={item.to}>
							{item.label}
						</option>
					))}
				</select>
			</label>
		</header>
	);
}

export default SystemTopBar;