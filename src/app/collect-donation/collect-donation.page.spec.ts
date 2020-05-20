import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectDonationPage } from './collect-donation.page';

describe('CollectDonationPage', () => {
  let component: CollectDonationPage;
  let fixture: ComponentFixture<CollectDonationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectDonationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectDonationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
