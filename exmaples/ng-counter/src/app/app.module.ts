import { NgModule, OnInit } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { system } from "ractor"

import { AppComponent } from "./app.component";
import { AppStore } from "./app.store"
import { provideStore } from "ractor-angular"

@NgModule({
  imports: [
    BrowserModule,
    provideStore(AppStore)
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
