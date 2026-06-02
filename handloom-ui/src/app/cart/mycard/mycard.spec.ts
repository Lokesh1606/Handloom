import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mycard } from './mycard';

describe('Mycard', () => {
  let component: Mycard;
  let fixture: ComponentFixture<Mycard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mycard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mycard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
