import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthService} from './iam/services/auth.service';
import {UserService} from './iam/services/user.service';
import { RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {provideHttpClient} from '@angular/common/http';
import { InitialComponent } from './public/initial/initial.component';
import { SignInComponent } from './iam/sign-in/sign-in.component';
import { SignUpComponent } from './iam/sign-up/sign-up.component';
import {FormsModule} from '@angular/forms';
import { MenuComponent } from './public/menu/menu.component';
import { WelcomeQuestionnaireComponent } from './public/welcome-questionnaire/welcome-questionnaire.component';
import { MapsComponent } from './public/maps/maps.component';
import { CreditsComponent } from './public/credits/credits.component';
import {MatButton} from '@angular/material/button';
import { HeaderComponent } from './public/header/header.component';
import { RankingComponent } from './public/ranking/ranking.component';
import {QuestionnaireComponent} from './quiz/questionnaire/questionnaire.component';
import {RegisterComponent} from './profile/register/register.component';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';



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
    RegisterComponent
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

  ],
  providers: [
    AuthService,
    UserService,
    provideHttpClient(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
