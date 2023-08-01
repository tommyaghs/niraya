import { Component } from '@angular/core';
import { faArrowRight, faExpandArrowsAlt, faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-carousel-tendenza',
  templateUrl: './carousel-tendenza.component.html',
  styleUrls: ['./carousel-tendenza.component.scss']
})
export class CarouselTendenzaComponent {
  faExpandArrowsAlt = faExpandArrowsAlt;
  faBagShopping = faBagShopping;
  faHeart = faHeart;
  faArrowRight = faArrowRight
  ProductImage1 = 'assets/images/whiteshirt.png';
  ProductImageOnHover1 = 'assets/images/whiteshirtHover.png';
  ImageUrl: string;

  constructor() {
    this.ImageUrl = this.ProductImage1;
  }
}
