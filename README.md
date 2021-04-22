![Linting](https://github.com/boydzweers/UI5XMLValidator/workflows/ESLint/badge.svg)

# Ductron

## _Keep your xml files lean and clean_

Ductron scans your XML view files for unused namespaces and deletes them.

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

This wil automaticly generate a ductronrc.json file in de root of the project. This file contains some default setting wich you could overwrite.
