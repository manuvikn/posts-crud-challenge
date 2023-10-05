import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from } from "rxjs";
import { map, mergeMap, toArray } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CityPost } from "../models/city-post";
import { CityPostInterface } from "../interfaces/city-post.interface";

@Injectable()
export class CityPostsService {

    constructor(private http: HttpClient) { }

    getCityPosts(): Observable<Array<CityPost>> {

        return this.http.get<Array<CityPostInterface>>( environment.API_URL + 'posts' )
        .pipe(
            mergeMap(arr => from(arr)),
            map(({content, created_at, id, image_url, lat, long, title, updated_at}: CityPostInterface) => 
            new CityPost(id, title, content, image_url, parseFloat(lat), parseFloat(long), new Date(created_at), new Date(updated_at))),
            toArray()
        );

    }

}