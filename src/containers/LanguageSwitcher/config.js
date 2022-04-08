import language from '@iso/config/language.config';

import englishLang from '@iso/assets/images/flag/uk.svg';
import russianLang from '@iso/assets/images/flag/ru.png';

const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: 'english',
      locale: 'en',
      text: 'English',
      icon: englishLang,
    },
    {
      languageId: 'russian',
      locale: 'ru',
      text: 'Russian',
      icon: russianLang,
    },
  ],
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach(language => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
export default config;
