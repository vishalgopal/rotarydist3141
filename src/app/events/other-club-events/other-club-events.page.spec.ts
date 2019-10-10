import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherClubEventsPage } from './other-club-events.page';

describe('OtherClubEventsPage', () => {
  let component: OtherClubEventsPage;
  let fixture: ComponentFixture<OtherClubEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherClubEventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherClubEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
