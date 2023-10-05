export class CityPost {

    id: number | undefined;
    content: string | undefined;
    title: string | undefined;
    image_url: string | undefined
    lat: number | undefined;
    long: number | undefined;
    created_at: Date | undefined;
    updated_at: Date | undefined;

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