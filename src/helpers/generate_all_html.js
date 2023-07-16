const mjml2html = require('mjml');
const fs = require('fs');
const path = require('path');

const mjmlFolderPath = path.join(__dirname, '..', 'mjml');
const langPath = path.join(__dirname, '..', 'lang');
const htmlPath = path.join(__dirname, '..', 'html');

function generate_all_html(language) {
  let convertedCount = 0;
  let failedCount = 0;
  let existingCount = 0;

  try {
    //-- Get all file names in the MJML folder --//
    const mjmlFiles = fs.readdirSync(mjmlFolderPath);

    //-- Iterate over the MJML files --//
    mjmlFiles.forEach((fileName) => {
      //-- Read MJML template file --//
      const mjmlFilePath = path.join(mjmlFolderPath, fileName);
      const mjmlTemplate = fs.readFileSync(mjmlFilePath, 'utf8');

      //-- Extract the file name without the extension --//
      const fileBaseName = path.basename(fileName, '.mjml');

      //-- Read JSON translation file --//
      const jsonFilePath = path.join(langPath, language, `${fileBaseName}.json`);

      if (!fs.existsSync(jsonFilePath)) {
        failedCount++;
        console.error(`Translation file '${jsonFilePath}' not found.`);
        return;
      }

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
        failedCount++;
        console.error(`Error converting '${fileName}' to HTML:`, errors);
      } else {
        //-- Create the language folder if it doesn't exist --//
        const languageFolderPath = path.join(htmlPath, language);
        if (!fs.existsSync(languageFolderPath)) {
          fs.mkdirSync(languageFolderPath, { recursive: true });
        }

        //-- Generate output file path --//
        const outputFilePath = path.join(languageFolderPath, `${fileBaseName}.html`);

        //-- Check if the HTML file already exists --//
        if (fs.existsSync(outputFilePath)) {
          existingCount++;
          console.log(`'${fileBaseName}.html' already exists.`);
        } else {
          //-- Write HTML to file --//
          fs.writeFileSync(outputFilePath, html);
          convertedCount++;
          console.log(`'${fileBaseName}.html' generated successfully!`);
        }
      }
    });

    //-- Summary --//
    console.log('\nConversion Summary:');
    console.log('------------------');
    console.log(`Converted: ${convertedCount}`);
    console.log(`Failed: ${failedCount}`);
    console.log(`Existing: ${existingCount}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

const language = process.argv[2];

if (language) {
  generate_all_html(language);
} else {
  console.error('Please provide the language as a command-line argument.');
}
