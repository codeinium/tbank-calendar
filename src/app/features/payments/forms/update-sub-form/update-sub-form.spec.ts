import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubForm } from './update-sub-form';

describe('UpdateSubForm', () => {
  let component: UpdateSubForm;
  let fixture: ComponentFixture<UpdateSubForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSubForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateSubForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
