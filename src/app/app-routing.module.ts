import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
	{ path: '', redirectTo: '/', pathMatch: 'full' },	
    { path: 'patient/:token', component: PatientComponent },    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
