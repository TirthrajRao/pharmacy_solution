import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PriceCheckComponent } from './price-check.component';

describe('PriceCheckComponent', () => {
  let component: PriceCheckComponent;
  let fixture: ComponentFixture<PriceCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceCheckComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
