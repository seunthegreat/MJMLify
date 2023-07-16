const supportedLanguages = require('../supported_languages.json');

function listAvailableTranslations() {
  const availableTranslations = Object.entries(supportedLanguages)
    .map(([code, language]) => `${code}: ${language}`)
    .join(', ');

  console.log('Available Translations:');
  console.log(availableTranslations);
}

listAvailableTranslations();
