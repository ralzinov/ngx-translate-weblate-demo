import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'ngx-translate-weblate-demo';

    constructor(protected translate: TranslateService) {
        this.translate.setDefaultLang('en');
        this.translate.use('en');
    }

    ngOnInit(): void {
    }

    setLocale(lang: string): void {
        this.translate.use(lang);
    }
}
