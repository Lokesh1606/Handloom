import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Handloom } from './handloom';

describe('Handloom', () => {
  let component: Handloom;
  let fixture: ComponentFixture<Handloom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Handloom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Handloom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
