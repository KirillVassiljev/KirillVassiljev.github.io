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
		title: 'Getting Started',
		items: [
			{ title: 'Overview', slug: 'overview' },
			{ title: 'First Steps', slug: 'first-steps' }
		]
	},
	{
		title: 'Heroes',
		items: [
			{ title: 'Tier List', slug: 'tier-list' },
			{ title: 'Gear', slug: 'gear' }
		]
	},
	{
		title: 'Base',
		items: [
			{ title: 'Buildings', slug: 'buildings' },
			{ title: 'Research', slug: 'research' }
		]
	}
];
