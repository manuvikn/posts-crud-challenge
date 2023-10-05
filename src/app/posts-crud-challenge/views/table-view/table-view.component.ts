import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CityPostsService } from "../../services/city-posts.service";
import { CityPost } from "../../models/city-post";

@Component({
    selector: 'pcc-table-view',
    templateUrl: './table-view.component.html',
    styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, OnDestroy {

    arrCityPosts: Array<CityPost> = [];
    cityPostsSubscription: Subscription | undefined;

    constructor(private cityPostsService: CityPostsService) { }

    ngOnInit(): void {

        this.loadDataTable();

    }

    trackByFn(id: number, item: CityPost): number {
        return item.id || id;
    }

    loadDataTable(): void {

        this.cityPostsSubscription = this.cityPostsService.getCityPosts()
            .subscribe(arr => this.arrCityPosts = arr);

    }

    ngOnDestroy(): void {

        this.cityPostsSubscription?.unsubscribe();

    }

}