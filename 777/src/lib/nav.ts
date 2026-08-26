export type NavItem = {
	title: string;
	slug: string;
};

export type NavSection = {
	title: string;
	items: NavItem[];
};

export const sections: NavSection[] = [
	{
		title: 'Guides',
		items: [{ title: 'Bear hunt', slug: 'bear' }]
	},
	{
		title: 'Tools',
		items: [{ title: 'Timeline', slug: 'timeline' }]
	}
];
