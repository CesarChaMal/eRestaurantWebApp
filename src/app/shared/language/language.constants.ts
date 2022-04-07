import { de_DE, en_US, fr_FR, NzI18nInterface } from "ng-zorro-antd/i18n";

/*
    Languages codes are ISO_639-1 codes, see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    They are written in English to avoid character encoding issues (not a perfect solution)
*/
export const LANGUAGES: string[] = [
  'en',
  'fr',
  // 'es',
  'de',
  'pl',
  // 'it',
  // 'ro',
  // jhipster-needle-i18n-language-constant - JHipster will add/remove languages in this array
];

export const NZLANGUAGES: { [key: string]: { nzKey: NzI18nInterface } } = {
  en: { nzKey: en_US },
  fr: { nzKey: fr_FR },
  de: { nzKey: de_DE },
};

export function getNzKeyfromLanguageKey(languageKey: string): NzI18nInterface {
  return NZLANGUAGES[languageKey].nzKey;
}
