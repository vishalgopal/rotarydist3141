import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherClubFundraisersPage } from './other-club-fundraisers.page';

describe('OtherClubFundraisersPage', () => {
  let component: OtherClubFundraisersPage;
  let fixture: ComponentFixture<OtherClubFundraisersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherClubFundraisersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherClubFundraisersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
