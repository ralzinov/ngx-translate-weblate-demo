import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './list/list.component';
// import {marker as i18n} from '@biesbjerg/ngx-translate-extract-marker';
//
// const WORLD_CONSTANT = i18n('world333');
// console.log(WORLD_CONSTANT);


const routes: Routes = [{
    path: '**',
    component: ListComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
