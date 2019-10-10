import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClubProjectsPage } from './my-club-projects.page';

describe('MyClubProjectsPage', () => {
  let component: MyClubProjectsPage;
  let fixture: ComponentFixture<MyClubProjectsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyClubProjectsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClubProjectsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
