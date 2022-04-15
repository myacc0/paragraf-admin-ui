import {lazy} from 'react';

const routeConstants = {
    list: '/dashboard/stock-office',
    add: '/dashboard/stock-office-add',
    edit: '/dashboard/stock-office-edit'
};

const routeList = [
    {
        path: 'stock-office',
        component: lazy(() => import('@iso/pages/StockOffice/StockOffice')),
    },
    {
        path: 'stock-office-add',
        component: lazy(() => import('@iso/pages/StockOffice/StockOfficeAdd')),
    },
    {
        path: 'stock-office-edit/:id',
        component: lazy(() => import('@iso/pages/StockOffice/StockOfficeEdit')),
    }
];

export {
    routeConstants,
    routeList
};