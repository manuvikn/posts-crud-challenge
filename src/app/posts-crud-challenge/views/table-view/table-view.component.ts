import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { CityPostsService } from "../../services/city-posts.service";
import { CityPost } from "../../models/city-post";
import Swal from 'sweetalert2'

@Component({
    selector: 'pcc-table-view',
    templateUrl: './table-view.component.html',
    styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit, OnDestroy {

    arrCityPosts: Array<CityPost> = [];

    cityPostsSubscription: Subscription | undefined;
    deleteCityPostSubscription: Subscription | undefined;

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

    alertToDelete( id: number | undefined ): void {

        if (!id || isNaN(id)) return;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Record #'+ id +' deleted!',
                'Your post has been deleted.',
                'success'
              );

              this.deleteCityPost( id );

            }
          });

    }

    deleteCityPost( id: number ): void {

        this.arrCityPosts.splice( this.arrCityPosts.findIndex(({id: cityId}) => cityId == id), 1 );
        this.deleteCityPostSubscription = this.cityPostsService.delteCityPostById( id ).subscribe();

    }

    ngOnDestroy(): void {

        this.cityPostsSubscription?.unsubscribe();
        this.deleteCityPostSubscription?.unsubscribe();

    }

}