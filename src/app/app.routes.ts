import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './auth.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { LoginMecanoComponent } from './pages/login-mecano/login-mecano.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login by default
    { path: 'login', component: LoginComponent }, // Login Page
    { path: 'loginAdmin', component: LoginAdminComponent },
    { path: 'loginMecano', component: LoginMecanoComponent },
    { path: 'register', component: RegisterComponent }, // Register Page
    { path: 'unauthorized', component: UnauthorizedComponent },
    // Protected Routes with Layout
    {
        path: '', component: LayoutComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
    {
        path: 'admin', component: LayoutComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ], canActivate : [authGuard]
    },
];
