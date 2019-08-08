import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipetabsPage } from './swipetabs.page';

describe('SwipetabsPage', () => {
  let component: SwipetabsPage;
  let fixture: ComponentFixture<SwipetabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwipetabsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipetabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
