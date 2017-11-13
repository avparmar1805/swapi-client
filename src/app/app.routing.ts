import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "app/login/login.component";
import { PlanetSearchComponent } from "app/planet-search/planet-search.component";
import { LoggedInGuard } from "app/shared/logged-in-guard.service";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'planet-search', component: PlanetSearchComponent,
        canActivate: [LoggedInGuard],
    }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);