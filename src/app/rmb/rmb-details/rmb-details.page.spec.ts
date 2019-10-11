import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmbDetailsPage } from './rmb-details.page';

describe('RmbDetailsPage', () => {
  let component: RmbDetailsPage;
  let fixture: ComponentFixture<RmbDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmbDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmbDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
