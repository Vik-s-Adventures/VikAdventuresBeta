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
import {OneDialoguesComponent} from './first_world/first-specified-performance/dialogues/one-dialogues/one-dialogues.component';
import {TwoPerformanceConceptsComponent} from './first_world/second-specified-performance/concept/two-performance-concepts/two-performance-concepts.component';
import {D2OnePracticeComponent} from './first_world/second-specified-performance/practice/d2-one-practice/d2-one-practice.component';
import {D2TwoPracticeComponent} from './first_world/second-specified-performance/practice/d2-two-practice/d2-two-practice.component';
import {D2ThreePracticeComponent} from './first_world/second-specified-performance/practice/d2-three-practice/d2-three-practice.component';
import {DataIdentificationComponent} from './first_world/first-specified-performance/practice/practice-end/data-identification/data-identification.component';
import {OperationResponseComponent} from './first_world/first-specified-performance/practice/practice-end/operation-response/operation-response.component';
import {VisualRepresentationComponent} from './first_world/first-specified-performance/practice/practice-end/visual-representation/visual-representation.component';
import {RegisterComponent} from './profile/register/register.component';
import {LearningPathComponent} from './quiz/learning-path/learning-path.component';
import {ProfileUserComponent} from './profile/profile-user/profile-user.component';


const routes: Routes = [
  {path: '', redirectTo:'initial' , pathMatch:'full'},
  {path: 'initial', component: InitialComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'profile-user', component: ProfileUserComponent},
  {path: 'profile', component: RegisterComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'credits', component: CreditsComponent},
  {path: 'welcomeQuestionnaire', component: WelcomeQuestionnaireComponent},
  {path: 'questionnaire', component: QuestionnaireComponent},

  {path: 'one-performance-concept', component: OnePerformanceConceptsComponent},
  {path: 'd1-one-practice', component: D1OnePracticeComponent},
  {path: 'd1-two-practice', component: D1TwoPracticeComponent},
  {path: 'd1-three-practice', component: D1ThreePracticeComponent},
  {path: 'd1-data-identification', component: DataIdentificationComponent},
  {path: 'd1-visual-representation', component: VisualRepresentationComponent},
  {path: 'd1-operation-response', component: OperationResponseComponent},
  {path: 'd1-evaluation', component: OnePerformanceEvaluationComponent},
  {path: 'd1-one-evaluation-question', component: D1OneEvaluationQuestionComponent},
  {path: 'd1-two-evaluation-question', component: D1TwoEvaluationQuestionComponent},
  {path: 'one-dialogues', component: OneDialoguesComponent},

  {path: 'learning-path', component: LearningPathComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
