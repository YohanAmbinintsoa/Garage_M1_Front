import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMvtComponent } from './stock-mvt.component';

describe('StockMvtComponent', () => {
  let component: StockMvtComponent;
  let fixture: ComponentFixture<StockMvtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMvtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockMvtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
