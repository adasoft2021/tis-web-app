import { Route, Switch } from 'wouter'
import { Board, NotFoundPage, Announcement } from '../pages'

export default function AppRouter() {
	return (
		<Switch>
			<Route path='/' component={Announcement} />
			<Route path='/tablero' component={Board} />
			<Route path='/404' component={NotFoundPage} />
			<Route component={NotFoundPage} />
		</Switch>
	)
}
