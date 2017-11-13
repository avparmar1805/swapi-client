import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from "app/shared/user.service";
import { User } from "app/shared/user.model";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginUserForm: FormGroup;
    invalidUser: boolean;

    constructor(private userService: UserService, private router: Router, fb: FormBuilder) {
        this.loginUserForm = fb.group({
            'username': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    Submit(form: NgForm) {
        const user = new User(form.value.username, form.value.password);
        this.userService.signInUser(user)
            .subscribe(
            data => {
                if (data) {
                    this.router.navigate(['/planet-search']);
                } else {
                    this.invalidUser = true;
                }
            },
            error => {
                console.log(error);
            }
            );
    }
}