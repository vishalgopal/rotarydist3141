import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNewsletterPage } from './update-newsletter.page';

describe('UpdateNewsletterPage', () => {
  let component: UpdateNewsletterPage;
  let fixture: ComponentFixture<UpdateNewsletterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNewsletterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNewsletterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
