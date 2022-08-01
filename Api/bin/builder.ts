import * as fs from 'fs';
import * as path from 'path';

const srcEmailFile: string = path.join(__dirname, `../src/server/tools/mail/emailTempo.json`);
const destEmailFile: string = path.join(__dirname, `../prod/server/tools/mail/emailTempo.json`);
fs.copyFileSync(srcEmailFile, destEmailFile);
