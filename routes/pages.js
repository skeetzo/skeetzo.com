const fs = require('fs'),
	path = require('path'),
      mixins = require('../modules/mixins'),
	marked = require('marked');

const config = require('../config/index');
const logger = require('../modules/log').logger;

const ONE_DAY = 1000*60*60*24;

var postFiles;

module.exports = function homeRoutes(router) {

	// Index
	router.get("/", mixins.resetLocals, function (req, res, next) {
		if (/mobile/i.test(req.headers['user-agent']))
			return res.render('index-lite', req.session.locals);
		    // $.Mobile = true;
		// if (/like Mac OS X/.test(ua)) {
		//     $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
		//     $.iPhone = /iPhone/.test(ua);
		//     $.iPad = /iPad/.test(ua);
		// }
		// if (/Android/.test(ua))
		//     $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
		// if (/webOS\//.test(ua))
		//     $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];
		// if (/(Intel|PPC) Mac OS X/.test(ua))
		//     $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;
		// if (/Windows NT/.test(ua))
		//     $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
	    res.render('index', req.session.locals);
	});

	// Links
	// router.get("/links", mixins.resetLocals, function (req, res, next) {
	//     res.render('links', req.session.locals);
	// });

	// Blog
	router.get("/posts/:post", mixins.resetLocals, function (req, res, next) {
		let post = "";
		if (!postFiles) {
			postFiles = fs.readdirSync(path.join(__dirname, '../public/posts/live'));
			postFiles.push(...fs.readdirSync(path.join(__dirname, '../public/posts/archived')));
		}
		logger.debug(req.params.post)
		logger.debug(postFiles)
		setTimeout(function () {postFiles = false;}, ONE_DAY); // remember post files for a day
		// find post by 000 numbers first
		if (/[0-9]*$/i.test(req.params.post))
			for (let i=0;i<postFiles.length;i++) {
				if (postFiles[i].substring(0,3)===req.params.post) {
					post = postFiles[i];
					break;
				}
			}
		else
			for (let i=0;i<postFiles.length;i++)
				if (postFiles[i]==req.params.post+".md") {
					post = postFiles[i];
					break;
				}
		logger.debug(post);
		if (config.blog && fs.existsSync(path.join(__dirname, `../public/posts/live/${post}`)))
		    return res.send(marked(fs.readFileSync(path.join(__dirname, `../public/posts/live/${post}`), 'utf8')));
		else if (config.blog_archive && fs.existsSync(path.join(__dirname, `../public/posts/archived/${post}`)))
		    return res.send(marked(fs.readFileSync(path.join(__dirname, `../public/posts/archived/${post}`), 'utf8')));			
		req.session.locals.error = "Unable to find post!";
	    res.render('blog', req.session.locals);
	});

}



// req.session.locals.post = file.toString();
// var md = require('markdown-it')({
//   html:         false,        // Enable HTML tags in source
//   xhtmlOut:     false,        // Use '/' to close single tags (<br />).
//                               // This is only for full CommonMark compatibility.
//   breaks:       true,        // Convert '\n' in paragraphs into <br>
//   langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
//                               // useful for external highlighters.
//   linkify:      false,        // Autoconvert URL-like text to links
//   // Enable some language-neutral replacement + quotes beautification
//   // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
//   typographer:  false,
//   // Double + single quotes replacement pairs, when typographer enabled,
//   // and smartquotes on. Could be either a String or an Array.
//   //
//   // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
//   // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
//   // quotes: '“”‘’',
//   // Highlighter function. Should return escaped HTML,
//   // or '' if the source string is not changed and should be escaped externally.
//   // If result starts with <pre... internal wrapper is skipped.
//   highlight: function (/*str, lang*/) { return ''; }
// });
// req.session.locals.post = md.renderInline(file);
// req.session.locals.post = marked(file);
// req.session.locals.post = post;
// console.log(req.session.locals.post)
// return res.render('post', req.session.locals);