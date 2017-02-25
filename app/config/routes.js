import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {MainContainer, HomeContainer} from '../containers/';

const routes = (
	<Router history={browserHistory}>
		<Router path='/' component={MainContainer}>
			<IndexRoute component={HomeContainer} />
		</Router>
	</Router>
	);

export default routes;