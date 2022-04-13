const options = [
	{
		key: 'products',
		label: 'sidebar.products',
		leftIcon: 'ion-cube',
	},
	{
		key: 'categories',
		label: 'sidebar.categories',
		leftIcon: 'ion-folder',
	},
	{
		key: 'stock-office',
		label: 'sidebar.stockoffice',
		leftIcon: 'ion-ios-home',
	},
	{
		key: 'catalog',
		label: 'sidebar.catalog',
		leftIcon: 'ion-social-buffer',
		children: [
			{
				key: 'tags',
				label: 'sidebar.tags',
			},
			{
				key: 'properties',
				label: 'sidebar.properties',
			},
			{
				key: 'units',
				label: 'sidebar.units',
			},
		],
	}
];
export default options;
