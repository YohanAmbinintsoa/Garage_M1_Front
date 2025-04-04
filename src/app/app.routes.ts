import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './auth.guard';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { LoginMecanoComponent } from './pages/login-mecano/login-mecano.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { AdminSettingsComponent } from './pages/admin/admin-settings/admin-settings.component';
import { HomeComponent } from './pages/user/home/home.component';
import { SettingsComponent } from './pages/user/settings/settings.component';
import { MecanoServiceComponent } from './pages/mecano/mecano-service/mecano-service.component';
import { MecanoDetailsServiceComponent } from './pages/mecano/mecano-details-service/mecano-details-service.component';
import { StockActualComponent } from './pages/admin/admin-stock/stock-actual/stock-actual.component';
import { StockMvtComponent } from './pages/admin/admin-stock/stock-mvt/stock-mvt.component';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login by default
    { path: 'login', component: LoginComponent }, // Login Page
    { path: 'loginAdmin', component: LoginAdminComponent },
    { path: 'loginMecano', component: LoginMecanoComponent },
    { path: 'register', component: RegisterComponent }, // Register Page
    { path: 'unauthorized', component: UnauthorizedComponent },

    {
        path: '', component: LayoutComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'settings', component: SettingsComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
    {
        path: 'admin', component: LayoutComponent, children: [
            { path: 'home', component: AdminHomeComponent},
            { path: 'settings', component: AdminSettingsComponent},
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'stock',children:[
                { path: 'actual' , component: StockActualComponent},
                { path: 'mvt' , component: StockMvtComponent}
            ] }
        ], canActivate : [authGuard]
    },
    {
        path: 'mecano', component: LayoutComponent, children: [
            { path: 'home', component: MecanoServiceComponent},
            { path: 'details-service/:id', component: MecanoDetailsServiceComponent},
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
];
