import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Component({
    selector: 'pcc-posts-crud-challenge',
    templateUrl: './posts-crud-challenge.component.html',
    styleUrls: ['./posts-crud-challenge.component.scss']
})
export class PostsCrudChallengeComponent implements OnInit {

    $posts: Observable<any> | undefined;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        
        this.$posts = this.http.get( environment.API_URL + 'posts' );

    }

}