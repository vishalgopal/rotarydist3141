import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRmbPage } from './create-rmb.page';

describe('CreateRmbPage', () => {
  let component: CreateRmbPage;
  let fixture: ComponentFixture<CreateRmbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRmbPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRmbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
