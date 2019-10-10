import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundraisersPage } from './fundraisers.page';

describe('FundraisersPage', () => {
  let component: FundraisersPage;
  let fixture: ComponentFixture<FundraisersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundraisersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundraisersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
