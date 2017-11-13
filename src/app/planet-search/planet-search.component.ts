import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { PlanetSearchService } from "app/planet-search/planet-search.service";

@Component({
    selector: 'planet-search',
    templateUrl: './planet-search.component.html',
    styleUrls: ['./planet-search.component.css'],
    providers: [PlanetSearchService]
})
export class PlanetSearchComponent implements OnInit {

    planetSearchResults: Object;
    searchTerm$ = new Subject<string>();

    constructor(private planetSearchService: PlanetSearchService) {

    }

    ngOnInit() {
        this.planetSearchService.search(this.searchTerm$)
            .subscribe(data => {
                if (data !== null && data.results.length > 0) {
                    this.planetSearchResults = data.results.sort(this.sortPlanets);
                } else {
                    this.planetSearchResults = [];
                }
            });
    }

    private sortPlanets(prev, curr) {
        const prevPop = Number(prev.population);
        const currPop = Number(curr.population);

        return prevPop - currPop;
    }
}