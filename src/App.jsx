import Toast from './components/Toast'
import { ToastProvider } from './context/providers/ToastContext'
import AppRouter from './routes/AppRouter'

function App() {
	return (
		<ToastProvider>
			<Toast />
			<AppRouter />
		</ToastProvider>
	)
}

export default App
