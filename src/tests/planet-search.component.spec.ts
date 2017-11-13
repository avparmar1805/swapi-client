import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "app/login/login.component";
import { PlanetSearchComponent } from "app/planet-search/planet-search.component";
import { HeaderComponent } from "app/header/header.component";
import { PlanetHighlightDirective } from "app/planet-search/planets.directive";
import { Routing } from "app/app.routing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UserService } from "app/shared/user.service";
import { LoggedInGuard } from "app/shared/logged-in-guard.service";
import { APP_BASE_HREF } from "@angular/common";
import { PlanetSearchService } from "app/planet-search/planet-search.service";
import { Observable } from "rxjs/Observable";

describe('Component: Planet-Search', () => {

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
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
                PlanetSearchService,
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        });
    })

    it('should create app', () => {
        let fixture = TestBed.createComponent(LoginComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should call planet search service', () => {
        let fixture = TestBed.createComponent(LoginComponent);
        let app = fixture.debugElement.componentInstance;
        let planetSearchService = fixture.debugElement.injector.get(PlanetSearchService);
        let spy = spyOn(planetSearchService, 'search')
            .and.returnValue(Observable.of({
                "results": [
                    "Planet 1",
                    "Planet 2"
                ]
            }));
    });
});