import * as faker from 'faker';
import {map, filter} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {marker as i18n} from '@biesbjerg/ngx-translate-extract-marker';

const WORLD_CONSTANT = i18n('world');

interface IHostProfile {
    name: string;
    gender?: string;
}

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    date = new Date();
    balance = 42.37;

    hosts: IHostProfile[] = [
        {name: 'Mr. Johnson', gender: 'male'},
        {name: 'Mrs. Brown', gender: 'female'},
        {name: 'Hotel Artur'},
    ];
    host: IHostProfile = this.hosts[0];
    guests = [];

    param = {value: WORLD_CONSTANT};
    param$ = this.translate.stream(WORLD_CONSTANT).pipe(
        filter(Boolean),
        map((value) => ({value}))
    );

    constructor(protected translate: TranslateService) {
        this.translate.instant('test');
    }

    get lang(): string {
        return this.translate.currentLang;
    }

    get hostName() {
        return this.host.name;
    }

    ngOnInit() {
        this.param$.subscribe(console.log);
    }

    setHost(host: IHostProfile): void {
        this.host = host;
    }

    add() {
        this.guests.push(`${faker.name.firstName()} ${faker.name.lastName()}`);
    }

    remove() {
        this.guests = this.guests.slice(1, this.guests.length);
    }
}
