import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAutoPayForm } from './update-auto-pay-form';

describe('UpdateAutoPayForm', () => {
  let component: UpdateAutoPayForm;
  let fixture: ComponentFixture<UpdateAutoPayForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAutoPayForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateAutoPayForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
