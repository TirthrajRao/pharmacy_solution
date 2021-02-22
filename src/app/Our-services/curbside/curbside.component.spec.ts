import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurbsideComponent } from './curbside.component';

describe('CurbsideComponent', () => {
  let component: CurbsideComponent;
  let fixture: ComponentFixture<CurbsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurbsideComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurbsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
