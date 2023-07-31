import { Component } from '@angular/core';
import { faGem, faLaptop, faGlobe, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero-marketing',
  templateUrl: './hero-marketing.component.html',
  styleUrls: ['./hero-marketing.component.scss']
})
export class HeroMarketingComponent {
  faGem = faGem;
  faLaptop = faLaptop;
  faGlobe = faGlobe;
  faHeart = faHeart
}
