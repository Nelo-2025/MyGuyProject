import { useEffect, useState } from "react";

type SystemTopBarProps = {
	title: string;
};

function formatClock(date: Date) {
	return new Intl.DateTimeFormat("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	}).format(date);
}

function SystemTopBar({ title }: SystemTopBarProps) {
	const [clock, setClock] = useState(() => formatClock(new Date()));

	useEffect(() => {
		const timer = window.setInterval(() => {
			setClock(formatClock(new Date()));
		}, 1000);

		return () => window.clearInterval(timer);
	}, []);

	return (
		<header className="mg-topbar mg-system-topbar">
			<div className="mg-top-left">
				<h2>{title}</h2>
			</div>

			<div className="mg-system-status" aria-label="System status">
				<span className="mg-system-dot" aria-hidden="true">
					●
				</span>
				<span>System healthy</span>
			</div>

			<div className="mg-clock" aria-live="polite" aria-atomic="true">
				{clock}
			</div>
		</header>
	);
}

export default SystemTopBar;