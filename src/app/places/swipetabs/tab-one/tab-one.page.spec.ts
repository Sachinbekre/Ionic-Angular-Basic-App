import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOnePage } from './tab-one.page';

describe('TabOnePage', () => {
  let component: TabOnePage;
  let fixture: ComponentFixture<TabOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabOnePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
