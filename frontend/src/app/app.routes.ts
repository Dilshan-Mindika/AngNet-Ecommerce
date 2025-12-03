import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { TermsComponent } from './components/pages/terms/terms.component';
import { PrivacyComponent } from './components/pages/privacy/privacy.component';
import { UserDashboardComponent } from './components/dashboards/user-dashboard/user-dashboard.component';
import { SellerDashboardComponent } from './components/dashboards/seller-dashboard/seller-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products', component: ProductListComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    // Dashboards
    {
        path: 'dashboard/user',
        component: UserDashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'Customer' }
    },
    {
        path: 'dashboard/seller',
        component: SellerDashboardComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'Seller' }
    },
    {
        path: 'dashboard/admin',
        component: AdminComponent,
        canActivate: [authGuard, roleGuard],
        data: { role: 'Admin' }
    },
    {
        path: 'admin',
        redirectTo: 'dashboard/admin',
        pathMatch: 'full'
    },

    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: '**', redirectTo: '' }
];
