// Prepare Env
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
process.title = 'DBot';

const result = require('dotenv').config()

if (result.error) {
    console.log('Config Not Found');
    process.exit(1);
    return;
}
console.log('Config Loaded; Loading Environment: %s', process.env.NODE_ENV);

// Config
const config = {};

config.botName = "DBot";
config.DBot = {
	botName: "DBot",
	name: 'Alex D.',
	username: 'JustAlexxxD',
	password: 'devlife',
	email: 'JustAlexxxD@gmail.com'
}

// App Settings
config.port = Number(process.env.PORT || 3000);
config.description = "Performer / Dork";
config.keywords = ['alex d., xxx'];
config.name = 'Alex D.';
config.author = "Skeetzo";

// Deploy Environment
require('./deploy').call(config);

// Site
config.title = "Alex D.";
config.siteTitle = "Alex D."

config.domain = "skeetzo.com";
config.ssl_key = `/etc/letsencrypt/live/${config.domain}/privkey.pem`;
config.ssl_cert = `/etc/letsencrypt/live/${config.domain}/fullchain.pem`;
if (config.debugging) config.domain = "localhost";
if (config.ssl) config.domain = "https://"+config.domain;
else config.domain = "http://"+config.domain;

config.pages = ['privacy','terms','links','blog'];

// Google Calendar
config.testedSummaryDefault = 'Tested';

// Twitter
config.Twitter_On = true;
config.Twitter_screen_name = 'JustAlexxxD';

config.projects = [
	// {
	// 	image: 'images/morphallus.png',
	// 	name: 'Morphallus',
	// 	version: '0.4.0',
	// 	description: 'Amazon Wishlist Tweeter',
	// 	url: 'https://morphallus.herokuapp.com',
	// },
	// {
	// 	image: 'images/sheela.png',
	// 	name: 'Sheela Na Gig',
	// 	version: '0.9.0',
	// 	description: 'Performer Network Sites',
	// 	url: 'https://sheelanagig.herokuapp.com',
	// },
	// {
	// 	image: 'images/kairos.png',
	// 	name: 'Kairosnaps',
	// 	version: '0.1.9',
	// 	description: 'Private Snapchats',
	// 	url: 'https://github.com/skeetzo/kairosnaps',
	// },
	// {
	// 	image: 'images/opp.png',
	// 	name: 'Pron Life',
	// 	version: '0.9.0',
	// 	description: 'Performer Management Aid',
	// 	url: 'https://docs.google.com/spreadsheets/d/11L8fkZKTGFy3xnVeWUM4oR01yNdGAOzP652cqUJjZLQ',
	// },
	{
		image: '/images/onlysnarf.png',
		name: 'OnlySnarf',
		version: '4.4.1',
		description: 'OnlyFans Automation',
		url: 'https://pypi.org/project/OnlySnarf/',
	}
];

config.links = [
	{
		image: '/images/instagram.jpg',
		name: 'Instagram',
		url: 'https://instagram.com/alexdicksdown'
	},
	{
		image: '/images/manyvids.jpg',
		name: 'Manyvids',
		url: 'https://www.manyvids.com/Profile/1002026400/justalexxxd/Store/Videos/'
	},
	{
		image: '/images/onlyfans.jpg',
		name: 'OnlyFans',
		url: 'https://onlyfans.com/alexdicksdown'
	},
	{
		image: '/images/pornhub.jpg',
		name: 'Pornhub',
		url: 'https://www.pornhub.com/pornstar/alex-d'
	},
	{
		image: '/images/twitter.jpg',
		name: 'Twitter',
		url: 'https://twitter.com/justalexxxd'
	},
]

config.blog = [

]

config.pageData = 
{ 	
	domain: config.domain,
	title: config.title,
	description: config.description,
	author: config.author,
	projects: config.projects,		
	links: config.links,		
	logged_in: false,
	// btc: "gofuckyourmother",
	cashapp: "alexdicksdown",
	paypal: "alexdicksdown",
	// blog: config.blog
};

require('./keys.js').call(config);
require('./cron.js').call(config);
require('./regexes.js').call(config);

module.exports = config;