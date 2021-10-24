import Toast from './components/Toast'
import { ToastProvider } from './context/providers/ToastContext'
import AppRouter from './routes/AppRouter'
import { SemesterProvider } from './context/providers/SemesterContext'
function App() {
	return (
		<ToastProvider>
			<Toast />
			<SemesterProvider>
				<AppRouter />
			</SemesterProvider>
		</ToastProvider>
	)
}

export default App
