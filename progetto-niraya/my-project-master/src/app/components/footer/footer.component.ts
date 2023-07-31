import { Component } from '@angular/core';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faGoogle,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faGoogle = faGoogle;
  faLinkedin =faLinkedin
}
