import { Routes, RouterModule } from "@angular/router";
import { PostsCrudChallengeComponent } from "./posts-crud-challenge.component";
import { NgModule } from "@angular/core";
import { TableViewComponent } from "./views/table-view/table-view.component";
import { AboutViewComponent } from "./views/about-view/about-view.component";
import { DetailsViewComponent } from "./views/details-view/details-view.component";

const ROUTES: Routes = [
    {
        path: '',
        component: PostsCrudChallengeComponent,
        children: [
            {
                path: 'table',
                component: TableViewComponent
            },
            {
                path: 'about',
                component: AboutViewComponent
            },
            {
                path: 'details/:id',
                component: DetailsViewComponent
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'table'
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild( ROUTES ) ],
    exports: [ RouterModule ]
})
export class PostsCrudChallengeRoutingModule { }