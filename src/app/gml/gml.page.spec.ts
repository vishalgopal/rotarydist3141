import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmlPage } from './gml.page';

describe('GmlPage', () => {
  let component: GmlPage;
  let fixture: ComponentFixture<GmlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
