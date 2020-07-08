import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRmbPage } from './update-rmb.page';

describe('UpdateRmbPage', () => {
  let component: UpdateRmbPage;
  let fixture: ComponentFixture<UpdateRmbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateRmbPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRmbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
