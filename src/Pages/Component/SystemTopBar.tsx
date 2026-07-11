type SystemTopBarProps = {
	title: string;
};

function SystemTopBar({ title }: SystemTopBarProps) {
	return (
		<header className="mg-topbar mg-system-topbar">
			<div className="mg-top-left">
				<h2>{title}</h2>
			</div>
		</header>
	);
}

export default SystemTopBar;