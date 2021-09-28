export default function Page({ children }) {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				height: '100vh',
				width: '100wh',
				padding: '1rem',
				boxSizing: 'border-box',
			}}
		>
			{children}
		</div>
	)
}
