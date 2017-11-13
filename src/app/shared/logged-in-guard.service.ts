import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {

    }

    canActivate() {
        const isUserLoggedIn = this.userService.isUserLoggedIn();
        if (isUserLoggedIn) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}