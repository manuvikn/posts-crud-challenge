import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from, of } from "rxjs";
import { catchError, map, mergeMap, toArray } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CityPost } from "../models/city-post";
import { CityPostInterface } from "../interfaces/city-post.interface";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class CityPostsService {

    constructor(private http: HttpClient,
                private router: Router,
                private route: ActivatedRoute) { }

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
                this.router.navigate(['table'], {relativeTo: this.route});
                return of();
            })
        );

    }

    delteCityPostById( id: number ): Observable<void> {

        return this.http.delete<void>( `${environment.API_URL}posts/${id}` )
        .pipe(
            catchError(_err => {
                this.router.navigate(['table'], {relativeTo: this.route});
                return of();
            })
        );

    }

    updateCityPost( cityPost: CityPostInterface, id: number ): Observable<CityPostInterface> {

        return this.http.put<CityPostInterface>( `${environment.API_URL}posts/${id}`, cityPost)
        .pipe(
            catchError(_err => {
                this.router.navigate(['table'], {relativeTo: this.route});
                return of();
            })
        );

    }

    createCityPost( cityPost: CityPostInterface ): Observable<CityPostInterface> {

        return this.http.post<CityPostInterface>( `${environment.API_URL}posts`, cityPost)
        .pipe(
            catchError(_err => {
                this.router.navigate(['table'], {relativeTo: this.route});
                return of();
            })
        );

    }

}