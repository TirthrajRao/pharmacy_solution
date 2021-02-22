import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RefillReqComponent } from './refill-req.component';

describe('RefillReqComponent', () => {
  let component: RefillReqComponent;
  let fixture: ComponentFixture<RefillReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefillReqComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RefillReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
