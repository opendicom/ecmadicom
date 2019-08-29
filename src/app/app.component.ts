import { Component, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

export interface Study {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    studies: Study[] = [
        { value: '1.1.1.1.1', viewValue: 'Estudio 1' },
        { value: '1.1.1.1.2', viewValue: 'Estudio 2' },
        { value: '1.1.1.1.3', viewValue: 'Estudio 3' }
    ];
    opened = true;
    @ViewChild('sidenav') sidenav: MatSidenav;

    ngOnInit() {
        console.log(window.innerWidth)
        if (window.innerWidth < 768) {
            this.sidenav.fixedTopGap = 65;
            this.opened = false;
        } else {
            this.sidenav.fixedTopGap = 65;
            this.opened = true;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (event.target.innerWidth < 768) {
            this.sidenav.fixedTopGap = 65;
            this.opened = false;
        } else {
            this.sidenav.fixedTopGap = 65
            this.opened = true;
        }
    }

    isBiggerScreen() {
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (width < 768) {
            return true;
        } else {
            return false;
        }
    }
}
