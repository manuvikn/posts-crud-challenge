import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CityPostsService } from "../../services/city-posts.service";
import { BehaviorSubject, Subscription, filter, take } from "rxjs";
import { CityPost } from "../../models/city-post";
import { Map, map, marker, tileLayer } from "leaflet"

@Component({
    selector: 'pcc-details-view',
    templateUrl: './details-view.component.html',
    styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit, AfterViewInit {

    @ViewChild('mapContainer') mapContainer: ElementRef | undefined;

    map: Map | undefined;
    cityPostSubscription: Subscription | undefined;
    cityPost: CityPost | undefined;

    $cityDataLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(private route: ActivatedRoute,
        private router: Router,
        private cityPostsService: CityPostsService) { }

    ngOnInit(): void {

        this.getRouteParam();

    }

    ngAfterViewInit(): void {

        this.$cityDataLoaded.asObservable()
            .pipe(
                filter(dataLoaded => dataLoaded),
                take(1)
            )
            .subscribe(_e => this.init2dMap())

    }

    getRouteParam(): void {

        const idParam = this.route.snapshot.paramMap.get('id') || '';
        if (/^[0-9]+$/.test(idParam)) {

            const id: number = parseInt(idParam);
            this.getCityPostById(id);

        } else {

            this.router.navigate(['']);

        }


    }

    getCityPostById(id: number): void {

        this.cityPostsService.getCityPostById(id)
            .subscribe(cityPost => {
                if (!cityPost) this.router.navigate(['']);
                else {
                    this.cityPost = cityPost;
                    this.$cityDataLoaded.next(true);
                }
            });

    }

    init2dMap(): void {

        if (!this.mapContainer || !this.cityPost || !this.cityPost.lat || !this.cityPost.long ) return;

        this.map = map(this.mapContainer.nativeElement, {
            center: [this.cityPost.lat, this.cityPost.long],
            zoom: 13
        });

        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        marker([this.cityPost.lat, this.cityPost.long]).addTo(this.map);

    }

}