import { Routes, RouterModule } from "@angular/router";
import { PostsCrudChallengeComponent } from "./posts-crud-challenge.component";
import { NgModule } from "@angular/core";

const ROUTES: Routes = [
    {
        path: '',
        component: PostsCrudChallengeComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild( ROUTES ) ],
    exports: [ RouterModule ]
})
export class PostsCrudChallengeRoutingModule { }