const options = [
	{
		key: 'products',
		label: 'sidebar.products',
		leftIcon: 'ion-android-mail',
	},
	{
		key: 'categories',
		label: 'sidebar.categories',
		leftIcon: 'ion-chatbubbles',
	},
	{
		key: 'stock-office',
		label: 'sidebar.stockoffice',
		leftIcon: 'ion-chatbubbles',
	},
	{
		key: 'catalog',
		label: 'sidebar.catalog',
		leftIcon: 'ion-bag',
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
