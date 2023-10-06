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
import { DetailsViewComponent } from "./views/details-view/details-view.component";
import { FramePictureComponent } from "./components/frame-picture/frame-picture.component";
import { EditViewComponent } from "./views/edit-view/edit-view.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        PostsCrudChallengeRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PostsCrudChallengeComponent,
        DashboardComponent,
        NavbarComponent,
        TableViewComponent,
        AboutViewComponent,
        DetailsViewComponent,
        FramePictureComponent,
        EditViewComponent
    ],
    exports: [],
    providers: [
        CityPostsService
    ]
})
export class PostsCrudChallengeModule { }