import { TestBed } from "@angular/core/testing";
import { LoginComponent } from "app/login/login.component";
import { Routing } from "app/app.routing";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";
import { PlanetSearchComponent } from "app/planet-search/planet-search.component";
import { HeaderComponent } from "app/header/header.component";
import { PlanetHighlightDirective } from "app/planet-search/planets.directive";
import { UserService } from "app/shared/user.service";
import { LoggedInGuard } from "app/shared/logged-in-guard.service";
import { APP_BASE_HREF } from "@angular/common";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { async } from "@angular/core/testing";

const router = {
    navigate: jasmine.createSpy('navigate')
}
describe('Component: Login', () => {

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
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: router, useValue: router }
            ]
        });
    })

    it('should create the app', () => {
        let fixture = TestBed.createComponent(LoginComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should throw error if form is invalid', () => {
        let fixture = TestBed.createComponent(LoginComponent);
        let component = fixture.debugElement.componentInstance;

        let username = component.loginUserForm.controls['username'];
        let password = component.loginUserForm.controls['password'];

        username.setValue("");
        password.setValue("");
        expect(component.loginUserForm.valid).toBeFalsy();
    });

    it('should submit user credentials', () => {
        let fixture = TestBed.createComponent(LoginComponent);
        let component = fixture.debugElement.componentInstance;
        let userService = fixture.debugElement.injector.get(UserService);

        let spy = spyOn(userService, 'signInUser')
            .and.returnValue(Observable.of('data'));
        let username = component.loginUserForm.controls['username'];
        let password = component.loginUserForm.controls['password'];

        username.setValue("Luke Skywalker");
        password.setValue("19BBY");
        spyOn(fixture.componentInstance, 'Submit');
        expect(component.loginUserForm.valid).toBeTruthy();

        let loginBtn: DebugElement = fixture.debugElement.query(By.css('.btn-block'));

        loginBtn.nativeElement.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.Submit).toHaveBeenCalled();
    });

    it('should call navigate method of router on successful login', async(() => {
        let fixture = TestBed.createComponent(LoginComponent);
        let component = fixture.debugElement.componentInstance;
        let userService = fixture.debugElement.injector.get(UserService);

        let spy = spyOn(userService, 'signInUser')
            .and.returnValue(Observable.of(true));
        let username = component.loginUserForm.controls['username'];
        let password = component.loginUserForm.controls['password'];

        username.setValue("Luke Skywalker");
        password.setValue("19BBY");
        spyOn(fixture.componentInstance, 'Submit');
        expect(component.loginUserForm.valid).toBeTruthy();

        let loginBtn: DebugElement = fixture.debugElement.query(By.css('.btn-block'));

        loginBtn.nativeElement.click();
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(fixture.componentInstance.Submit).toHaveBeenCalled();
        });

    }));
});