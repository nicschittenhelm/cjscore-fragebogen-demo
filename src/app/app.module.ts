import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TwoColumnLayoutComponent } from './components/two-column-layout/two-column-layout.component';
import { IsInViewportDirective } from './is-in-viewport.directive';
import { QuestionTypeOneComponent } from './question-type-one/question-type-one.component';
import { QuestionTypeTwoComponent } from './question-type-two/question-type-two.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    TwoColumnLayoutComponent,
    IsInViewportDirective,
    QuestionTypeOneComponent,
    QuestionTypeTwoComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
