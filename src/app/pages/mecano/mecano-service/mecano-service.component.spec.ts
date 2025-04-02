import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecanoServiceComponent } from './mecano-service.component';

describe('MecanoServiceComponent', () => {
  let component: MecanoServiceComponent;
  let fixture: ComponentFixture<MecanoServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MecanoServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MecanoServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
