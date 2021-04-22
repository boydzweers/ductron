# Ductron for SAPUi5

## _Keep your xml files lean and clean_

Ductron scans your UI5 XML view files for unused namespaces and deletes them.

## Features

---

-   Scan your project for unused xml namespace in your views
-   Let it fix your xml views by deleting unused namespaces

## Installation

---

**Install Globally**

```
npm install -g ductron
```

**Install Locally**

```
npm install ductron
```

## Usage

```
ductron scan --fix
```

---

Initiate a config file:

```
ductron init
```

This wil automaticly generate a ductronrc.json file in de root of the project. This file contains some default settings.

```
{
	"startPath": "./",
	"exclude": ["node_modules", ".git"],
	"fix": false,
	"report": false
}
```
