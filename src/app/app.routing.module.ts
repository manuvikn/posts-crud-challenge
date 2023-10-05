import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('./posts-crud-challenge/posts-crud-challenge.module').then(m => m.PostsCrudChallengeModule)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
    }
];

@NgModule({
    imports: [ RouterModule.forRoot( ROUTES ) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }