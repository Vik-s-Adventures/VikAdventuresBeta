import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InitialComponent} from './public/initial/initial.component';
import {SignInComponent} from './iam/sign-in/sign-in.component';
import {SignUpComponent} from './iam/sign-up/sign-up.component';
import {WelcomeQuestionnaireComponent} from './public/welcome/welcome-questionnaire/welcome-questionnaire.component';
import {CreditsComponent} from './public/credits/credits.component';
import {MenuComponent} from './public/menu/menu.component';
import {MapsComponent} from './public/maps/maps.component';
import {RankingComponent} from './public/results-table/ranking/ranking.component';
import {QuestionnaireComponent} from './quiz/quizzes/questionnaire/questionnaire.component';
import {OnePerformanceConceptsComponent} from './first_world/first-specified-performance/concept/one-performance-concepts/one-performance-concepts.component';
import {D1OnePracticeComponent} from './first_world/first-specified-performance/practice/d1-one-practice/d1-one-practice.component';
import {D1TwoPracticeComponent} from './first_world/first-specified-performance/practice/d1-two-practice/d1-two-practice.component';
import {D1ThreePracticeComponent} from './first_world/first-specified-performance/practice/d1-three-practice/d1-three-practice.component';
import {OnePerformanceEvaluationComponent} from './first_world/first-specified-performance/evaluation/one-performance-evaluation/one-performance-evaluation.component';
import {D1OneEvaluationQuestionComponent} from './first_world/first-specified-performance/evaluation/evaluation-questions/d1-one-evaluation-question/d1-one-evaluation-question.component';
import {D1TwoEvaluationQuestionComponent} from './first_world/first-specified-performance/evaluation/evaluation-questions/d1-two-evaluation-question/d1-two-evaluation-question.component';
import {OneDialoguesComponent} from './first_world/first-specified-performance/dialogues/one-dialogues/one-dialogues.component';
import {DataIdentificationComponent} from './first_world/first-specified-performance/practice/practice-end/data-identification/data-identification.component';
import {OperationResponseComponent} from './first_world/first-specified-performance/practice/practice-end/operation-response/operation-response.component';
import {VisualRepresentationComponent} from './first_world/first-specified-performance/practice/practice-end/visual-representation/visual-representation.component';
import {RegisterComponent} from './profile/register/register.component';
import {LearningPathComponent} from './quiz/paths/learning-path/learning-path.component';
import {ProfileUserComponent} from './profile/profile-user/profile-user.component';
import {AuthCallbackComponent} from './iam/auth-callback/auth-callback.component';
import {QuestionnaireTwoComponent} from './quiz/quizzes/questionnaire-two/questionnaire-two.component';
import {QuestionnareThreeComponent} from './quiz/quizzes/questionnare-three/questionnare-three.component';
import {QuestionnareFourComponent} from './quiz/quizzes/questionnare-four/questionnare-four.component';
import {WelcomeQuestionnaireTwoComponent} from './public/welcome/welcome-questionnaire-two/welcome-questionnaire-two.component';
import {
  WelcomeQuestionnaireThreeComponent
} from './public/welcome/welcome-questionnaire-three/welcome-questionnaire-three.component';
import {
  WelcomeQuestionnaireFourComponent
} from './public/welcome/welcome.questionnaire-four/welcome.questionnaire-four.component';
import {guardsQuestionnaireAccessGuard} from './public/guard-configuration/guards-questionnaire-access.guard';
import {RankingMap2Component} from './public/results-table/ranking-map2/ranking-map2.component';
import {RankingMap3Component} from './public/results-table/ranking-map3/ranking-map3.component';
import {RankingMap4Component} from './public/results-table/ranking-map4/ranking-map4.component';
import {TableSelectionComponent} from './public/results-table/table-selection/table-selection.component';
import {ProgressAdvanceComponent} from './learning-progress/progress-advance/progress-advance.component';
import {PlayComponent} from './public/play/play.component';
import {
  TwoPerformanceConceptsComponent
} from './first_world/second-specified-performance/concept/two-performance-concepts/two-performance-concepts.component';
import {
  D2OnePracticeComponent
} from './first_world/second-specified-performance/practice/d2-one-practice/d2-one-practice.component';


const routes: Routes = [
  {path: '', redirectTo:'play' , pathMatch:'full'},
  {path: 'play', component: PlayComponent},
  {path: 'initial', component: InitialComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'auth-callback', component: AuthCallbackComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'profile-user', component: ProfileUserComponent},
  {path: 'profile', component: RegisterComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'credits', component: CreditsComponent},
  {path: 'progress-advance', component: ProgressAdvanceComponent},

  {path: 'table-selection', component: TableSelectionComponent},
  {path: 'ranking', component: RankingComponent},
  {path: 'ranking-map2', component: RankingMap2Component},
  {path: 'ranking-map3', component: RankingMap3Component},
  {path: 'ranking-map4', component: RankingMap4Component},

  {
    path: 'welcomeQuestionnaire',
    component: WelcomeQuestionnaireComponent,
    canActivate: [guardsQuestionnaireAccessGuard]
  },
  {
    path: 'welcomeQuestionnaire-two',
    component: WelcomeQuestionnaireTwoComponent,
    canActivate: [guardsQuestionnaireAccessGuard]
  },
  {
    path: 'welcomeQuestionnaire-three',
    component: WelcomeQuestionnaireThreeComponent,
    canActivate: [guardsQuestionnaireAccessGuard]
  },
  {
    path: 'welcomeQuestionnaire-four',
    component: WelcomeQuestionnaireFourComponent,
    canActivate: [guardsQuestionnaireAccessGuard]
  },
  {
    path: 'questionnaire',
    component: QuestionnaireComponent,
    canActivate: [guardsQuestionnaireAccessGuard]
  },
  {
    path: 'questionnaire-two',
    component: QuestionnaireTwoComponent,
    canActivate: [guardsQuestionnaireAccessGuard]
  },
  {
    path: 'questionnaire-three',
    component: QuestionnareThreeComponent,
    canActivate: [guardsQuestionnaireAccessGuard]
  },
  {
    path: 'questionnaire-four',
    component: QuestionnareFourComponent,
    canActivate: [guardsQuestionnaireAccessGuard]
  },

  {path: 'one-performance-concept', component: OnePerformanceConceptsComponent},
  {path: 'two-performance-concept', component: TwoPerformanceConceptsComponent},

  {path: 'd1-one-practice', component: D1OnePracticeComponent},
  {path: 'd2-one-practice', component: D2OnePracticeComponent},

  {path: 'd1-two-practice', component: D1TwoPracticeComponent},
  {path: 'd2-two-practice', component: D2TwoPracticeComponent},

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
