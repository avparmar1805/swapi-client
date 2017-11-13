import { Component } from "@angular/core";
import { UserService } from "app/shared/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    loggedInUser: string;
    constructor(private userService: UserService, private router: Router) {
        this.loggedInUser = this.userService.loggedInUser();
    }

    logout() {
        this.userService.logout();
        this.router.navigate(['/login']);
    }
}