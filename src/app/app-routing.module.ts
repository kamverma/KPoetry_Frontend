import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddWorkitemComponent } from './components/add-workitem/add-workitem.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { WorkitemsComponent } from './components/workitems/workitems.component';
import { AccessGuardService } from './services/access-guard.service';
import { LpSectionComponent } from './view/lp-section/lp-section.component';

const routes: Routes = [
  {path: "home", component: LpSectionComponent},
  {path: "workitems", component: WorkitemsComponent, data:{requiresLogin: true}, canActivate: [ AccessGuardService ]},
  {path: "add-workitem", component: AddWorkitemComponent},
  {path: "user/login", component: LoginComponent},
  {path: "user/register", component: SignupComponent},
  {path: "", component: LpSectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
