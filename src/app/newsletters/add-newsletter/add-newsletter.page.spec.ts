import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsletterPage } from './add-newsletter.page';

describe('AddNewsletterPage', () => {
  let component: AddNewsletterPage;
  let fixture: ComponentFixture<AddNewsletterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewsletterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsletterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
