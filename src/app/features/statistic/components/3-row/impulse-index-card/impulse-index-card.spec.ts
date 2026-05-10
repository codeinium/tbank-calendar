import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpulseIndexCard } from './impulse-index-card';

describe('ImpulseIndexCard', () => {
  let component: ImpulseIndexCard;
  let fixture: ComponentFixture<ImpulseIndexCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpulseIndexCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ImpulseIndexCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
