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
	title: string;
	category: MilestoneCategory;
	/** Set true for dates you expect but that haven't happened yet. */
	predicted?: boolean;
	/** Optional longer text shown when the card is expanded. */
	notes?: string;
};

export const kingdom = 1997;

export const categoryLabels: Record<MilestoneCategory, string> = {
	heroes: 'Heroes',
	pvp: 'PvP',
	feature: 'New feature',
	truegold: 'Truegold',
	pets: 'Pets',
	masters: 'Masters'
};

/**
 * Kingdom 1997 milestones. Dates on or before the kingdom's current age are
 * recorded unlocks; later entries are marked `predicted`.
 */
export const milestones: Milestone[] = [
	{
		date: '2026-04-27',
		title: 'Generation 1 Heroes',
		category: 'heroes'
	},
	{
		date: '2026-05-02',
		title: 'First Hall of Governors (HoG)',
		category: 'feature'
	},
	{
		date: '2026-05-03',
		title: 'First Sanctuary Competition',
		category: 'pvp'
	},
	{
		date: '2026-05-10',
		title: 'Plains Fog Cleared',
		category: 'feature'
	},
	{
		date: '2026-05-18',
		title: 'Mystic Trial Unlocked',
		category: 'feature'
	},
	{
		date: '2026-05-21',
		title: 'First Fortress Competition',
		category: 'pvp'
	},
	{
		date: '2026-05-24',
		title: 'Hero Gear Reforge Unlocked',
		category: 'feature'
	},
	{
		date: '2026-06-04',
		title: 'Fertile Land Fog Cleared',
		category: 'feature'
	},
	{
		date: '2026-06-10',
		title: 'Alliance Resource Exchange Unlocks',
		category: 'feature'
	},
	{
		date: '2026-06-15',
		title: 'Generation 2 Heroes',
		category: 'heroes',
		notes:
			'Zoe (Infantry, Roulette Wheel hero), Hilde (Cavalry), and Marlin (Archer) added to game.'
	},
	{
		date: '2026-06-19',
		title: 'First Castle Competition',
		category: 'pvp'
	},
	{
		date: '2026-06-20',
		title: 'Generation 1 Pets',
		category: 'pets',
		notes:
			'Grey Wolf, Lynx, and Bison added to pet roster.'
	},
	{
		date: '2026-07-05',
		title: 'Age of Truegold',
		category: 'truegold',
		notes:
			'Unlocks TG levels 1-3'
	},
	{
		date: '2026-07-07',
		title: 'Generation 2 Pets',
		category: 'pets',
		notes:
			'Cheetah and Moose added to pet roster.'
	},
	{
		date: '2026-07-13',
		title: 'First KvK Prep Starts',
		category: 'pvp'
	},
	{
		date: '2026-07-18',
		title: 'First KvK Castle Competition',
		category: 'pvp'
	},
	{
		date: '2026-07-20',
		title: 'First Alliance Brawl',
		category: 'pvp'
	},
	{
		date: '2026-08-17',
		title: 'Generation 3 Heroes',
		category: 'heroes',
		notes:
			'Eric (Infantry), Petra (Cavalry, Roulette Wheel hero), and Jaeger (Archer) added to game.'
	},
	{
		date: '2026-08-17',
		title: 'Generation 3 Pets',
		category: 'pets',
		notes:
			'Lion and Grizzly Bear added to pet roster.'
	},
	{
		date: '2026-08-17',
		title: 'Gov Gear Material Exchange Unlocks',
		category: 'feature',
		notes:
			'Allows for the exchange of Governor Gear materials (Satin, Gilded Threads, and Artisan\'s Vision) in the top right of the gear upgrade panel.'
	},
	{
		date: '2026-08-17',
		title: 'Masters Unlocked',
		category: 'masters',
		notes:
			'Requires player to have Town Center lvl 25. Valora, Pan, and Roman released as the first 3 masters. We currently suspect this is the first 3 masters only and other generations unlock later/may exist. Need to verify as players progress through this content.'
	},
	{
		date: '2026-09-28',
		title: 'Truegold 5',
		category: 'truegold',
		predicted: true,
		notes:
			'Also unlocks Truegold Crucible (converts basic resources into Truegold). Governor charm materials added to Mystic Trial store. Level 8 Terror (Titan Roc) added to the game. From this point forward, your Kingdom will be eligible for the next Kingdom Transfer Window. To see detailed predictions, check out our Kingdom Transfer module.'
	},
	{
		date: '2026-09-28',
		title: 'Gov Charm Material Exchange Unlocked',
		category: 'feature',
		predicted: true,
		notes:
			'Allows for the exchange of Governor Charm materials (Charm Guide and Charm Design) in the top right of the gear upgrade panel.'
	},
	{
		date: '2026-09-28',
		title: '4th Master Unlocked',
		category: 'masters',
		predicted: true,
		notes:
			'4th master (Cassia) added to the game.'
	},
	{
		date: '2026-10-19',
		title: 'Governor Charm Cap Raised',
		category: 'feature',
		predicted: true,
		notes:
			'Charms level 12+ available. While not immediately achievable for most players, this small milestone splits Transfer Groups and must be called out.'
	},
	{
		date: '2026-11-09',
		title: 'Generation 4 Heroes',
		category: 'heroes',
		predicted: true,
		notes:
			'Alcar (Infantry), Margot (Cavalry), and Rosa (Archer, Roulette Wheel hero) added to game. The Desert Trial Event transforms into Champions Way. Gen 2 heroes enter the gold key loot pool.'
	},
	{
		date: '2026-11-09',
		title: 'Generation 4 Pets',
		category: 'pets',
		predicted: true,
		notes:
			'Giant Rhino and Mighty Bison added to pet roster.'
	},
	{
		date: '2026-11-09',
		title: '5th and 6th Masters Unlocked',
		category: 'masters',
		predicted: true,
		notes:
			'5th and 6th masters (Guinevere and Wilson) added to the game.'
	},
	{
		date: '2026-12-07',
		title: 'War Academy Unlocked',
		category: 'feature',
		predicted: true,
		notes:
			'Truegold Dust and T11 troops added to game.'
	},
	{
		date: '2027-02-01',
		title: 'Generation 5 Heroes',
		category: 'heroes',
		predicted: true,
		notes:
			'Long Fei (Infantry, Roulette Wheel hero), Thrud (Cavalry), and Vivian (Archer) added to game. Gen 3 heroes enter the gold key loot pool.'
	},
	{
		date: '2027-02-01',
		title: 'Generation 5 Pets',
		category: 'pets',
		predicted: true,
		notes:
			'Great Moose and Alpha Black Panther added to pet roster.'
	},
	{
		date: '2027-03-15',
		title: 'Truegold 8',
		category: 'truegold',
		predicted: true,
		notes:
			'Tempered Truegold added to the game. Enhances Truegold Crucible to allow Tempered Truegold conversion. Governor gear chests added to Mystic Trial store.'
	},
	{
		date: '2027-04-26',
		title: 'Generation 6 Heroes',
		category: 'heroes',
		predicted: true,
		notes:
			'Triton (Infantry), Sophia (Cavalry, Roulette Wheel hero), and Yang (Archer) added to game. Gen 4 heroes enter the gold key loot pool.'
	},
	{
		date: '2027-04-26',
		title: 'Generation 6 Pets',
		category: 'pets',
		predicted: true,
		notes:
			'Regal White Lion and Ironclad War Elephant added to pet roster.'
	},
	{
		date: '2027-06-06',
		title: 'First Flamedragon Tyrant Competition',
		category: 'pvp',
		predicted: true
	},
	{
		date: '2027-07-19',
		title: 'Generation 7 Heroes',
		category: 'heroes',
		predicted: true,
		notes:
			'Charles (Infantry), Ava (Cavalry), and Wee & Woo (Archer, Roulette Wheel hero) added to game. Gen 5 heroes enter the gold key loot pool.'
	},
	{
		date: '2027-07-19',
		title: 'Generation 7 Pets',
		category: 'pets',
		predicted: true,
		notes:
			'Ironclad War Bear added to pet roster.'
	},
	{
		date: '2027-08-30',
		title: 'Advanced Truegold Research',
		category: 'truegold',
		predicted: true,
		notes:
			'Advanced Truegold Research becomes available in the War Academy.'
	},
	{
		date: '2027-10-11',
		title: 'Generation 8 Heroes',
		category: 'heroes',
		predicted: true,
		notes:
			'Gen 6 heroes enter the gold key loot pool.'
	},
	{
		date: '2027-10-11',
		title: 'Generation 8 Pets',
		category: 'pets',
		predicted: true
	},
	{
		date: '2028-01-03',
		title: 'Generation 9 Heroes',
		category: 'heroes',
		predicted: true,
		notes:
			'Gen 7 heroes enter the gold key loot pool.'
	},
	{
		date: '2028-02-14',
		title: 'Truegold 10',
		category: 'truegold',
		predicted: true,
		notes:
			'Truegold levels 9 and 10 added to the game. New features in conjunction with these levels have yet to be confirmed.'
	}
];
