import Toast from './components/Toast'
import { ToastProvider } from './context/providers/ToastContext'
import AppRouter from './routes/AppRouter'
import { SemesterProvider } from './context/providers/SemesterContext'
import { UserCredentialsProvider } from './context/providers/UserCredentialsContext'
/*
 import AccordionOne from './components/tables/AccordionOne'
import TableOne from './components/tables/tableOne'
import TableTwo from './components/tables/tableTwo' */
function App() {
	return (
		/*
		<>
			<TableOne></TableOne>
			<TableTwo></TableTwo>
			<AccordionOne></AccordionOne>
		</> */

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
