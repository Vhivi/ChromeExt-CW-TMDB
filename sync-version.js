// sync-version.js
// Synchronise la version du package.json vers le manifest.json

const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, 'package.json');
const manifestPath = path.join(__dirname, 'manifest.json');

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

manifest.version = pkg.version;

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Version du manifest.json synchronisée : ${manifest.version}`);
