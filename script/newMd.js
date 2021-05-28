const fs = require('fs')
const path = require('path');
const minimist = require('minimist');

const symbols = require('log-symbols')
const chalk = require('chalk');

const args = minimist(process.argv.slice(2));

const fileName = args._[1];
const filePath = path.resolve(__dirname, `../docs/${args._[0]}/${fileName}.md`);

isFileExisted(filePath)
    .then((response) => {
        console.log(symbols.error, chalk.red(response));
    }, () => {
        const date = new Date().toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')

        const buffer = '---\n' +
            'layout: ArticleDetail\n' +
            `title: ${fileName}\n` +
            `postTime: ${date}\n` +
            '---';

        fs.writeFile(filePath, buffer, function (err) {
            if (err) console.log(symbols.error, chalk.red(err));
            console.log(chalk.green(symbols.success, 'File created successfully!'));
        })
    });

function isFileExisted(file) {
    return new Promise(function (resolve, reject) {
        fs.access(file, (err) => {
            if (err) {
                reject(err.message);
            } else {
                resolve('File already exists!');
            }
        });
    })
}