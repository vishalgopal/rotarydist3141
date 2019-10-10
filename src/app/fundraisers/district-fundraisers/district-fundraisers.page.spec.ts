import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictFundraisersPage } from './district-fundraisers.page';

describe('DistrictFundraisersPage', () => {
  let component: DistrictFundraisersPage;
  let fixture: ComponentFixture<DistrictFundraisersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictFundraisersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictFundraisersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
