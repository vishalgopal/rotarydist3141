import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictEventsPage } from './district-events.page';

describe('DistrictEventsPage', () => {
  let component: DistrictEventsPage;
  let fixture: ComponentFixture<DistrictEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictEventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
