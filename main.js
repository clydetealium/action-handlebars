const core = require('@actions/core');
const fs = require('fs');
const Handlebars = require('handlebars');

async function main() {
  try {
    const templatePath = core.getInput('template-path');
    const data = core.getInput('data')
    const dataPath = core.getInput('data-path');
    const template = fs.readFileSync(templatePath, 'utf8');
    const context = (dataPath) ?
      fs.readFileSync(dataPath, 'utf8') :
      data;
    const compiledTemplate = Handlebars.compile(template);
    const rendered = compiledTemplate(JSON.parse(context));

    core.setOutput('rendered-template', rendered);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();

module.exports = main;
