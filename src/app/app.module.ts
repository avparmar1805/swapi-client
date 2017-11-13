import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routing } from './app.routing';
import { AppComponent } from './app.component';
import { LoginComponent } from "app/login/login.component";
import { PlanetSearchComponent } from "app/planet-search/planet-search.component";
import { LoggedInGuard } from "app/shared/logged-in-guard.service";
import { UserService } from "app/shared/user.service";
import { PlanetHighlightDirective } from "app/planet-search/planets.directive";
import { HeaderComponent } from "app/header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlanetSearchComponent,
    PlanetHighlightDirective,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Routing
  ],
  providers: [
    UserService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
