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
		titleKey: 'common.nav.section.guides',
		items:
		[
			{ titleKey: 'common.nav.item.bear', slug: 'bear' },
			{ titleKey: 'common.nav.item.allaince-championship', slug: 'allaince-championship' },
			{ titleKey: 'common.nav.item.strongest-governor', slug: 'strongest-governor' },
			{ titleKey: 'common.nav.item.vikings', slug: 'vikings' },
			{ titleKey: 'common.nav.item.castle-battle', slug: 'castle-battle' },
			{ titleKey: 'common.nav.item.tri-alliance-clash', slug: 'tri-alliance-clash' },
			{ titleKey: 'common.nav.item.swordland-showdown', slug: 'swordland-showdown' },
		]
	},
	{
		titleKey: 'common.nav.section.tools',
		items: [{ titleKey: 'common.nav.item.timeline', slug: 'timeline' }]
	}
];
