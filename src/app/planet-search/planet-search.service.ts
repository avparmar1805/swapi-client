import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class PlanetSearchService {
  baseUrl: string = 'https://swapi.co/api/planets/';
  queryUrl: string = '?search=';

  constructor(private http: Http) { }

  search(planets: Observable<string>) {
    return planets.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(planet => {
        if (planet.trim() === "") {
          return Observable.of({
            "results": []
          });
        }
        else {
          return this.searchEntries(planet);
        }
      });
  }

  searchEntries(planet) {
    return this.http
      .get(this.baseUrl + this.queryUrl + planet)
      .map(res => res.json());
  }
}