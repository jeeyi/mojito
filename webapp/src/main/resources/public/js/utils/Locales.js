import Cldr from "cldrjs";
import _ from "lodash";

Cldr.load(require('cldr-data/supplemental/likelySubtags.json'));

Cldr.load(require('cldr-data/main/' + LOCALE + '/languages.json'));
Cldr.load(require('cldr-data/main/' + LOCALE + '/territories.json'));

let territoryAndLanguageMap = {
    'be': { language: 'be',
          territory: '',
          displayLanguage: 'беларуская',
          displayTerritory: 'Беларусь'
        },
    'cs': { language: 'cs',
          territory: 'CZ',
          displayLanguage: 'čeština',
          displayTerritory: 'Česká republika'
        },
    'de': { language: 'de',
          territory: 'DE',
          displayLanguage: 'Deutsch',
          displayTerritory: 'Deutschland'
        },
    'el': { language: 'el',
          territory: 'GR',
          displayLanguage: 'Ελληνικά',
          displayTerritory: 'Ελλάδα'
        },
    'en': { language: 'en',
          territory: 'US',
          displayLanguage: 'English',
          displayTerritory: 'United States'
        },
    'es': { language: 'es',
          territory: 'ES',
          displayLanguage: 'español',
          displayTerritory: 'España'
        },
    'fr': { language: 'fr',
          territory: 'FR',
          displayLanguage: 'français',
          displayTerritory: 'France'
        },
    'id': { language: 'id',
          territory: 'ID',
          displayLanguage: 'Indonesia',
          displayTerritory: 'Indonesia'
        },
    'it': { language: 'it',
          territory: 'IT',
          displayLanguage: 'italiano',
          displayTerritory: 'Italia'
        },
    'ja': { language: 'ja',
          territory: 'JP',
          displayLanguage: '日本語',
          displayTerritory: '日本'
        },
    'ko': { language: 'ko',
          territory: 'KR',
          displayLanguage: '한국어',
          displayTerritory: '대한민국'
        },
    'ms': { language: 'ms',
          territory: 'MY',
          displayLanguage: 'Bahasa Melayu',
          displayTerritory: 'Malaysia'
        },
    'nl': { language: 'nl',
          territory: 'NL',
          displayLanguage: 'Nederlands',
          displayTerritory: 'Nederland'
        },
    'pl': { language: 'pl',
          territory: 'PL',
          displayLanguage: 'polski',
          displayTerritory: 'Polska'
        },
    'pt': { language: 'pt',
          territory: 'BR',
          displayLanguage: 'português',
          displayTerritory: 'Brasil'
        },
    'ru': { language: 'ru',
          territory: 'RU',
          displayLanguage: 'русский',
          displayTerritory: 'Россия'
        },
    'tr': { language: 'tr',
          territory: 'TR',
          displayLanguage: 'Türkçe',
          displayTerritory: 'Türkiye'
        },
    'vi': { language: 'vi',
          territory: 'VN',
          displayLanguage: 'Tiếng Việt',
          displayTerritory: 'Việt Nam'
        },
    'zh-Hans': { language: 'zh-Hans',
          territory: 'CN',
          displayLanguage: '中文',
          displayTerritory: '中国'
        },
    'zh-Hant': { language: 'zh-Hant',
          territory: 'TW',
          displayLanguage: '中文',
          displayTerritory: '台灣'
        }
};

class Locales {

    constructor() {
        //TODO don't use global var for LOCALE?
        this.currentLocale = LOCALE;
        this.cldr = new Cldr(this.currentLocale);
    }

    /**
     * Gets the list of supported locales in the app.
     *
     * Must add CLDR data accordingly, see above.
     *
     * @returns {string[]}
     */
    getSupportedLocales() {
        return [
            'be',
            'cs',
            'de',
            'el',
            'en',
            'es',
            'fr',
            'id',
            'it',
            'ja',
            'ko',
            'ms',
            'nl',
            'pl',
            'pt',
            'ru',
            'tr',
            'vi',
            'zh-Hans',
            'zh-Hant'
        ];
    }

    /**
     * Gets the language and territory information of the bcp47 tag
     *
     * @returns {string} bcp47 tag
     */
    getLanguageAndTerritory(bcp47Tag) {
        return territoryAndLanguageMap[bcp47Tag];
    }

    /**
     * Gets a list of language that are RTL
     * @returns {string[]}
     */
    getRightToLeftLanguages() {

        return [
            'ar',
            'arc',
            'bqi',
            'ckb',
            'dv',
            'fa',
            'glk',
            'he',
            'lrc',
            'mzn',
            'pnb',
            'ps',
            'sd',
            'ug',
            'ur',
            'yi'
        ];
    }


    /**
     * Gets the current locale of the app as a bcp47 tag
     *
     * @returns {string} bcp47 tag of the app locale
     */
    getCurrentLocale() {
        return this.currentLocale;
    }


    /**
     * Gets the display name of the current locale
     *
     * @returns {string} the display name of the current locale
     */
    getCurrentLocaleDisplayName() {
        return this.getDisplayName(this.getCurrentLocale());
    }

    /**
     * Gets the locale display name in current language, format: language (territory)
     *
     * @param bcp47Tag the bcp47 tag
     * @returns {string} the locale display name
     */
    getDisplayName(bcp47Tag) {

        const targetCldr = new Cldr(bcp47Tag);

        const language = targetCldr.attributes.language;
        const territory = targetCldr.attributes.territory;

        const languageDisplay = this.cldr.main("localeDisplayNames/languages/" + language);
        const regionDisplay = this.cldr.main("localeDisplayNames/territories/" + territory);

        return languageDisplay + ' (' + regionDisplay + ')';
    }

    /**
     * Gets the native display name of a locale given its bcp47 tag. Native means in the locale language of the given
     * locale, eg. getNativeDispalyName('be-BE') -> беларуская (Беларусь)
     *
     * @param bcp47Tag bcp47 tag of the locale
     * @returns {string} the native display name
     */
    getNativeDispalyName(bcp47Tag) {
        const langAndTerritoryInfo = this.getLanguageAndTerritory(bcp47Tag);

        const language = langAndTerritoryInfo.language;
        const territory = langAndTerritoryInfo.territory;

        const languageDisplay = langAndTerritoryInfo.displayLanguage;
        const regionDisplay = langAndTerritoryInfo.displayTerritory;

        return languageDisplay + ' (' + regionDisplay + ')';
    }

    /**
     * Gets the direction (ltr or rtl) of a locale
     *
     * @param bcp47Tag bcp47 tag of the locale
     * @returns {string} the direction (ltr or rtl)
     */
    getLanguageDirection(bcp47Tag) {

        const targetCldr = new Cldr(bcp47Tag);
        const language = targetCldr.attributes.language;

        let dir = "ltr";

        if (_.includes(this.getRightToLeftLanguages(), language)) {
            dir = "rtl";
        }

        return dir;
    }

    /**
     * Returns sorted objects by the locale display name
     *
     * @param {Object[]} objects array of object that contains locale
     * @param {Function} getBcp45Tag function to retrieve bcp47Tag from the object
     * @returns {Object[]} sorted objects
     */
    sortByDisplayName(objects, getBcp47Tag) {
        return objects
            .map(object => {
                let bcp47Tag = getBcp47Tag(object);
                object.localeDisplayName = this.getDisplayName(bcp47Tag);
                return object;
            })
            .sort((a, b) => a.localeDisplayName.localeCompare(b.localeDisplayName));
    }

}
;

export default new Locales();



