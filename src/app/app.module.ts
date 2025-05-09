import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthService} from './iam/services/auth.service';
import {UserService} from './iam/services/user.service';
import { RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { InitialComponent } from './public/initial/initial.component';
import { SignInComponent } from './iam/sign-in/sign-in.component';
import { SignUpComponent } from './iam/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenuComponent } from './public/menu/menu.component';
import { WelcomeQuestionnaireComponent } from './public/welcome/welcome-questionnaire/welcome-questionnaire.component';
import { MapsComponent } from './public/maps/maps.component';
import { CreditsComponent } from './public/credits/credits.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import { HeaderComponent } from './public/header/header.component';
import { RankingComponent } from './public/ranking/ranking.component';
import {QuestionnaireComponent} from './quiz/quizzes/questionnaire/questionnaire.component';
import {RegisterComponent} from './profile/register/register.component';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import { OnePerformanceConceptsComponent } from './first_world/first-specified-performance/concept/one-performance-concepts/one-performance-concepts.component';
import { OnePerformanceEvaluationComponent } from './first_world/first-specified-performance/evaluation/one-performance-evaluation/one-performance-evaluation.component';
import { OneDialoguesComponent } from './first_world/first-specified-performance/dialogues/one-dialogues/one-dialogues.component';
import { D1OnePracticeComponent } from './first_world/first-specified-performance/practice/d1-one-practice/d1-one-practice.component';
import { D1TwoPracticeComponent } from './first_world/first-specified-performance/practice/d1-two-practice/d1-two-practice.component';
import { D1ThreePracticeComponent } from './first_world/first-specified-performance/practice/d1-three-practice/d1-three-practice.component';
import { D1TwoEvaluationQuestionComponent } from './first_world/first-specified-performance/evaluation/evaluation-questions/d1-two-evaluation-question/d1-two-evaluation-question.component';
import { D1OneEvaluationQuestionComponent } from './first_world/first-specified-performance/evaluation/evaluation-questions/d1-one-evaluation-question/d1-one-evaluation-question.component';
import { TwoPerformanceConceptsComponent } from './first_world/second-specified-performance/concept/two-performance-concepts/two-performance-concepts.component';
import { D2OnePracticeComponent } from './first_world/second-specified-performance/practice/d2-one-practice/d2-one-practice.component';
import { D2TwoPracticeComponent } from './first_world/second-specified-performance/practice/d2-two-practice/d2-two-practice.component';
import { D2ThreePracticeComponent } from './first_world/second-specified-performance/practice/d2-three-practice/d2-three-practice.component';
import { VisualRepresentationComponent } from './first_world/first-specified-performance/practice/practice-end/visual-representation/visual-representation.component';
import { OperationResponseComponent } from './first_world/first-specified-performance/practice/practice-end/operation-response/operation-response.component';
import {CdkDrag, CdkDropList, CdkDropListGroup, DragDropModule} from "@angular/cdk/drag-drop";
import {DataIdentificationComponent} from './first_world/first-specified-performance/practice/practice-end/data-identification/data-identification.component';
import {TokenInterceptor} from './interceptors/token.interceptor';
import { LearningPathComponent } from './quiz/paths/learning-path/learning-path.component';
import { ProfileUserComponent } from './profile/profile-user/profile-user.component';
import {MatIcon} from '@angular/material/icon';
import { AuthCallbackComponent } from './iam/auth-callback/auth-callback.component';
import { ProfileEditDialogComponentComponent } from './profile/profile-edit-dialog-component/profile-edit-dialog-component.component';
import {MatDialogActions, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {
  MatDatepicker,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AlertHeaderComponent } from './quiz/alert-header/alert-header.component';
import { QuestionnaireTwoComponent } from './quiz/quizzes/questionnaire-two/questionnaire-two.component';
import { QuestionnareThreeComponent } from './quiz/quizzes/questionnare-three/questionnare-three.component';
import { QuestionnareFourComponent } from './quiz/quizzes/questionnare-four/questionnare-four.component';
import { WelcomeQuestionnaireTwoComponent } from './public/welcome/welcome-questionnaire-two/welcome-questionnaire-two.component';
import { WelcomeQuestionnaireThreeComponent } from './public/welcome/welcome-questionnaire-three/welcome-questionnaire-three.component';
import { WelcomeQuestionnaireFourComponent } from './public/welcome/welcome.questionnaire-four/welcome.questionnaire-four.component';
import { CompletedQuizDialogComponent } from './quiz/completed-quiz-dialog/completed-quiz-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    InitialComponent,
    SignInComponent,
    SignUpComponent,
    MenuComponent,
    WelcomeQuestionnaireComponent,
    MapsComponent,
    CreditsComponent,
    HeaderComponent,
    RankingComponent,
    QuestionnaireComponent,
    RegisterComponent,
    OnePerformanceConceptsComponent,
    OnePerformanceEvaluationComponent,
    OneDialoguesComponent,
    D1OnePracticeComponent,
    D1TwoPracticeComponent,
    D1ThreePracticeComponent,
    D1TwoEvaluationQuestionComponent,
    D1OneEvaluationQuestionComponent,
    TwoPerformanceConceptsComponent,
    D2OnePracticeComponent,
    D2TwoPracticeComponent,
    D2ThreePracticeComponent,
    DataIdentificationComponent,
    VisualRepresentationComponent,
    OperationResponseComponent,
    LearningPathComponent,
    ProfileUserComponent,
    ProfileEditDialogComponentComponent,
    AlertHeaderComponent,
    QuestionnaireTwoComponent,
    QuestionnareThreeComponent,
    QuestionnareFourComponent,
    WelcomeQuestionnaireTwoComponent,
    WelcomeQuestionnaireThreeComponent,
    WelcomeQuestionnaireFourComponent,
    CompletedQuizDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    MatCardModule,
    FormsModule,
    MatButton,
    MatRadioGroup,
    MatRadioButton,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    DragDropModule,
    MatIcon,
    AuthCallbackComponent,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatDatepickerInput,
    MatDatepicker,
    MatDatepickerToggle,
    MatInput,
    MatDialogActions,
    MatLabel,
    MatIconButton,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,

  ],
  providers: [
    AuthService,
    UserService,
    MatDatepickerModule,
    MatNativeDateModule,
    provideHttpClient(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
