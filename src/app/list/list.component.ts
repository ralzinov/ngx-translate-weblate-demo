import * as faker from 'faker';
import {map, filter} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {marker as i18n} from '@biesbjerg/ngx-translate-extract-marker';
import {BehaviorSubject, combineLatest} from 'rxjs';

const WORLD_CONSTANT = i18n('world');
const HOST_MESSAGE_PLURAL = i18n(`
    {hostGender, select,
        male {
            {guestsLength, plural,
                =0    { Mr. {hostName} does not give a party.}
                one   { Mr. {hostName} invites {mainGuest} to <b>his</b> party.}
                =2    { Mr. {hostName} invites {mainGuest} and one other person to <b>his</b> party.}
                other { Mr. {hostName} invites {mainGuest} and {otherGuestsLength} other people to <b>his</b> party.}
            }
        }
        female {
            {guestsLength, plural,
                =0    { Mrs. {hostName} does not give a party.}
                one   { Mrs. {hostName} invites {mainGuest} to <b>her</b> party.}
                =2    { Mrs. {hostName} invites {mainGuest} and one other person to <b>her</b> party.}
                other { Mrs. {hostName} invites {mainGuest} and {otherGuestsLength} other people to <b>her</b> party.}
            }
        }
        other {
            {guestsLength, plural,
                =0    { {hostName} do not give a party.}
                one   { {hostName} invite {mainGuest} to <b>their</b> party.}
                =2    { {hostName} invite {mainGuest} and one other person to <b>their</b> party.}
                other { {hostName} invite {mainGuest} and {otherGuestsLength} other people to <b>their</b> party.}
            }
        }
    }
`);

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
        {name: 'Johnson', gender: 'male'},
        {name: 'Brown', gender: 'female'},
        {name: 'Hotel Artur'},
    ];
    host: IHostProfile = this.hosts[0];
    guests = [];

    param = {value: WORLD_CONSTANT};
    param$ = this.translate.stream(WORLD_CONSTANT).pipe(
        filter(Boolean),
        map((value) => ({value}))
    );


    listChange$ = new BehaviorSubject<void>(null);
    hostPluralMessage$ = combineLatest(this.translate.onLangChange, this.listChange$).pipe(
        map(() => this.translate.instant(HOST_MESSAGE_PLURAL, {
            hostGender: this.host.gender,
            hostName: this.host.name,
            guestsLength: this.guests.length,
            mainGuest: this.guests[0],
            otherGuestsLength: this.guests.length - 1
        }))
    );

    constructor(protected translate: TranslateService) {
        this.translate.instant('test');
    }

    get lang(): string {
        return this.translate.currentLang;
    }

    ngOnInit() {
        this.param$.subscribe(console.log);
    }

    setHost(host: IHostProfile): void {
        this.host = host;
        this.listChange$.next();
    }

    add() {
        this.guests.push(`${faker.name.firstName()} ${faker.name.lastName()}`);
        this.listChange$.next();
    }

    remove() {
        this.guests = this.guests.slice(1, this.guests.length);
        this.listChange$.next();
    }
}
