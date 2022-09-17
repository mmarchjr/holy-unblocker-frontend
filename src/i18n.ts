import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en: {
		translation: {
			contactTitle: 'Contact',
			landingTitle: 'End Internet Censorship.',
			landingCaption: 'Privacy right at your fingertips.',
			getStarted: 'Get Started',
			creditsLink: 'Credits',
			privacyLink: 'Privacy',
			touLink: 'Terms of Use',
			homeLink: 'Home',
			proxyLink: 'Proxy',
			faqLink: 'FAQ',
			navSectionGames: 'Games',
			navSectionGenre: 'Genre',
			theatreAppsLink: 'Apps',
			theatreFavoritesLink: 'Favorites',
			theatreGamesPopularLink: 'Popular',
			theatreGamesAllLink: 'All',
			gameCategory_action_: 'Action',
			gameCategory_action: 'Action & Adventure',
			gameCategory_platformer: 'Platformer',
			gameCategory_shooter_: 'Shooters',
			gameCategory_shooter: 'Shooters & Strategy',
			gameCategory_rpg: 'RPG',
			gameCategory_sandbox: 'Sandbox',
			gameCategory_survival_: 'Survival',
			gameCategory_survival: 'Survival & Horror',
			gameCategory_sports_: 'Sports',
			gameCategory_sports: 'Simulation & Sports',
			gameCategory_puzzle: 'Puzzle',
		},
	},
	fr: {
		translation: {
			contactTitle: 'Contact',
			landingTitle: `Mettre fin à la censure d'Internet.`,
			landingCaption: 'La confidentialité à portée de main.',
			getStarted: 'Commencer',
			creditsLink: 'Crédits',
			privacyLink: 'Intimité',
			touLink: `Conditions d'utilisation`,
			homeLink: 'Maison',
			proxyLink: 'Procuration',
			faqLink: 'FAQ',
			navSectionGames: 'Jeux',
			navSectionGenre: 'Genre',
			theatreAppsLink: 'Apps',
			theatreFavoritesLink: 'Favoris',
			theatreGamesPopularLink: 'Populaire',
			theatreGamesAllLink: 'Tout',
			gameCategory_action_: 'Action',
			gameCategory_action: 'Action & Aventure',
			gameCategory_platformer: 'Plateforme',
			gameCategory_shooter_: 'Tireurs',
			gameCategory_shooter: 'Jeux de tir et stratégie',
			gameCategory_rpg: 'Jeu de rôle',
			gameCategory_sandbox: 'Bac à sable',
			gameCategory_survival_: 'Survie',
			gameCategory_survival: 'Survie et Horreur',
			gameCategory_sports_: 'Des Sports',
			gameCategory_sports: 'Simulation et Sport',
			gameCategory_puzzle: 'Puzzle',
		},
	},
};

if (!localStorage.getItem('lng')) localStorage.setItem('lng', 'en');

let lng: string = localStorage.getItem('lng')!;

export const getLanguage = () => lng;

export const setLanguage = (newLng: string) => {
	lng = newLng;
	localStorage.setItem('lng', lng);
	i18n.changeLanguage(lng);
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
