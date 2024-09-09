import { ProductsComponent } from './components/products/products.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { OrderComponent } from './components/order/order.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ProductsOfCategoryComponent } from './components/products-of-category/products-of-category.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forget', component: ForgetPasswordComponent },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'allorders', component: AllordersComponent },
      { path: 'order/:id', component: OrderComponent },
      { path: 'wishlist', component: WishListComponent },
      { path: 'products-of-category', component: ProductsOfCategoryComponent },
    ],
  },
  { path: '**', component: NotfoundComponent },
];

// import { ProductsComponent } from './components/products/products.component';
// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
// import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
// import { NotfoundComponent } from './components/notfound/notfound.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { HomeComponent } from './components/home/home.component';
// import { CartComponent } from './components/cart/cart.component';
// import { BrandsComponent } from './components/brands/brands.component';
// import { CategoriesComponent } from './components/categories/categories.component';

// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full',
//   },
//   {
//     path: '',
//     component: AuthLayoutComponent,
//     children: [
//       { path: 'login', component: LoginComponent },
//       { path: 'register', component: RegisterComponent },
//     ],
//   },
//   {
//     path: '',
//     component: BlankLayoutComponent,
//     children: [
//       { path: 'home', component: HomeComponent },
//       { path: 'cart', component: CartComponent },
//       { path: 'brands', component: BrandsComponent },
//       { path: 'products', component: ProductsComponent },
//       { path: 'categories', component: CategoriesComponent },
//     ],
//   },
//   { path: '**', component: NotfoundComponent },
// ];
