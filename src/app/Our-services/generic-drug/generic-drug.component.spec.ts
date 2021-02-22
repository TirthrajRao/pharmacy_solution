import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenericDrugComponent } from './generic-drug.component';

describe('GenericDrugComponent', () => {
  let component: GenericDrugComponent;
  let fixture: ComponentFixture<GenericDrugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericDrugComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenericDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
