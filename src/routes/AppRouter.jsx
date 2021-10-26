import { Route, Switch } from 'wouter'
import {
	Board,
	NotFoundPage,
	Announcement,
	SpecificationSheet,
	CompaniesList,
	HomePage,
} from '../pages'

export default function AppRouter() {
	return (
		<Switch>
			<Route path='/' component={HomePage} />
			<Route path='/announcements' component={Announcement} />
			<Route path='/tablero' component={Board} />
			<Route path='/404' component={NotFoundPage} />
			<Route
				path='/specification_sheets'
				component={SpecificationSheet}
			/>
			<Route path='/companies' component={CompaniesList} />

			<Route component={NotFoundPage} />
		</Switch>
	)
}
