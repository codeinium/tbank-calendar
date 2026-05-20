import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchAccount } from './switch-account';

describe('SwitchAccount', () => {
  let component: SwitchAccount;
  let fixture: ComponentFixture<SwitchAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchAccount],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchAccount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
