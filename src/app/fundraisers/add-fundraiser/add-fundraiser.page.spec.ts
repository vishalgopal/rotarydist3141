import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFundraiserPage } from './add-fundraiser.page';

describe('AddFundraiserPage', () => {
  let component: AddFundraiserPage;
  let fixture: ComponentFixture<AddFundraiserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFundraiserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFundraiserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
