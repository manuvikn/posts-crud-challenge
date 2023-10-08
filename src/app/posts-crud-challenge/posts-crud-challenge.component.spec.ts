import { PostsCrudChallengeComponent } from './posts-crud-challenge.component';

describe('PostCrudChallengeComponent', () => {
  
  let component: PostsCrudChallengeComponent;

  beforeEach(() => {

    component = new PostsCrudChallengeComponent();

  });

  it('should create', () => {
    expect( component ).toBeTruthy();
  });

  it('test OnInit and OnDestroy methods', () => {

    component.ngOnInit();
    expect( document.body.classList.contains( 'city-sights' ) ).toBeTrue();
    
    component.ngOnDestroy();
    expect( document.body.classList.contains( 'city-sights' ) ).toBeFalse(); 

  }); 

}); 