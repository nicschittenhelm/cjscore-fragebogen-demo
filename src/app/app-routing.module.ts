import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionTypeOneComponent } from './question-type-one/question-type-one.component';
import { QuestionTypeTwoComponent } from './question-type-two/question-type-two.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
