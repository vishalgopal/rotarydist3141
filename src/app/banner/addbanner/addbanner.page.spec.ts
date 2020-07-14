import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbannerPage } from './addbanner.page';

describe('AddbannerPage', () => {
  let component: AddbannerPage;
  let fixture: ComponentFixture<AddbannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbannerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
