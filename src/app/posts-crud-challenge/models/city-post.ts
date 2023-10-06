export class CityPost {

    id: number = 0;
    content: string = '';
    title: string = '';
    image_url: string = '';
    lat: number = 0;
    long: number = 0;
    created_at: Date = new Date();
    updated_at: Date = new Date();

    constructor(id: number, title: string, content: string, image_url: string, lat: number, long: number, created_at: Date, updated_at: Date) {

        this.id = id;
        this.content = content;
        this.title = title;
        this.image_url = image_url;
        this.lat = lat;
        this.long = long;
        this.created_at = created_at;
        this.updated_at = updated_at;

    }

}