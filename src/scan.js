'use strict';
const convert = require('xml-js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = console.log;

function getNamespaceUsage(obj, items = { ns: [], u: [] }) {
	for (const i in obj) {
		if (i.includes('xmlns:')) {
			items.ns.push(i.substr(6, i.length));
		}

		if (i.includes(':') && !i.includes('xmlns')) {
			items.u.push(i.substr(0, i.indexOf(':')));
		}
		if (typeof obj[i] == 'object') {
			getNamespaceUsage(obj[i], items);
		}
	}
	return items;
}

function notify(items) {
	const { ns, u } = items;
	const filteredUnUsed = [];
	const filteredUsed = [];
	for (const namespace of ns) {
		if (u.indexOf(namespace) > -1) {
			filteredUsed.push(namespace);
		} else {
			filteredUnUsed.push(namespace);
		}
	}

	return [converToNamespaceTag(filteredUsed), converToNamespaceTag(filteredUnUsed)];
}

function _xmlToObj(path) {
	const xml = fs.readFileSync(path);
	try {
		const object = convert.xml2js(xml, { compact: true, ignoreComment: false });
		return object;
	} catch (error) {
		log(chalk.blue(`There seems to be a problem with your XML file: ${path}`));
		throw new Error(error);
	}
}

function fixit(xml, path) {
	fs.writeFile(path, xml, (error) => {
		if (error) {
			throw error;
		}
	});
}

function _objToXml(obj) {
	const xml = convert.js2xml(obj, { compact: true, spaces: '\t' });
	return xml;
}

function converToNamespaceTag(array) {
	return array.map((el) => {
		return `xmlns:${el}`;
	});
}

function deleteUnusedNamespace(itemsToDelete, masterObject) {
	for (const item of itemsToDelete) {
		remove(masterObject, item);
	}
	return masterObject;
}

function remove(obj, key) {
	for (const k of Object.keys(obj)) {
		if (k === key) {
			delete obj[key];
			return true;
		} else if (typeof obj[k] === 'object') {
			if (remove(obj[k], key)) {
				return true;
			}
		}
	}
	return false;
}

function scan(path, fix, lastScan) {
	console.log(lastScan);
	const xmlObject = _xmlToObj(path);
	const namespacesUsage = getNamespaceUsage(xmlObject);
	const [_used, unused] = notify(namespacesUsage);

	log(`-- found: ${chalk.red(path)} -- Needs fix: ${unused.length > 0 ? 'yes' : 'no'}`);
	if (unused.length > 0) {
		if (fix === true) {
			log(chalk.blue(`Fixing file: ${path} for unused namespace(s) ${unused.join(',')}`));
			const newObject = deleteUnusedNamespace(unused, xmlObject);
			const xml = _objToXml(newObject, path);
			fixit(xml, path);
		}
	}

	if (lastScan) {
		console.log('DONE');
	}
}

let mainCountFiles = null;

function scanForXmlFiles(
	startPath = './',
	exclude = ['node_modules'],
	fix,
	report,
	filter = '.xml',
	init = true,
) {
	if (!fs.existsSync(startPath) || exclude.includes(startPath)) {
		log("-- Directory doesn't exist or its excluded:", chalk.red(startPath));
		return;
	}

	if (report === true) {
		log(chalk.blue(startPath));
	}

	const files = fs.readdirSync(startPath);
	for (let i = 0; i < files.length; i++) {
		if (init === true) {
			mainCountFiles = files.length;
		}

		const filename = path.join(startPath, files[i]);
		const stat = fs.lstatSync(filename);
		if (stat.isDirectory()) {
			scanForXmlFiles(filename, exclude, fix, report, filter, false);
		} else if (filename.indexOf(filter) >= 0) {
			const path = `${filename}`;
			scan(path, fix);
		}
	}
}

module.exports = {
	scanForXmlFiles,
};
