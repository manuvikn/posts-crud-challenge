import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CityPostsService } from "../../services/city-posts.service";
import { BehaviorSubject, Subscription, filter, take } from "rxjs";
import { CityPost } from "../../models/city-post";
import { Map, Marker, icon, map, marker, tileLayer } from "leaflet"
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'pcc-edit-view',
    templateUrl: './edit-view.component.html',
    styleUrls: ['./edit-view.component.scss']
})
export class EditViewComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('mapContainer') mapContainer: ElementRef | undefined;

    map: Map | undefined;
    marker: Marker | undefined;
    cityPost: CityPost | undefined;
    isEdit: boolean = false;

    cityPostSubscription: Subscription | undefined;
    cityDataLoadedSubscription: Subscription | undefined;
    updateCreateCitySubscription: Subscription | undefined;

    cityDataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    cityPostForm: FormGroup | undefined;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private cityPostsService: CityPostsService,
        private fb: FormBuilder) { }

    ngOnInit(): void {

        this.initEditComponent();

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
        this.updateCreateCitySubscription?.unsubscribe();

    }

    initEditComponent(): void {

        this.isEdit = this.route.snapshot.data['edit'];
        if (this.isEdit) this.getRouteParam();
        else {

            this.cityPost = new CityPost(0, '', '', '', 0, 0, new Date(), new Date());
            this.initForm();

        }

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
        const cityPostBody: any = {
            title,
            content,
            image_url,
            lat: String(lat),
            long: String(long)
        };

        this.updateCreateCitySubscription = this.isEdit ?
            this.cityPostsService.updateCityPost(cityPostBody, this.cityPost.id)
                .subscribe(_e => {
                    if (this.cityPost)
                        this.router.navigate(['../../details', this.cityPost.id], {relativeTo: this.route});
                }) :

            this.cityPostsService.createCityPost(cityPostBody)
                .subscribe(({ id }) => {
                    if (id)
                        this.router.navigate(['../details', id], {relativeTo: this.route});
                });

    }

    init2dMap(): void {

        if (!this.mapContainer || !this.cityPost || this.cityPost.lat == undefined || this.cityPost.long == undefined) return;

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
            iconSize: [38, 95],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        });

        this.marker = marker([this.cityPost.lat, this.cityPost.long], { icon: greenIcon }).addTo(this.map);

    }

    changeMapPosition(): void {

        if (!this.cityPost || !this.cityPostForm || this.cityPostForm.get( 'lat' )?.invalid || this.cityPostForm.get( 'long' )?.invalid) return;

        this.map?.setView([this.cityPostForm.get('lat')?.value, this.cityPostForm.get('long')?.value]);
        this.marker?.setLatLng([this.cityPostForm.get('lat')?.value, this.cityPostForm.get('long')?.value]);

    }

    previewImage(): void {

        if (!this.cityPost || !this.cityPostForm || this.cityPostForm.get( 'image_url' )?.invalid) return;

        this.cityPost.image_url = this.cityPostForm.get( 'image_url' )?.value;

    }

}