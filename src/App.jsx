import Toast from './components/Toast'
import { ToastProvider } from './context/providers/ToastContext'
import AppRouter from './routes/AppRouter'
import { SemesterProvider } from './context/providers/SemesterContext'
import { UserTypeProvider } from './context/providers/UserTypeContext'
function App() {
	return (
		<ToastProvider>
			<Toast />
			<SemesterProvider>
				<UserTypeProvider>
					<AppRouter />
				</UserTypeProvider>
			</SemesterProvider>
		</ToastProvider>
	)
}

export default App
