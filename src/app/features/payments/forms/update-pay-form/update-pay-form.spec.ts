import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePayForm } from './update-pay-form';

describe('UpdatePayForm', () => {
  let component: UpdatePayForm;
  let fixture: ComponentFixture<UpdatePayForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePayForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePayForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
