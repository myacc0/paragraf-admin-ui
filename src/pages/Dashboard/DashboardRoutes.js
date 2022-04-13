import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';
import { routeList as CategoryRoutes } from '@iso/pages/Categories/CategoryRoutes';

const routes = [
	{
		path: '',
		component: lazy(() => import('@iso/containers/BlankPage')),
		exact: true,
	},
	...CategoryRoutes,
	{
		path: 'products',
		component: lazy(() => import('@iso/pages/Products/Products')),
	},
	{
		path: 'stock-office',
		component: lazy(() => import('@iso/pages/StockOffice/StockOffice')),
	},
	{
		path: 'tags',
		component: lazy(() => import('@iso/pages/Catalog/Tags/Tags')),
	},
	{
		path: 'properties',
		component: lazy(() => import('@iso/pages/Catalog/Properties/Properties')),
	},
	{
		path: 'units',
		component: lazy(() => import('@iso/pages/Catalog/Units/Units')),
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