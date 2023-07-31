import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';
import { ModalComponent } from '../modal/modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  path: any;
  isLogged: boolean = false;
  faUser = faUser;
  faBagShopping = faBagShopping;
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(
    private router: Router,
    private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLogged = this.authService.isAuthenticated();
      }
    });
  }

  handleUserIconClick() {
    if (this.isLogged) {
      this.router.navigate(['/user-space']);
    } else {
      this.openModal();
    }
  }

  openModal(): void {
    const modalFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const modalComponentRef = modalFactory.create(this.viewContainerRef.injector);
    this.viewContainerRef.insert(modalComponentRef.hostView);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/dashboard']);
    window.scrollTo(0, 0);
  }

  goToPage(page: string) {
    this.router.navigateByUrl(page);
  }

}
