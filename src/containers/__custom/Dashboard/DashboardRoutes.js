import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
	{
		path: '',
		component: lazy(() => import('@iso/containers/Widgets/Widgets')),
		exact: true,
	},
	{
		path: 'products',
		component: lazy(() => import('@iso/containers/__custom/Pages/Products/Products')),
	},
	{
		path: 'categories',
		component: lazy(() => import('@iso/containers/__custom/Pages/Categories/Categories')),
	},
	{
		path: 'stock-office',
		component: lazy(() => import('@iso/containers/__custom/Pages/StockOffice/StockOffice')),
	},
	{
		path: 'tags',
		component: lazy(() => import('@iso/containers/__custom/Pages/Catalog/Tags/Tags')),
	},
	{
		path: 'properties',
		component: lazy(() => import('@iso/containers/__custom/Pages/Catalog/Properties/Properties')),
	},
	{
		path: 'units',
		component: lazy(() => import('@iso/containers/__custom/Pages/Catalog/Units/Units')),
	},
];

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
