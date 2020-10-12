import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNgoPage } from './add-ngo.page';

describe('AddNgoPage', () => {
  let component: AddNgoPage;
  let fixture: ComponentFixture<AddNgoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNgoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNgoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
