import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ApiConfiguration } from "../openapi/dnd/api-configuration";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: ApiConfiguration, useValue: {rootUrl: "http://localhost:8000"}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
