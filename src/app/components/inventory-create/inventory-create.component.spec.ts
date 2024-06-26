import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCreateComponent } from './inventory-create.component';

describe('InventoryCreateComponent', () => {
  let component: InventoryCreateComponent;
  let fixture: ComponentFixture<InventoryCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
