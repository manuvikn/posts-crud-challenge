import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { PostsCrudChallengeRoutingModule } from "./posts-crud-challenge.routing.module";
import { PostsCrudChallengeComponent } from "./posts-crud-challenge.component";

@NgModule({
    imports: [
        CommonModule,
        PostsCrudChallengeRoutingModule,
        HttpClientModule
    ],
    declarations: [
        PostsCrudChallengeComponent
    ],
    exports: [],
    providers: []
})
export class PostsCrudChallengeModule { }