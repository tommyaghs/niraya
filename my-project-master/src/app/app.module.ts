import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeroCarouselComponent } from './components/hero-carousel/hero-carousel.component';
import { HeroMarketingComponent } from './components/hero-marketing/hero-marketing.component';
import { CarouselTendenzaComponent } from './components/carousel-tendenza/carousel-tendenza.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorylineComponent } from './components/storyline/storyline.component';
import { GalleryHomeComponent } from './components/gallery-home/gallery-home.component';
import { BlogHomeComponent } from './components/blog-home/blog-home.component';
import { UserSpaceComponent } from './pages/user-space/user-space.component';
import { CartComponent } from './pages/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './components/product/product.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { FilterPipe } from './Shared/filter.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PassRecoveryComponent } from './components/pass-recovery/pass-recovery.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { GalleryComponent } from './pages/gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    FooterComponent,
    HeroCarouselComponent,
    HeroMarketingComponent,
    CarouselTendenzaComponent,
    StorylineComponent,
    GalleryHomeComponent,
    BlogHomeComponent,
    UserSpaceComponent,
    CartComponent,
    CatalogoComponent,
    ProductComponent,
    FilterPipe,
    ModalComponent,
    CartItemComponent,
    LoginComponent,
    SignUpComponent,
    PageNotFoundComponent,
    ProductDetailsComponent,
    CheckoutComponent,
    PassRecoveryComponent,
    GalleryComponent,
  ],
  imports: [
    NgxPayPalModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }


/* SystemJS module definition */
declare var module: NodeModule
interface NodeModule {
  id: string
}
