import { useEffect, useState } from 'react'
import { welcome } from './services/welcome'

export default function App() {
	const [response, setResponse] = useState(null)
	useEffect(() => {
		const request = async () => {
			try {
				const response = await welcome()
				setResponse(response)
			} catch (error) {
				alert(JSON.stringify(error))
			}
		}
		request()
	}, [])

	return (
		<div>
			<h1>Aplicación Web de TIS</h1>
			<p>{response && JSON.stringify(response)}</p>
		</div>
	)
}
