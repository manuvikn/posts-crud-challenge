import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CityPostsService } from "../../services/city-posts.service";
import { BehaviorSubject, Subscription, filter, take } from "rxjs";
import { CityPost } from "../../models/city-post";
import { Map, icon, map, marker, tileLayer } from "leaflet"
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CityPostInterface } from "../../interfaces/city-post.interface";

@Component({
    selector: 'pcc-edit-view',
    templateUrl: './edit-view.component.html',
    styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('mapContainer') mapContainer: ElementRef | undefined;

    map: Map | undefined;
    cityPost: CityPost | undefined;

    cityPostSubscription: Subscription | undefined;
    cityDataLoadedSubscription: Subscription | undefined;
    updateCitySubscription: Subscription | undefined;
    
    cityDataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    cityPostForm: FormGroup | undefined;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private cityPostsService: CityPostsService,
                private fb: FormBuilder) { }

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
        this.updateCitySubscription?.unsubscribe();

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

        this.cityPostSubscription =
        this.cityPostsService.getCityPostById(id)
            .subscribe(cityPost => {
                if (!cityPost) this.router.navigate(['']);
                else {
                    this.cityPost = cityPost;
                    this.initForm();
                }
            });

    }

    initForm(): void {

        if (!this.cityPost) return;

        this.cityPostForm = this.fb.group({

            'title': this.fb.control(this.cityPost.title, [Validators.required]),
            'content': this.fb.control(this.cityPost.content, [Validators.required]),
            'image_url': this.fb.control(this.cityPost.image_url, [Validators.required]),
            'lat': this.fb.control(this.cityPost.lat, [Validators.required, Validators.pattern(/^[0-9\+\-\.]+$/)]),
            'long': this.fb.control(this.cityPost.long, [Validators.required, Validators.pattern(/^[0-9\+\-\.]+$/)])

        });

        this.cityDataLoaded$.next(true);

    }

    submitForm(_e: SubmitEvent): void {

        if (!this.cityPostForm || !this.cityPost) return;

        const { title, content, image_url, lat, long } = this.cityPostForm.value;
        const updatedPost: any = {
            title,
            content,
            image_url,
            lat: String(lat),
            long: String(long)
        };

        this.updateCitySubscription =
        this.cityPostsService.updateCityPost( updatedPost, this.cityPost.id )
            .subscribe(_e => {
                if (this.cityPost)
                this.router.navigate( ['details', this.cityPost.id] );
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