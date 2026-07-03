import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerRow } from './beer-row';

describe('BeerRow', () => {
  let component: BeerRow;
  let fixture: ComponentFixture<BeerRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeerRow],
    }).compileComponents();

    fixture = TestBed.createComponent(BeerRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
