import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselTendenzaComponent } from './carousel-tendenza.component';

describe('CarouselTendenzaComponent', () => {
  let component: CarouselTendenzaComponent;
  let fixture: ComponentFixture<CarouselTendenzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselTendenzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselTendenzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
