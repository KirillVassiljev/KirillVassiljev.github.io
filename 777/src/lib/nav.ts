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
		items: 
		[
			{ title: 'Bear hunt', slug: 'bear' },
			{ title: 'Allaince championship', slug: 'allaince-championship' }
		]
	},
	{
		title: 'Tools',
		items: [{ title: 'Timeline', slug: 'timeline' }]
	}
];
