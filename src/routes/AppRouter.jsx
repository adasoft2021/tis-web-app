import { Route, Switch } from 'wouter'
import { CompanyProvider } from '../context/providers/CompanyContext'
import {
	Board,
	NotFoundPage,
	Announcement,
	SpecificationSheet,
	CompaniesList,
} from '../pages'

export default function AppRouter() {
	return (
		<Switch>
			<Route path='/' component={Announcement} />
			<Route path='/announcements' component={Announcement} />
			<Route path='/tablero' component={Board} />
			<Route path='/404' component={NotFoundPage} />
			<Route
				path='/specification_sheets'
				component={SpecificationSheet}
			/>
			<Route
				path='/companies'
				component={(props) => (
					<CompanyProvider>
						<CompaniesList {...props} />
					</CompanyProvider>
				)}
			/>

			<Route component={NotFoundPage} />
		</Switch>
	)
}
