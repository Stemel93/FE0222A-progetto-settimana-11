import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer.component';
import { NavbarComponent } from './components/navbar.component';
import { CartComponent } from './pages/cart.component';
import { HomeComponent } from './pages/home.component';
import { ProductsComponent } from './pages/products.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'products/:id',
    component: ProductsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    CartComponent,
    HomeComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
