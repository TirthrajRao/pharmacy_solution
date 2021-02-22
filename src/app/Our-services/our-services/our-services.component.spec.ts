import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OurServicesComponent } from './our-services.component';

describe('OurServicesComponent', () => {
  let component: OurServicesComponent;
  let fixture: ComponentFixture<OurServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurServicesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OurServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
