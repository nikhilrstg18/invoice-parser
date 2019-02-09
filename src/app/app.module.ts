import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserStory1Component } from './components/user-story1/user-story1.component';



@NgModule({
  declarations: [
    AppComponent,
    UserStory1Component,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
