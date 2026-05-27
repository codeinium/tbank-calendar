import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringSuggestionsForm } from './recurring-suggestions-form';

describe('RecurringSuggestionsForm', () => {
  let component: RecurringSuggestionsForm;
  let fixture: ComponentFixture<RecurringSuggestionsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringSuggestionsForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RecurringSuggestionsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
