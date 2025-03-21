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
import {QuestionnaireComponent} from './quiz/questionnaire/questionnaire.component';
import {OnePerformanceConceptsComponent} from './first_world/first-specified-performance/concept/one-performance-concepts/one-performance-concepts.component';
import {D1OnePracticeComponent} from './first_world/first-specified-performance/practice/d1-one-practice/d1-one-practice.component';
import {D1TwoPracticeComponent} from './first_world/first-specified-performance/practice/d1-two-practice/d1-two-practice.component';
import {D1ThreePracticeComponent} from './first_world/first-specified-performance/practice/d1-three-practice/d1-three-practice.component';
import {OnePerformanceEvaluationComponent} from './first_world/first-specified-performance/evaluation/one-performance-evaluation/one-performance-evaluation.component';
import {D1OneEvaluationQuestionComponent} from './first_world/first-specified-performance/evaluation/evaluation-questions/d1-one-evaluation-question/d1-one-evaluation-question.component';
import {D1TwoEvaluationQuestionComponent} from './first_world/first-specified-performance/evaluation/evaluation-questions/d1-two-evaluation-question/d1-two-evaluation-question.component';
import {
  OneDialoguesComponent
} from './first_world/first-specified-performance/dialogues/one-dialogues/one-dialogues.component';


const routes: Routes = [
  {path: '', redirectTo:'one-performance-concept', pathMatch:'full'},
  {path: 'initial', component: InitialComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'credits', component: CreditsComponent},
  {path: 'welcomeQuestionnaire', component: WelcomeQuestionnaireComponent},
  {path: 'questionnaire', component: QuestionnaireComponent},

  {path: 'one-performance-concept', component: OnePerformanceConceptsComponent},
  {path: 'd1-one-practice', component: D1OnePracticeComponent},
  {path: 'd1-two-practice', component: D1TwoPracticeComponent},
  {path: 'd1-three-practice', component: D1ThreePracticeComponent},
  {path: 'd1-evaluation', component: OnePerformanceEvaluationComponent},
  {path: 'd1-one-evaluation-question', component: D1OneEvaluationQuestionComponent},
  {path: 'd1-two-evaluation-question', component: D1TwoEvaluationQuestionComponent},
  {path: 'one-dialogues', component: OneDialoguesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
