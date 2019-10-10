import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClubEventsPage } from './my-club-events.page';

describe('MyClubEventsPage', () => {
  let component: MyClubEventsPage;
  let fixture: ComponentFixture<MyClubEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyClubEventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClubEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
