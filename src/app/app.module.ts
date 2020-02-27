import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from './app-routing.module';
import {TranslationsProvider} from './locale-loader/locale-loader';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ListComponent} from './list/list.component';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        ListComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot(TranslationsProvider)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
