import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNgoPage } from './update-ngo.page';

describe('UpdateNgoPage', () => {
  let component: UpdateNgoPage;
  let fixture: ComponentFixture<UpdateNgoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNgoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNgoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
