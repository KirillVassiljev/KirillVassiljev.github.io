export type MilestoneCategory =
	| 'heroes'
	| 'pvp'
	| 'feature'
	| 'truegold'
	| 'pets'
	| 'masters';

export type Milestone = {
	/** ISO date, e.g. '2025-03-14'. Use the day the milestone unlocked or is expected. */
	date: string;
	/** Translation key into guides.timeline.milestones.<id>.title */
	titleKey: string;
	category: MilestoneCategory;
	/** Set true for dates you expect but that haven't happened yet. */
	predicted?: boolean;
	/** Translation key into guides.timeline.milestones.<id>.notes, shown when the card is expanded. */
	notesKey?: string;
	/** Asset base names in `$lib/assets/timeline`, e.g. ['zoe', 'hilde']. */
	icons?: string[];
};

export const kingdom = 1997;

/** The day K1997 opened. */
export const kingdomCreated = '2026-04-27';

/** Translation keys for each category's display label — looked up via $t(categoryLabelKeys[category]). */
export const categoryLabelKeys: Record<MilestoneCategory, string> = {
	heroes: 'guides.timeline.categories.heroes',
	pvp: 'guides.timeline.categories.pvp',
	feature: 'guides.timeline.categories.feature',
	truegold: 'guides.timeline.categories.truegold',
	pets: 'guides.timeline.categories.pets',
	masters: 'guides.timeline.categories.masters'
};

/**
 * Kingdom 1997 milestones. Dates on or before the kingdom's current age are
 * recorded unlocks; later entries are marked `predicted`.
 */
