import Toast from './components/Toast'
import { ToastProvider } from './context/providers/ToastContext'
import AppRouter from './routes/AppRouter'
import { SemesterProvider } from './context/providers/SemesterContext'
import { UserCredentialsProvider } from './context/providers/UserCredentialsContext'
function App() {
	return (
		<ToastProvider>
			<Toast />
			<UserCredentialsProvider>
				<SemesterProvider>
					<AppRouter />
				</SemesterProvider>
			</UserCredentialsProvider>
		</ToastProvider>
	)
}

export default App
