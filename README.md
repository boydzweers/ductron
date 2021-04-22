![Linting](https://github.com/boydzweers/UI5XMLValidator/workflows/ESLint/badge.svg)

# SAPUI5 XML Validator

:construction: :construction: **UNDER CONSTRUCTION** :construction: :construction:

## _Keep your xml files lean and clean_

SAPUI5 XML Validator scans your XML view files for unused namespaces!

## Features

---

-   Scan your project for unused xml namespace in your views
-   Get a lean report of that scan
-   Let it fix your xml views by deleting unused namespaces
-   Initialize a config file

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

---

Initiate a config file:

```
ductron init
```

This wil automaticly generate a .ui5xv.json file in de root of the project. This file contains some default setting wich you could overwrite.

```
ductron scan
```
