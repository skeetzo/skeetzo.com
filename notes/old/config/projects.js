module.exports = function () {

	let projects = [

		{
			image: 'images/morphallus.png',
			name: 'Morphallus',
			version: '0.4.0',
			description: 'Amazon Wishlist Tweeter',
			url: 'https://morphallus.herokuapp.com',
		},

		{
			image: 'images/cupidcountdown.png',
			name: 'Cupid Countdown',
			version: '1.0.6',
			description: 'Valentine\'s Day Dating Game',
			url: 'https://cc.skeetzo.com',
		},

		{
			image: 'images/sheela.png',
			name: 'Sheela Na Gig',
			version: '0.9.0',
			description: 'Performer Network Sites',
			url: 'https://sheelanagig.herokuapp.com',
		},

		{
			image: 'images/kairos.png',
			name: 'Kairosnaps',
			version: '0.1.9',
			description: 'Private Snapchats',
			url: 'https://github.com/skeetzo/kairosnaps',
		},

		{
			image: 'images/opp.png',
			name: 'Pron Life',
			version: '0.9.0',
			description: 'Performer Management Aid',
			url: 'https://docs.google.com/spreadsheets/d/11L8fkZKTGFy3xnVeWUM4oR01yNdGAOzP652cqUJjZLQ',
		},
		
		{
			image: '/images/onlysnarf.png',
			name: 'OnlySnarf',
			version: '2.17.19',
			description: 'OnlyFans Automation',
			url: 'https://pypi.org/project/OnlySnarf/',
		}
	];

	this.projects = [];
	let PROJECTS = process.env.PROJECTS.split(" ");
	for (const PROJECT of PROJECTS)
		for (const project of projects)
			if (project.name.toLowerCase().replace(" ","") == PROJECT.toLowerCase())
				this.projects.push(project);

}