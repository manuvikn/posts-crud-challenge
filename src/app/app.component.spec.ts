import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(() => {TestBed.configureTestingModule({
    declarations: [AppComponent],
    imports: [ RouterTestingModule ]
  }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'posts-crud-challenge'`, () => {
    expect(app.title).toEqual('posts-crud-challenge');
  });

});