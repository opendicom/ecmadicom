import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ViewerComponent } from './viewer/viewer.component';
import { AppRoutingModule } from './app-routing.module';
import { PatientComponent } from './patient/patient.component';
import { CornerstoneDirective } from './cornerstone.directive';
import { ThumbnailDirective } from './thumbnail.directive';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    PatientComponent,
    CornerstoneDirective,
    ThumbnailDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
