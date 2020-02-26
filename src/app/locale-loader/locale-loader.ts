import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import {TranslateLoader, TranslateModuleConfig} from '@ngx-translate/core';
import {default as fr} from '@angular/common/locales/fr';
import {default as en} from '@angular/common/locales/en';
import {default as enExtra} from '@angular/common/locales/extra/en';
import {default as frExtra} from '@angular/common/locales/extra/fr';


const LOCALES = {
    fr, en
};

type ILangKeys = keyof typeof LOCALES;

const EXTRAS: {[k in ILangKeys]: object} = {
    fr: frExtra,
    en: enExtra
};

const DEFAULT_LOCALE = 'en';

export class TranslationsLoader implements TranslateLoader {
    constructor(private http: HttpClient) {}

    getTranslation(lang: string = DEFAULT_LOCALE): Observable<any> {
        return this.http.post(`/api/locale/${lang}/`, null, {}).pipe(
            tap(() => registerLocaleData(LOCALES[lang], lang, EXTRAS[lang]))
        );
    }
}

export const TranslationsProvider: TranslateModuleConfig = {
    loader: {
        provide: TranslateLoader,
        useClass: TranslationsLoader,
        deps: [HttpClient]
    },
    useDefaultLang: false
};
