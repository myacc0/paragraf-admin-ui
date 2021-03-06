import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';
import { routeList as CategoryRoutes } from '@iso/pages/Categories/CategoryRoutes';
import { routeList as TagRoutes } from '@iso/pages/Catalog/Tags/TagRoutes';
import { routeList as UnitRoutes } from '@iso/pages/Catalog/Units/UnitRoutes';
import { routeList as PropertyRoutes } from '@iso/pages/Catalog/Properties/PropertyRoutes';
import { routeList as StockOfficeRoutes } from '@iso/pages/StockOffice/StockOfficeRoutes';

const routes = [
	{
		path: '',
		component: lazy(() => import('@iso/containers/BlankPage')),
		exact: true,
	},
	...CategoryRoutes,
	...TagRoutes,
	...UnitRoutes,
	...PropertyRoutes,
	...StockOfficeRoutes,
	{
		path: 'products',
		component: lazy(() => import('@iso/pages/Products/Products')),
	},
	{
		path: 'my-profile',
		component: lazy(() => import('@iso/pages/Profile/Profile')),
	},
	{
		path: 'profile-settings',
		component: lazy(() => import('@iso/pages/Profile/Settings')),
	},
	{
		path: 'blank_page',
		component: lazy(() => import('@iso/containers/BlankPage')),
	},
];

// routes.concat(CategoryRoutes);

export default function AppRouter() {
	const { url } = useRouteMatch();
	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				{routes.map((route, idx) => (
					<Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
						<route.component />
					</Route>
				))}
			</Switch>
		</Suspense>
	);
}
