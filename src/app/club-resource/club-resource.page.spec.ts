import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubResourcePage } from './club-resource.page';

describe('ClubResourcePage', () => {
  let component: ClubResourcePage;
  let fixture: ComponentFixture<ClubResourcePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubResourcePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubResourcePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
