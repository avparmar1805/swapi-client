import { Injectable } from "@angular/core";
import { User } from "app/shared/user.model";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

    constructor(private http: Http) {
    }

    private baseUrl: string = 'https://swapi.co/api/people/';
    private queryUrl: string = '?search=';

    signInUser(user: User) {
        return this.http
            .get(this.baseUrl + this.queryUrl + user.username)
            .map(response => {
                const data = response.json();
                if (data !== null && data.count >= 1) {
                    const loggedInUser = data.results[0];
                    if (user.username === loggedInUser.name && user.password === loggedInUser.birth_year) {
                        localStorage.setItem('isLoggedIn', "true");
                        localStorage.setItem('user', loggedInUser.name);
                        return true;
                    }
                }

            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    isUserLoggedIn() {
        return localStorage.getItem('isLoggedIn') !== null;
    }

    logout(){
        localStorage.clear();
    }

    loggedInUser(){
        return localStorage.getItem('user')
    }
}