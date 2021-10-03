import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import './global.scss'

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.querySelector('div#app')
)
