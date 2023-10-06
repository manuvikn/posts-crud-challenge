import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from, of } from "rxjs";
import { catchError, map, mergeMap, toArray } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CityPost } from "../models/city-post";
import { CityPostInterface } from "../interfaces/city-post.interface";
import { Router } from "@angular/router";

@Injectable()
export class CityPostsService {

    constructor(private http: HttpClient,
                private router: Router) { }

    getCityPosts(): Observable<Array<CityPost>> {

        return this.http.get<Array<CityPostInterface>>( environment.API_URL + 'posts' )
        .pipe(
            mergeMap(arr => from(arr)),
            map(({content, created_at, id, image_url, lat, long, title, updated_at}: CityPostInterface) => 
            new CityPost(id, title, content, image_url, parseFloat(lat), parseFloat(long), new Date(created_at), new Date(updated_at))),
            toArray(),
            catchError(err => of([]))
        );

    }

    getCityPostById( id: number ): Observable<CityPost> {

        return this.http.get<CityPostInterface>( `${environment.API_URL}posts/${id}` )
        .pipe(
            map(({content, created_at, id, image_url, lat, long, title, updated_at}: CityPostInterface) => 
            new CityPost(id, title, content, image_url, parseFloat(lat), parseFloat(long), new Date(created_at), new Date(updated_at))),
            catchError(_err => {
                this.router.navigate(['']);
                return of();
            })
        );

    }

    delteCityPostById( id: number ): Observable<void> {

        return this.http.delete<void>( `${environment.API_URL}posts/${id}` )
        .pipe(
            catchError(_err => {
                this.router.navigate(['']);
                return of();
            })
        );

    }

    updateCityPost( cityPost: CityPostInterface, id: number ): Observable<void> {

        return this.http.put<void>( `${environment.API_URL}posts/${id}`, cityPost)
        .pipe(
            catchError(_err => {
                this.router.navigate(['']);
                return of();
            })
        );

    }

}