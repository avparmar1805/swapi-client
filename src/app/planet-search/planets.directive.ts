import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[planetHighlight]'
})
export class PlanetHighlightDirective implements OnInit {
    ngOnInit(): void {
        this.el.nativeElement.style.width = (Number(this.planetIndex) * 5) + 20 +"%";
    }

    @Input() planetIndex: string;

    constructor(private el: ElementRef) {
        el.nativeElement.style.height = 20;

    }
}