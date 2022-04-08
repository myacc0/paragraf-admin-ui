import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
	{
		path: '',
		component: lazy(() => import('@iso/containers/BlankPage')),
		exact: true,
	},
	{
		path: 'products',
		component: lazy(() => import('@iso/containers/Pages/Products/Products')),
	},
	{
		path: 'categories',
		component: lazy(() => import('@iso/containers/Pages/Categories/Categories')),
	},
	{
		path: 'stock-office',
		component: lazy(() => import('@iso/containers/Pages/StockOffice/StockOffice')),
	},
	{
		path: 'tags',
		component: lazy(() => import('@iso/containers/Pages/Catalog/Tags/Tags')),
	},
	{
		path: 'properties',
		component: lazy(() => import('@iso/containers/Pages/Catalog/Properties/Properties')),
	},
	{
		path: 'units',
		component: lazy(() => import('@iso/containers/Pages/Catalog/Units/Units')),
	},
	{
		path: 'my-profile',
		component: lazy(() => import('@iso/containers/Profile/Profile')),
	},
	{
		path: 'backToTop',
		component: lazy(() => import('@iso/containers/Navigation/BackToTop')),
	},
	{
		path: 'menu',
		component: lazy(() => import('@iso/containers/Navigation/NavigationMenu')),
	},
	{
		path: 'blank_page',
		component: lazy(() => import('@iso/containers/BlankPage')),
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
