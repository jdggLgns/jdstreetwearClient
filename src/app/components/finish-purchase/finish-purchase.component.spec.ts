import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishPurchaseComponent } from './finish-purchase.component';

describe('FinishPurchaseComponent', () => {
  let component: FinishPurchaseComponent;
  let fixture: ComponentFixture<FinishPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinishPurchaseComponent]
    });
    fixture = TestBed.createComponent(FinishPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
