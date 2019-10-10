import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictProjectsPage } from './district-projects.page';

describe('DistrictProjectsPage', () => {
  let component: DistrictProjectsPage;
  let fixture: ComponentFixture<DistrictProjectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictProjectsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictProjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
