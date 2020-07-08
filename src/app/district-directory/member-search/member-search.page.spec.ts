import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSearchPage } from './member-search.page';

describe('MemberSearchPage', () => {
  let component: MemberSearchPage;
  let fixture: ComponentFixture<MemberSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
