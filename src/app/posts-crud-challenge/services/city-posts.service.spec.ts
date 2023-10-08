import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { CityPostsService } from "./city-posts.service";
import { CityPostInterface } from "../interfaces/city-post.interface";
import { environment } from "src/environments/environment";
import { CityPost } from "../models/city-post";
import { of } from "rxjs";
import { ActivatedRoute, convertToParamMap } from "@angular/router";

class ActivatedRouteStub {
    paramMap = of(convertToParamMap({}));
}

describe('CityPostsService', () => {
    let service: CityPostsService;
    let httpMock: HttpTestingController;

    const mockCityPosts: Array<CityPostInterface> = [
        {
            id: 1,
            title: 'Bilbao',
            content: 'content',
            created_at: '2023-10-08T12:00:00Z',
            updated_at: '2023-10-08T13:00:00Z',
            image_url: 'picture.jpg',
            lat: '40.7128',
            long: '35',
        },
        {
            id: 2,
            title: 'Murcia',
            content: 'content',
            created_at: '2023-10-08T12:00:00Z',
            updated_at: '2023-10-08T13:00:00Z',
            image_url: 'picture.jpg',
            lat: '40.7128',
            long: '45.65',
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CityPostsService,
                { provide: ActivatedRoute, useClass: ActivatedRouteStub }]
        });

        service = TestBed.inject(CityPostsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });


    it('Testing GetCityPosts', () => {

        service.getCityPosts().subscribe(cityPosts => {
            expect(cityPosts.length).toBe( mockCityPosts.length );
            expect(cityPosts).toEqual(
                mockCityPosts.map(({id, content, lat, long, image_url, created_at, title, updated_at}) => 
                new CityPost( id, title, content, image_url, parseFloat(lat), parseFloat(long), new Date(created_at), new Date(updated_at) ))
            );
        });

        const req = httpMock.expectOne(`${environment.API_URL}posts`);
        expect(req.request.method).toBe('GET');
        req.flush(mockCityPosts);

    });

    it('Testing GetCityPostById', () => {

        const testedId: number = 1;

        service.getCityPostById( testedId ).subscribe(cityPost => {
            expect(cityPost).toBeTruthy();
            expect(cityPost).toEqual(
                new CityPost( cityPost.id, cityPost.title, cityPost.content, cityPost.image_url, cityPost.lat, cityPost.long, new Date(cityPost.created_at), new Date(cityPost.updated_at) )
            );
        });

        const req = httpMock.expectOne(`${environment.API_URL}posts/${testedId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockCityPosts[ testedId ]);

    });

    it('Testing DeleteCityPostById', () => {

        const testedId: number = 1;

        service.deleteCityPostById( testedId ).subscribe(cityPost => expect( cityPost ).toBeTruthy());

        const req = httpMock.expectOne(`${environment.API_URL}posts/${testedId}`);
        expect(req.request.method).toBe('DELETE');

    });

    it('Testing UpdateCityPost', () => {

        const testedId: number = 1;
        
        const { title, content, lat, long, image_url } = mockCityPosts[testedId];
        
        const updatedCityPost = {
            title: title + ' modified',
            content, lat, long, image_url
        };

        service.updateCityPost( updatedCityPost as any, testedId ).subscribe(cityPost => {
            expect(cityPost).toBeTruthy();
            expect(cityPost).toEqual( updatedCityPost as any );
        });

        const req = httpMock.expectOne(`${environment.API_URL}posts/${testedId}`);
        expect(req.request.method).toBe('PUT');
        req.flush(updatedCityPost);

    });

    it('Testing CreateCityPostById', () => {

        const testedId: number = 1;

        service.createCityPost( mockCityPosts[ testedId ] ).subscribe(cityPost => {
            expect(cityPost).toBeTruthy();
            expect(cityPost).toEqual( mockCityPosts[ testedId ] );
        });

        const req = httpMock.expectOne(`${environment.API_URL}posts`);
        expect(req.request.method).toBe('POST');
        req.flush(mockCityPosts[ testedId ]);

    });

});