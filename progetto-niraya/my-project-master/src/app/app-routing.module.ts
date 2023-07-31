import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartComponent } from './pages/cart/cart.component';
import { UserSpaceComponent } from './pages/user-space/user-space.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { AuthGuard } from './auth-guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'catalogo', component: CatalogoComponent},
  {path: 'cart', component: CartComponent},
  {path: 'product-details', component: ProductDetailsComponent},
  {path : 'user-space', component: UserSpaceComponent, canActivate: [AuthGuard]},
  {
    path: '**',
    redirectTo:'/not-found'
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
