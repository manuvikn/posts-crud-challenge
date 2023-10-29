import { Component, OnDestroy, OnInit } from "@angular/core";
import { CityPostsService } from "./services/city-posts.service";

@Component({
    selector: 'pcc-posts-crud-challenge',
    templateUrl: './posts-crud-challenge.component.html',
    styleUrls: [
        './posts-crud-challenge.component.scss', 
        './styles/variables.scss',
        './styles/responsive-styles.scss',
        './styles/inputs.scss',
        './styles/scroll-bar.scss',
        './styles/prevent-bootstrap.scss',
        './styles/button.scss',
        './styles/alerts.scss'
    ],
    providers: [ CityPostsService ]
})
export class PostsCrudChallengeComponent implements OnInit, OnDestroy {

    constructor() { }

    ngOnInit(): void {
        
        document.body.classList.add( 'city-sights' );

    }

    ngOnDestroy(): void {

        document.body.classList.remove( 'city-sights' );

    }

}