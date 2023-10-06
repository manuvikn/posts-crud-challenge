import { Component, Input } from '@angular/core';

@Component({
    selector: 'pcc-frame-picture',
    templateUrl: './frame-picture.component.html',
    styleUrls: ['./frame-picture.component.scss']
})
export class FramePictureComponent {
    
    @Input('image_url') imageUrl: string | undefined = '';

    constructor() { }

}