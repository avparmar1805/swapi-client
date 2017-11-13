/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';
import { Routing } from "app/app.routing";
import { LoginComponent } from "app/login/login.component";
import { PlanetSearchComponent } from "app/planet-search/planet-search.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HeaderComponent } from "app/header/header.component";
import { PlanetHighlightDirective } from "app/planet-search/planets.directive";
import { UserService } from "app/shared/user.service";
import { LoggedInGuard } from "app/shared/logged-in-guard.service";
import { APP_BASE_HREF } from "@angular/common";

describe('App Initialization', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                LoginComponent,
                PlanetSearchComponent,
                HeaderComponent,
                PlanetHighlightDirective
            ],
            imports: [
                Routing,
                FormsModule,
                ReactiveFormsModule,
                HttpModule
            ],
            providers: [
                UserService,
                LoggedInGuard,
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        });
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should render router-outlet tag', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        let compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('router-outlet')).toBeTruthy();
    }));
});