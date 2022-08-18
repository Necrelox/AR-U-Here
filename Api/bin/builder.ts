import * as fs from 'fs';
import * as path from 'path';

const srcEmailFile: string = path.join(__dirname, `../src/server/tools/mail/emailTempo.json`);
const destEmailFile: string = path.join(__dirname, `../prod/server/tools/mail/emailTempo.json`);
fs.copyFileSync(srcEmailFile, destEmailFile);

const srcAddonOrchestrateurFile: string = path.join(__dirname, `../src/addons/build/Release/Orchestrateur.node`);
const destAddonOrchestrateurFile: string = path.join(__dirname, `../prod/addons/build/Release/Orchestrateur.node`);

if (!fs.existsSync(__dirname +  `/../prod/addons/build/Release/`)) {
    fs.mkdirSync(__dirname +  `/../prod/addons/`)
    fs.mkdirSync(__dirname +  `/../prod/addons/build/`)
    fs.mkdirSync(__dirname +  `/../prod/addons/build/Release/`)
}

fs.copyFileSync(srcAddonOrchestrateurFile, destAddonOrchestrateurFile);
