# Internationalization i18n 

## How to add support for a new language in eRestaurant

##### Assuming that we want to add the Spanish language support
+ First of all, go to the folder `/app/shared/language`, open the file `language_constants.ts` and add `'es',` in LANGUAGES constants & `es: { nzKey: es_ES }` in NZLANGUAGES constants. 

```javascript
import { de_DE, en_US, fr_FR, NzI18nInterface } from "ng-zorro-antd/i18n";

/*
    Languages codes are ISO_639-1 codes, see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    They are written in English to avoid character encoding issues (not a perfect solution)
*/
export const LANGUAGES: string[] = [
  'en',
  'fr',
  'de',
  'es', //line added for spanish language
];

export const NZLANGUAGES: { [key: string]: { nzKey: NzI18nInterface } } = {
  en: { nzKey: en_US },
  fr: { nzKey: fr_FR },
  de: { nzKey: de_DE },
  es: { nzKey: es_ES } //line added for spanish language
};

export function getNzKeyfromLanguageKey(languageKey: string): NzI18nInterface {
  return NZLANGUAGES[languageKey].nzKey;
}
```

+ Create a folder named `es` in the `i18n` folder and add all the required files for translation


+ Go to `webpack` folder and open the file `webpack.custom.js`, search for `MergeJsonWebpackPlugin`
and add this line 

```javascript
{ pattern: './src/i18n/es/*.json', fileName: './i18n/es.json' },
```
+ Open the file `/app/shared/language/find-language-from-key.pipe.ts` and add this line 
`es: { name: 'Español' },`

```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'findLanguageFromKey' })
export class FindLanguageFromKeyPipe implements PipeTransform {
  private languages: { [key: string]: { name: string; rtl?: boolean } } = {
    en: { name: 'English' },
    fr: { name: 'Français' },
    de: { name: 'Deutsch' },
    es: { name: 'Español' }, //Line added
  };

  transform(lang: string): string {
    return this.languages[lang].name;
  }
}
```
+ That's all, you have now to translate all json files in the folder `i182/es`


## How to use translation directive in eRestaurant
Assuming that we have the file `i18n/es/global.json` with the following content 
```json
{
	"global": {
		"title": "e-Restaurant",
		"signed-in-as":"Conectado como <strong>\"{{username}}\"</strong>",
		"contact"
	}
	"footer": "© 2022 NSDC. Todos los derechos reservados."
}
```
```html
<span admTranslate="footer">© 2022 NSDC. All rights reserved.</span>
```
--
```html
<nz-divider nzText="{{ 'global.signed-in-as' | translate:{ 'username': user.login } }}" nzOrientation="left"></nz-divider>
```
or
```html
<p *ngIf="account" 
   admTranslate="global.signed-in-as"
   [translateValues]="{ username: account.login }"
>Signed in as <strong>{{account.login}}</strong></p>
```
