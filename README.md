# MJMLify

MJMLify is a simple project built using Node.js that converts MJML files to HTML and supports multi-language translation. It utilizes the "mjml" dependency to handle MJML to HTML conversion.

## Project Structure

The project has the following folder structure:

- src
  - mjml        // Contains MJML files
  - lang        // Contains translation files in JSON format for different languages
  - html        // Contains the output HTML translations
  - helpers     // Contains utility functions for generating HTML, deleting translations, and listing supported languages

## Available Scripts

In the project directory, you can run the following scripts:

### Convert MJML to HTML for a Specific Language

```shell
npm run convert <file_name> <language_code>
```

This script converts a single MJML file to HTML for a specific language.

- <file_name>: The name of the MJML file to convert (without the extension)
- <language_code>: The language code (e.g., 'yor' for Yoruba, 'en' for English, 'fr' for French)

## Convert All MJML Files to HTML for a Specific Language
```shell
npm run convert_all <language_code>
```

This script converts all MJML files to HTML for a specific language.

- <language_code>: The language code (e.g., 'yor' for Yoruba, 'en' for English, 'fr' for French)

## Delete All Translations for a Specific Language
```shell
npm run delete_all <language_code>
```

This script deletes all translations (HTML files) for a specific language.

- <language_code>: The language code (e.g., 'yor' for Yoruba, 'en' for English, 'fr' for French)

## List Supported Languages

```shell
npm run ls_lang
```
This script lists all supported languages.

## Getting Started

To get started with the MJMLify project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/mjmlify.git`
2. Install dependencies: `npm install`
3. Place your MJML files in the `src/mjml` folder.
4. Create translation JSON files in the `src/lang` folder for each supported language.
5. Run the desired scripts to convert, delete, or list translations.

Feel free to customize the project structure and add more features as per your requirements.

## Supported Languages

The project supports the following languages:

- Yoruba (yor)
- English (en)
- French (fr)

Please refer to the language codes mentioned above when using the conversion and deletion scripts.

  # MJMLify
