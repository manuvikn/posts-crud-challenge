import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CityPostsService } from "../../services/city-posts.service";
import { BehaviorSubject, Subscription, filter, take } from "rxjs";
import { CityPost } from "../../models/city-post";
import { Map, icon, map, marker, tileLayer } from "leaflet"

@Component({
    selector: 'pcc-details-view',
    templateUrl: './details-view.component.html',
    styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('mapContainer') mapContainer: ElementRef | undefined;

    map: Map | undefined;
    cityPost: CityPost | undefined;

    cityPostSubscription: Subscription | undefined;
    cityDataLoadedSubscription: Subscription | undefined;
    
    cityDataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(protected route: ActivatedRoute,
        private router: Router,
        private cityPostsService: CityPostsService) { }

    ngOnInit(): void {

        this.getRouteParam();

    }

    ngAfterViewInit(): void {

        this.cityDataLoadedSubscription = 
        this.cityDataLoaded$.asObservable()
            .pipe(
                filter(dataLoaded => dataLoaded),
                take(1)
            )
            .subscribe(_e => this.init2dMap())

    }

    ngOnDestroy(): void {
        
        this.cityPostSubscription?.unsubscribe();
        this.cityDataLoadedSubscription?.unsubscribe();

    }

    getRouteParam(): void {

        const idParam = this.route.snapshot.paramMap.get('id') || '';
        if (/^[0-9]+$/.test(idParam)) {

            const id: number = parseInt(idParam);
            this.getCityPostById(id);

        } else {

            this.router.navigate(['table'], {relativeTo: this.route});

        }


    }

    getCityPostById(id: number): void {

        this.cityPostSubscription =
        this.cityPostsService.getCityPostById(id)
            .subscribe(cityPost => {
                if (!cityPost) this.router.navigate(['table'], {relativeTo: this.route});
                else {
                    this.cityPost = cityPost;
                    this.cityDataLoaded$.next(true);
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

        const greenIcon = icon({
            iconUrl: 'assets/img/leaf-green.png',
            shadowUrl: 'assets/img/leaf-shadow.png',
            iconSize:     [38, 95],
            shadowSize:   [50, 64],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62], 
            popupAnchor:  [-3, -76]
        });

        marker([this.cityPost.lat, this.cityPost.long], {icon: greenIcon}).addTo(this.map);

    }

}