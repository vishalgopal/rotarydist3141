import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewslettersPage } from './newsletters.page';

describe('NewslettersPage', () => {
  let component: NewslettersPage;
  let fixture: ComponentFixture<NewslettersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewslettersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewslettersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
