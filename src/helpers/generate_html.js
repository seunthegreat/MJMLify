const mjml2html = require('mjml');
const fs = require('fs');
const path = require('path');

const mjmlPath = path.join(__dirname, '..', 'mjml');
const langPath = path.join(__dirname, '..', 'lang');
const htmlPath = path.join(__dirname, '..', 'html');

function generateHTML(fileName, language) {
  try {
    //-- Read MJML template file --//
    const mjmlFilePath = path.join(mjmlPath, `${fileName}.mjml`);
    const mjmlTemplate = fs.readFileSync(mjmlFilePath, 'utf8');

    //-- Read JSON translation file --//
    const jsonFilePath = path.join(langPath, language, `${fileName}.json`);
    const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
    const translation = JSON.parse(jsonData);

    //-- Replace placeholders in MJML template with translation data --//
    let mergedTemplate = mjmlTemplate;
    Object.keys(translation).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      mergedTemplate = mergedTemplate.replace(regex, translation[key]);
    });

    //-- Convert MJML to HTML --//
    const { html, errors } = mjml2html(mergedTemplate);

    if (errors && errors.length > 0) {
      console.error('MJML errors:', errors);
      return null;
    }

    return html;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

const fileName = process.argv[2];
const language = process.argv[3];

if (fileName && language) {
  const htmlOutput = generateHTML(fileName, language);

  if (htmlOutput) {
    const languageFolderPath = path.join(htmlPath, language);
    const outputFilePath = path.join(languageFolderPath, `${fileName}.html`);

    //-- Create the language folder if it doesn't exist --//
    if (!fs.existsSync(languageFolderPath)) {
      fs.mkdirSync(languageFolderPath, { recursive: true });
    }

    //-- Check if the HTML file already exists --//
    if (fs.existsSync(outputFilePath)) {
      console.log(`${fileName}.html already exists.`);
    } else {
      fs.writeFileSync(outputFilePath, htmlOutput);
      console.log(`HTML file '${outputFilePath}' generated successfully!`);
    }
  } else {
    console.error('Error generating HTML output.');
  }
} else {
  console.error('Please provide the file name and language as command-line arguments.');
}
