import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { PostsCrudChallengeRoutingModule } from "./posts-crud-challenge.routing.module";
import { PostsCrudChallengeComponent } from "./posts-crud-challenge.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TableViewComponent } from "./views/table-view/table-view.component";
import { AboutViewComponent } from "./views/about-view/about-view.component";
import { CityPostsService } from "./services/city-posts.service";

@NgModule({
    imports: [
        CommonModule,
        PostsCrudChallengeRoutingModule,
        HttpClientModule
    ],
    declarations: [
        PostsCrudChallengeComponent,
        DashboardComponent,
        NavbarComponent,
        TableViewComponent,
        AboutViewComponent
    ],
    exports: [],
    providers: [
        CityPostsService
    ]
})
export class PostsCrudChallengeModule { }