export const milestones: Milestone[] = [
	{
		date: '2026-04-27',
		titleKey: 'guides.timeline.milestones.generation-1-heroes.title',
		category: 'heroes',
		icons: ['heroes']
	},
	{
		date: '2026-05-02',
		titleKey: 'guides.timeline.milestones.first-hall-of-governors-hog.title',
		category: 'feature'
	},
	{
		date: '2026-05-03',
		titleKey: 'guides.timeline.milestones.first-sanctuary-competition.title',
		category: 'pvp',
		icons: ['sanctuary-battle']
	},
	{
		date: '2026-05-10',
		titleKey: 'guides.timeline.milestones.plains-fog-cleared.title',
		category: 'feature'
	},
	{
		date: '2026-05-18',
		titleKey: 'guides.timeline.milestones.mystic-trial-unlocked.title',
		category: 'feature',
		icons: ['mystic-trial']
	},
	{
		date: '2026-05-21',
		titleKey: 'guides.timeline.milestones.first-fortress-competition.title',
		category: 'pvp',
		icons: ['fortress']
	},
	{
		date: '2026-05-24',
		titleKey: 'guides.timeline.milestones.hero-gear-reforge-unlocked.title',
		category: 'feature',
		icons: ['hero-gear']
	},
	{
		date: '2026-06-04',
		titleKey: 'guides.timeline.milestones.fertile-land-fog-cleared.title',
		category: 'feature'
	},
	{
		date: '2026-06-10',
		titleKey: 'guides.timeline.milestones.alliance-resource-exchange-unlocks.title',
		category: 'feature',
		icons: ['exchange']
	},
	{
		date: '2026-06-15',
		titleKey: 'guides.timeline.milestones.generation-2-heroes.title',
		category: 'heroes',
		notesKey: 'guides.timeline.milestones.generation-2-heroes.notes',
		icons: ['zoe', 'hilde', 'marlin']
	},
	{
		date: '2026-06-19',
		titleKey: 'guides.timeline.milestones.first-castle-competition.title',
		category: 'pvp',
		icons: ['castle']
	},
	{
		date: '2026-06-20',
		titleKey: 'guides.timeline.milestones.generation-1-pets.title',
		category: 'pets',
		notesKey: 'guides.timeline.milestones.generation-1-pets.notes',
		icons: ['gray-wolf', 'lynx', 'bison']
	},
	{
		date: '2026-07-05',
		titleKey: 'guides.timeline.milestones.age-of-truegold.title',
		category: 'truegold',
		notesKey: 'guides.timeline.milestones.age-of-truegold.notes',
		icons: ['tg3']
	},
	{
		date: '2026-07-07',
		titleKey: 'guides.timeline.milestones.generation-2-pets.title',
		category: 'pets',
		notesKey: 'guides.timeline.milestones.generation-2-pets.notes',
		icons: ['cheetah', 'moose']
	},
	{
		date: '2026-07-13',
		titleKey: 'guides.timeline.milestones.first-kvk-prep-starts.title',
		category: 'pvp',
		icons: ['kvk-event']
	},
	{
		date: '2026-07-18',
		titleKey: 'guides.timeline.milestones.first-kvk-castle-competition.title',
		category: 'pvp',
		icons: ['kvk-event', 'castle']
	},
	{
		date: '2026-07-20',
		titleKey: 'guides.timeline.milestones.first-alliance-brawl.title',
		category: 'pvp',
		icons: ['alliance-brawl']
	},
	{
		date: '2026-08-17',
		titleKey: 'guides.timeline.milestones.generation-3-heroes.title',
		category: 'heroes',
		notesKey: 'guides.timeline.milestones.generation-3-heroes.notes',
		icons: ['eric', 'petra', 'jaeger']
	},
	{
		date: '2026-08-17',
		titleKey: 'guides.timeline.milestones.generation-3-pets.title',
		category: 'pets',
		notesKey: 'guides.timeline.milestones.generation-3-pets.notes',
		icons: ['lion', 'grizzly-bear']
	},
	{
		date: '2026-08-17',
		titleKey: 'guides.timeline.milestones.gov-gear-material-exchange-unlocks.title',
		category: 'feature',
		notesKey: 'guides.timeline.milestones.gov-gear-material-exchange-unlocks.notes',
		icons: ['satin', 'exchange']
	},
	{
		date: '2026-08-17',
		titleKey: 'guides.timeline.milestones.masters-unlocked.title',
		category: 'masters',
		notesKey: 'guides.timeline.milestones.masters-unlocked.notes',
		icons: ['valora', 'pan', 'roman']
	},
	{
		date: '2026-09-28',
		titleKey: 'guides.timeline.milestones.truegold-5.title',
		category: 'truegold',
		predicted: true,
		notesKey: 'guides.timeline.milestones.truegold-5.notes',
		icons: ['tg5']
	},
	{
		date: '2026-09-28',
		titleKey: 'guides.timeline.milestones.gov-charm-material-exchange-unlocked.title',
		category: 'feature',
		predicted: true,
		notesKey: 'guides.timeline.milestones.gov-charm-material-exchange-unlocked.notes',
		icons: ['charm-guide', 'exchange']
	},
	{
		date: '2026-09-28',
		titleKey: 'guides.timeline.milestones.4th-master-unlocked.title',
		category: 'masters',
		predicted: true,
		notesKey: 'guides.timeline.milestones.4th-master-unlocked.notes',
		icons: ['cassia']
	},
	{
		date: '2026-10-19',
		titleKey: 'guides.timeline.milestones.governor-charm-cap-raised.title',
		category: 'feature',
		predicted: true,
		notesKey: 'guides.timeline.milestones.governor-charm-cap-raised.notes',
		icons: ['charm-l12-infantry', 'charm-l12-cavalry', 'charm-l12-archer']
	},
	{
		date: '2026-11-09',
		titleKey: 'guides.timeline.milestones.generation-4-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-4-heroes.notes',
		icons: ['alcar', 'margot', 'rosa']
	},
	{
		date: '2026-11-09',
		titleKey: 'guides.timeline.milestones.generation-4-pets.title',
		category: 'pets',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-4-pets.notes',
		icons: ['giant-rhino', 'mighty-bison']
	},
	{
		date: '2026-11-09',
		titleKey: 'guides.timeline.milestones.5th-and-6th-masters-unlocked.title',
		category: 'masters',
		predicted: true,
		notesKey: 'guides.timeline.milestones.5th-and-6th-masters-unlocked.notes'
	},
	{
		date: '2026-12-07',
		titleKey: 'guides.timeline.milestones.war-academy-unlocked.title',
		category: 'feature',
		predicted: true,
		notesKey: 'guides.timeline.milestones.war-academy-unlocked.notes',
		icons: ['tier-11', 'truegold-dust']
	},
	{
		date: '2027-02-01',
		titleKey: 'guides.timeline.milestones.generation-5-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-5-heroes.notes',
		icons: ['long-fei', 'thrud', 'vivian']
	},
	{
		date: '2027-02-01',
		titleKey: 'guides.timeline.milestones.generation-5-pets.title',
		category: 'pets',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-5-pets.notes',
		icons: ['great-moose', 'alpha-black-panther']
	},
	{
		date: '2027-03-15',
		titleKey: 'guides.timeline.milestones.truegold-8.title',
		category: 'truegold',
		predicted: true,
		notesKey: 'guides.timeline.milestones.truegold-8.notes',
		icons: ['tg8', 'tempered-truegold']
	},
	{
		date: '2027-04-26',
		titleKey: 'guides.timeline.milestones.generation-6-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-6-heroes.notes',
		icons: ['triton', 'sophia', 'yang']
	},
	{
		date: '2027-04-26',
		titleKey: 'guides.timeline.milestones.generation-6-pets.title',
		category: 'pets',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-6-pets.notes',
		icons: ['regal-white-lion', 'ironclad-war-elephant']
	},
	{
		date: '2027-06-06',
		titleKey: 'guides.timeline.milestones.first-flamedragon-tyrant-competition.title',
		category: 'pvp',
		predicted: true,
		icons: ['flamedragon']
	},
	{
		date: '2027-07-19',
		titleKey: 'guides.timeline.milestones.generation-7-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-7-heroes.notes',
		icons: ['charles', 'ava', 'wee-woo']
	},
	{
		date: '2027-07-19',
		titleKey: 'guides.timeline.milestones.generation-7-pets.title',
		category: 'pets',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-7-pets.notes',
		icons: ['ironclad-war-bear']
	},
	{
		date: '2027-08-30',
		titleKey: 'guides.timeline.milestones.advanced-truegold-research.title',
		category: 'truegold',
		predicted: true,
		notesKey: 'guides.timeline.milestones.advanced-truegold-research.notes',
		icons: ['truegold']
	},
	{
		date: '2027-10-11',
		titleKey: 'guides.timeline.milestones.generation-8-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-8-heroes.notes'
	},
	{
		date: '2027-10-11',
		titleKey: 'guides.timeline.milestones.generation-8-pets.title',
		category: 'pets',
		predicted: true
	},
	{
		date: '2028-01-03',
		titleKey: 'guides.timeline.milestones.generation-9-heroes.title',
		category: 'heroes',
		predicted: true,
		notesKey: 'guides.timeline.milestones.generation-9-heroes.notes'
	},
	{
		date: '2028-02-14',
		titleKey: 'guides.timeline.milestones.truegold-10.title',
		category: 'truegold',
		predicted: true,
		notesKey: 'guides.timeline.milestones.truegold-10.notes'
	}
];
