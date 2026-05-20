import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameForm } from './name-form';

describe('NameForm', () => {
  let component: NameForm;
  let fixture: ComponentFixture<NameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NameForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
