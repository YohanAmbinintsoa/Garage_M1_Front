import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanoDetailsServiceComponent } from './mecano-details-service.component';

describe('MecanoDetailsServiceComponent', () => {
  let component: MecanoDetailsServiceComponent;
  let fixture: ComponentFixture<MecanoDetailsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecanoDetailsServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanoDetailsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
