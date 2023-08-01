import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroMarketingComponent } from './hero-marketing.component';

describe('HeroMarketingComponent', () => {
  let component: HeroMarketingComponent;
  let fixture: ComponentFixture<HeroMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroMarketingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
