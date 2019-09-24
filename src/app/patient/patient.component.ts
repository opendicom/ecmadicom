import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';

export interface Study {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

    studies: Study[] = [
        { value: '1.1.1.1.1', viewValue: 'Estudio 1' },
        { value: '1.1.1.1.2', viewValue: 'Estudio 2' },
        { value: '1.1.1.1.3', viewValue: 'Estudio 3' }
    ];
    opened = true;
    @ViewChild('sidenav') sidenav: MatSidenav;

    constructor(private route: ActivatedRoute) { 
        document.getElementById("info").style.display = "none";
    }

    ngOnInit() {
        alert(this.route.snapshot.paramMap.get('token'));
        document.getElementById("loader").style.display = "none";        
        document.getElementById("content").style.display = "block";
        this.sidenav.fixedTopGap = 65;
        if (window.innerWidth < 768) {
            this.opened = false;
        } else {
            this.opened = true;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.sidenav.fixedTopGap = 65;
        if (event.target.innerWidth < 768) {
            this.opened = false;
        } else {
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
