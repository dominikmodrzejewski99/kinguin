import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {NgxPermissionsModule} from 'ngx-permissions';
import {NgOptimizedImage} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DialogFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogTitle,
    NgxPermissionsModule.forRoot(),
    NgOptimizedImage,

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
