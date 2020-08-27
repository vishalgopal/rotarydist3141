import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoSupportPage } from './ngo-support.page';

describe('NgoSupportPage', () => {
  let component: NgoSupportPage;
  let fixture: ComponentFixture<NgoSupportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgoSupportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgoSupportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
