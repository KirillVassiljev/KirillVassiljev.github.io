export type NavItem = {
	titleKey: string;
	slug: string;
};

export type NavSection = {
	titleKey: string;
	items: NavItem[];
};

export const sections: NavSection[] = [
	{
		titleKey: 'nav.section.guides',
		items:
		[
			{ titleKey: 'nav.item.bear', slug: 'bear' },
			{ titleKey: 'nav.item.allaince-championship', slug: 'allaince-championship' },
			{ titleKey: 'nav.item.strongest-governor', slug: 'strongest-governor' },
			{ titleKey: 'nav.item.vikings', slug: 'vikings' },
			{ titleKey: 'nav.item.castle-battle', slug: 'castle-battle' },
			{ titleKey: 'nav.item.tri-alliance-clash', slug: 'tri-alliance-clash' },
			{ titleKey: 'nav.item.swordland-showdown', slug: 'swordland-showdown' },
		]
	},
	{
		titleKey: 'nav.section.tools',
		items: [{ titleKey: 'nav.item.timeline', slug: 'timeline' }]
	}
];
