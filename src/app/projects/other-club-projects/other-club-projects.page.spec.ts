import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherClubProjectsPage } from './other-club-projects.page';

describe('OtherClubProjectsPage', () => {
  let component: OtherClubProjectsPage;
  let fixture: ComponentFixture<OtherClubProjectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherClubProjectsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherClubProjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
