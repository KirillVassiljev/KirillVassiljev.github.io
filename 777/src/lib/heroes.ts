import alcar from '$lib/assets/heroes/alcar.webp';
import amadeus from '$lib/assets/heroes/amadeus.webp';
import amane from '$lib/assets/heroes/amane.webp';
import ava from '$lib/assets/heroes/ava.webp';
import charles from '$lib/assets/heroes/charles.webp';
import chenko from '$lib/assets/heroes/chenko.webp';
import diana from '$lib/assets/heroes/diana.webp';
import edwin from '$lib/assets/heroes/edwin.webp';
import eric from '$lib/assets/heroes/eric.webp';
import fahd from '$lib/assets/heroes/fahd.webp';
import forrest from '$lib/assets/heroes/forrest.webp';
import gordon from '$lib/assets/heroes/gordon.webp';
import helga from '$lib/assets/heroes/helga.webp';
import hilde from '$lib/assets/heroes/hilde.webp';
import howard from '$lib/assets/heroes/howard.webp';
import jabel from '$lib/assets/heroes/jabel.webp';
import jaeger from '$lib/assets/heroes/jaeger.webp';
import longFei from '$lib/assets/heroes/long-fei.webp';
import margot from '$lib/assets/heroes/margot.webp';
import marlin from '$lib/assets/heroes/marlin.webp';
import olive from '$lib/assets/heroes/olive.webp';
import petra from '$lib/assets/heroes/petra.webp';
import quinn from '$lib/assets/heroes/quinn.webp';
import rosa from '$lib/assets/heroes/rosa.webp';
import saul from '$lib/assets/heroes/saul.webp';
import seth from '$lib/assets/heroes/seth.webp';
import sophia from '$lib/assets/heroes/sophia.webp';
import thrud from '$lib/assets/heroes/thrud.webp';
import triton from '$lib/assets/heroes/triton.webp';
import vivian from '$lib/assets/heroes/vivian.webp';
import weeWoo from '$lib/assets/heroes/wee-woo.webp';
import yang from '$lib/assets/heroes/yang.webp';
import yeonwoo from '$lib/assets/heroes/yeonwoo.webp';
import zoe from '$lib/assets/heroes/zoe.webp';

export type Hero = {
	name: string;
	image: string;
};

export const heroes = {
	alcar: { name: 'Alcar', image: alcar },
	amadeus: { name: 'Amadeus', image: amadeus },
	amane: { name: 'Amane', image: amane },
	ava: { name: 'Ava', image: ava },
	charles: { name: 'Charles', image: charles },
	chenko: { name: 'Chenko', image: chenko },
	diana: { name: 'Diana', image: diana },
	edwin: { name: 'Edwin', image: edwin },
	eric: { name: 'Eric', image: eric },
	fahd: { name: 'Fahd', image: fahd },
	forrest: { name: 'Forrest', image: forrest },
	gordon: { name: 'Gordon', image: gordon },
	helga: { name: 'Helga', image: helga },
	hilde: { name: 'Hilde', image: hilde },
	howard: { name: 'Howard', image: howard },
	jabel: { name: 'Jabel', image: jabel },
	jaeger: { name: 'Jaeger', image: jaeger },
	'long-fei': { name: 'Long Fei', image: longFei },
	margot: { name: 'Margot', image: margot },
	marlin: { name: 'Marlin', image: marlin },
	olive: { name: 'Olive', image: olive },
	petra: { name: 'Petra', image: petra },
	quinn: { name: 'Quinn', image: quinn },
	rosa: { name: 'Rosa', image: rosa },
	saul: { name: 'Saul', image: saul },
	seth: { name: 'Seth', image: seth },
	sophia: { name: 'Sophia', image: sophia },
	thrud: { name: 'Thrudd', image: thrud },
	triton: { name: 'Triton', image: triton },
	vivian: { name: 'Vivian', image: vivian },
	'wee-woo': { name: 'Wee & Woo', image: weeWoo },
	yang: { name: 'Yang', image: yang },
	yeonwoo: { name: 'Yeonwoo', image: yeonwoo },
	zoe: { name: 'Zoe', image: zoe }
} satisfies Record<string, Hero>;

export type HeroSlug = keyof typeof heroes;
