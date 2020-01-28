#!/usr/bin/env node

const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

if (!shell.which('git')) {
  shell.echo(chalk`{bold.red # ERROR::} {underline.bold GIT} is required!`);
  shell.echo(chalk`{bold.red # ERROR::} Please install git and try again.`);
  shell.echo(chalk`{bold.red # ERROR::} To install git, visit {underline.magenta.bold https://git-scm.com/downloads}`);
  shell.exit(1);
}

if (!shell.which('npm')) {
  shell.echo(chalk`{bold.red # ERROR::} {bold.underline NPM} is required!`);
  shell.echo(chalk`{bold.red # ERROR::} Please install NPM and try again.`);
  shell.echo(chalk`{bold.red # ERROR::} To install NPM, visit {underline.magenta.bold https://www.npmjs.com/get-npm}`);
  shell.exit(1);
}

let PROJECT_NAME = path.basename(shell.pwd().toString());

if (process.argv.length > 2) {
  PROJECT_NAME = process.argv[2];
  shell.mkdir(`./${PROJECT_NAME}`);
  shell.cd(`./${PROJECT_NAME}`);
}

shell.echo(chalk`{bold.hex('4A90E2') #}`);
shell.echo(chalk`{bold.hex('4A90E2') #} Creating a new {bold.hex('4A90E2') CONNECTIVE HTML} project ...`);
shell.echo(chalk`{bold.hex('4A90E2') #} Project Name: {bold.underline.cyan ${PROJECT_NAME}}`);

shell.echo(chalk`{bold.hex('4A90E2') #} Fetching files from starter project ...`);
shell.echo(chalk`{bold.hex('4A90E2') #}`);

shell.exec('git clone https://github.com/loreanvictor/connective-html-sample.git');
shell.cp('-rf', './connective-html-sample/src', './');
shell.cp('-f', './connective-html-sample/package.json', './');
shell.cp('-f', './connective-html-sample/tsconfig.json', './');
shell.cp('-f', './connective-html-sample/webpack.conf.ts', './');
shell.rm('-rf', './connective-html-sample');

shell.echo(chalk`{bold.hex('4A90E2') #} Updating {yellowBright package.json} ...`);
shell.echo(chalk`{bold.hex('4A90E2') #}`);

let pjson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
pjson.name = PROJECT_NAME;
pjson.description = "";
pjson.author = "";
pjson.homepage = "";
delete pjson["repository"];
delete pjson["bugs"];
fs.writeFileSync('./package.json', JSON.stringify(pjson, null, 2), 'utf8');


shell.echo(chalk`{bold.hex('4A90E2') #} Installing dependencies ...`);
shell.echo(chalk`{bold.hex('4A90E2') #}`);

shell.exec('npm i');

shell.echo(chalk`{bold.hex('76FF03') #}`);
shell.echo(chalk`{bold.hex('76FF03') # PROJECT SUCCESSFULLY CREATED!}`);
shell.echo(chalk`{bold.hex('76FF03') #}`);
shell.echo(chalk`{bold.hex('76FF03') # -->} run {cyan npm start}`);
shell.echo(chalk`{bold.hex('76FF03') # -->} open a browser on {underline.magenta.bold localhost:3000}`);
shell.echo(chalk`{bold.hex('76FF03') # -->} check contents of {bold.gray src/} folder`);
shell.echo(chalk`{bold.hex('76FF03') #}`);