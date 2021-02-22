import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EScribeComponent } from './e-scribe.component';

describe('EScribeComponent', () => {
  let component: EScribeComponent;
  let fixture: ComponentFixture<EScribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EScribeComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EScribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
