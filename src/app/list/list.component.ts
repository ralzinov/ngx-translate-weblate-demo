import {map} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {marker as i18n} from '@biesbjerg/ngx-translate-extract-marker';

const WORLD_CONSTANT = i18n('world');

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    date = new Date();
    balance = 42.37;

    count = 0;
    // gender = 'male';

    param = {value: WORLD_CONSTANT};
    param$ = this.translate.stream(WORLD_CONSTANT).pipe(
        map((value) => ({value}))
    );

    constructor(protected translate: TranslateService) {
        this.translate.instant('tets');
    }

    get lang(): string {
        return this.translate.currentLang;
    }

    ngOnInit() {
        this.param$.subscribe(console.log);
    }
}
