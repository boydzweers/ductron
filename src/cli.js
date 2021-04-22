'use strict';
const yargs = require('yargs');
const { scanForXmlFiles } = require('./scan');
const fs = require('fs');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const log = console.log;
let ductronConfig = false;

clear();

if (fs.existsSync('ductronrc.json')) {
	ductronConfig = require('../ductronrc.json');
}

// eslint-disable-next-line no-unused-vars
function cli(argv) {
	const args = yargs
		.command('scan', 'Scan your UI5 codebase for XML view files.', {
			path: {
				describe: 'Path to file or folder',
				alias: 'p',
				demandOption: false,
			},
			fix: {
				describe: 'Whether or not the files will be fixed',
				alias: 'f',
				demandOption: false,
			},
			exclude: {
				describe: 'Name of folder you dont want to scan.',
				alias: 'e',
				demandOption: false,
			},
			report: {
				describe: 'Whether or not you would like to see the scanning files',
				alias: 'r',
				demandOption: false,
			},
		})
		.command('init', 'Initiate config file')
		.help()
		.alias('help', 'h').argv;

	const command = args._[0];

	// Options
	let { path, fix, exclude, report } = args;

	if (ductronConfig) {
		path = path ? path : ductronConfig.startPath;
		fix = fix ? fix : ductronConfig.fix;
		exclude = exclude ? exclude.split(',') : ductronConfig.exclude;
		report = report ? report : ductronConfig.report;
	}

	if (command === undefined) {
		log(chalk.yellow(figlet.textSync('Ductron', { horizontalLayout: 'full' })));
		yargs.showHelp();
	}

	if (command === 'scan') {
		scanForXmlFiles(path, exclude, fix, report);
	}

	if (command === 'init') {
		const config = require('../config/conf.json');
		fs.writeFile('./ductronrc.json', JSON.stringify(config, null, 4), (error) => {
			if (error) {
				throw new Error(error);
			}
		});
	}
}

module.exports = {
	cli,
};
