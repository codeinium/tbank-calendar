import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceletonBlock } from './skeleton-block';

describe('SceletonBlock', () => {
  let component: SceletonBlock;
  let fixture: ComponentFixture<SceletonBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SceletonBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(SceletonBlock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
