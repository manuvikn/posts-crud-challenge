import { FramePictureComponent } from "./frame-picture.component";

describe('FramePictureComponent', () => {

    const component: FramePictureComponent = new FramePictureComponent();

    it('Should create', () => {

        expect( component ).toBeTruthy();

    });

    it('Should have image_url', () => {

        const urlMock: string = 'urlMock';
        component.imageUrl = urlMock;

        expect( component.imageUrl ).toBeTruthy();
        expect( component.imageUrl ).toEqual( urlMock );

    });


});