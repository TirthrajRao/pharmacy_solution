import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FreeHomeDeliveryComponent } from './free-home-delivery.component';

describe('FreeHomeDeliveryComponent', () => {
  let component: FreeHomeDeliveryComponent;
  let fixture: ComponentFixture<FreeHomeDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeHomeDeliveryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FreeHomeDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
