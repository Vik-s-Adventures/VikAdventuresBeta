import {Component, OnInit} from '@angular/core';
import {Question} from '../model/Question';
import {Option} from '../model/Option';
import {Router} from '@angular/router';
import {Profile} from '../../profile/model/Profile';
import {ProfileResponse} from '../model/ProfileResponse';

import {QuestionService} from '../services/question.service';
import {ProfileResponseService} from '../services/profile-response.service';
import {OptionService} from '../services/option.service';
import {ProfileService} from '../../profile/services/profile.service';
import {LearningPathService} from '../services/learning-path.service';


@Component({
  selector: 'app-questionnaire',
  standalone: false,
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.css'
})
export class QuestionnaireComponent implements OnInit {
  questions: Question[] = [];
  answerOptions: Option[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion!: Question;
  selectedAnswer: Option | null = null;
  currentProfile!: Profile;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private optionService: OptionService,
    private responseProfileService: ProfileResponseService,
    private profileService: ProfileService,
    private learningPathService: LearningPathService,
  ) {
  }

  ngOnInit(): void {
    const profileId = localStorage.getItem('profileId');
    if (profileId) {
      this.loadProfile(Number(profileId));
    } else {
      console.error();
      this.router.navigate(['/profile']); // O redirige al paso anterior
    }
  }

  loadProfile(profileId: number): void {
    this.profileService.getProfileById(profileId).subscribe({
      next: (profile) => {
        this.currentProfile = profile;
        this.loadQuestions();
        this.loadAnswerOptions();
      },
      error: (err) => {
        console.error(err);
        this.router.navigate(['/profile']);
      }
    });
  }


  loadQuestions(): void {
    this.questionService.getQuestions().subscribe({
      next: (data: Question[]) => {
        this.questions = data;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      },
      error: (error) => console.error(error)
    });
  }

  loadAnswerOptions(): void {
    // @ts-ignore
    this.optionService.getAnswerQuestions().subscribe({
      complete(): void {
      },
      next: (data: Option[]) => {
        this.answerOptions = data;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  getOptionsByQuestionId(questionId: number): Option[] {
    return this.answerOptions.filter(option => option.questionId === questionId);
  }
  nextQuestion(): void {
    if (this.selectedAnswer && this.currentProfile?.id) {
      const newProfileResponse: ProfileResponse = {
        id: 0,
        profileId: this.currentProfile.id,
        optionId: this.selectedAnswer.id
      };

      this.responseProfileService.saveResponse(newProfileResponse).subscribe({
        next: () => {
          this.selectedAnswer = null;
          this.currentQuestionIndex++;

          if (this.currentQuestionIndex < this.questions.length) {
            this.currentQuestion = this.questions[this.currentQuestionIndex];
          } else {
            // ✅ Final del cuestionario, obtener token y generar ruta de aprendizaje
            const token = localStorage.getItem('authToken');
            if (!token) {
              alert('❌ No se encontró token de autenticación');
              return;
            }

            const profileId = this.currentProfile.id;
            const quizId = 1; // Si siempre es el mismo quiz

            this.learningPathService.getLearningPath(profileId, quizId, token).subscribe({
              next: (learningPath) => {
                console.log('📘 Ruta de aprendizaje generada:', learningPath);
                this.router.navigate(['/result'], { state: { learningPath } });
              },
              error: (err) => {
                console.error('❌ Error al obtener la ruta de aprendizaje:', err);
                alert('Ocurrió un error al generar tu ruta de aprendizaje.');
              }
            });
          }
        },
        error: (error) => {
          console.error('❌ Error al guardar la respuesta del perfil:', error);
        }
      });
    }
  }


}
