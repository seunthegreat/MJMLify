const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'html');
const supportedLanguagesPath = path.join(__dirname, '..', 'supported_languages.json');

function deleteTranslations(language) {
  const supportedLanguagesData = fs.readFileSync(supportedLanguagesPath, 'utf8');
  const supportedLanguages = JSON.parse(supportedLanguagesData);

  const languageName = supportedLanguages[language];

  if (languageName) {
    const languageFolderPath = path.join(htmlPath, language);

    //-- Check if the language folder exists --//
    if (fs.existsSync(languageFolderPath)) {
      //-- Delete the language folder and its contents recursively --//
      fs.rmSync(languageFolderPath, { recursive: true });
      console.log(`Translations for '${languageName}' (${language}) have been deleted successfully!`);
    } else {
      console.log(`Translations for '${languageName}' (${language}) do not exist.`);
    }
  } else {
    console.log(`Unsupported language: '${language}'`);
  }
}

const language = process.argv[2];

if (language) {
  deleteTranslations(language);
} else {
  console.error('Please provide the language as a command-line argument.');
}
