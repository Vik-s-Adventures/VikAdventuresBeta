import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InitialComponent} from './public/initial/initial.component';
import {SignInComponent} from './iam/sign-in/sign-in.component';
import {SignUpComponent} from './iam/sign-up/sign-up.component';
import {WelcomeQuestionnaireComponent} from './public/welcome-questionnaire/welcome-questionnaire.component';
import {CreditsComponent} from './public/credits/credits.component';
import {MenuComponent} from './public/menu/menu.component';
import {MapsComponent} from './public/maps/maps.component';
import {RankingComponent} from './public/ranking/ranking.component';


const routes: Routes = [
  {path: '', redirectTo:'menu', pathMatch:'full'},
  {path: 'initial', component: InitialComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'credits', component: CreditsComponent},
  {path: 'welcomeQuestionnaire', component: WelcomeQuestionnaireComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
