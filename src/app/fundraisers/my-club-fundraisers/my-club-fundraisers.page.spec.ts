import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClubFundraisersPage } from './my-club-fundraisers.page';

describe('MyClubFundraisersPage', () => {
  let component: MyClubFundraisersPage;
  let fixture: ComponentFixture<MyClubFundraisersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyClubFundraisersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClubFundraisersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
