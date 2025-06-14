import { Component, OnInit } from '@angular/core';
import { Question } from '../../model/Question';
import { Option } from '../../model/Option';
import { Router } from '@angular/router';
import { Profile } from '../../../profile/model/Profile';
import { ProfileResponse } from '../../model/ProfileResponse';

import { QuestionService } from '../../services/question.service';
import { ProfileResponseService } from '../../services/profile-response.service';
import { OptionService } from '../../services/option.service';
import { ProfileService } from '../../../profile/services/profile.service';
import { LearningPathService } from '../../services/learning-path.service';
import {AudioService} from '../../../shared/services/audio.service';

@Component({
  selector: 'app-questionnaire',
  standalone: false,
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questions: Question[] = [];
  answerOptions: Option[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion!: Question;
  selectedAnswer: Option | null = null;
  currentProfile!: Profile;
  selectedQuizId: number=1;


  constructor(
    private router: Router,
    private questionService: QuestionService,
    private optionService: OptionService,
    private responseProfileService: ProfileResponseService,
    private profileService: ProfileService,
    private learningPathService: LearningPathService,
    private audioService: AudioService // ⬅️ AÑADIDO
  ) {}

  ngOnInit(): void {
    // ✅ Protección adicional: bloquear acceso si no vino desde flujo válido
    const accessAllowed = sessionStorage.getItem('allowQuestionnaireAccess');
    if (accessAllowed !== 'true') {
      console.warn('[GUARD LOCAL] Acceso denegado desde ngOnInit (manual check)');
      this.router.navigate(['/maps']);
      return;
    }

    const profileId = localStorage.getItem('profileId');
    if (profileId) {
      this.loadProfile(Number(profileId));
    } else {
      console.error('[❌] No se encontró profileId, redirigiendo...');
      this.router.navigate(['/profile']);
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
        this.questions = data.filter(q => q.quizId === 1); // 👈 solo preguntas del quiz_id: 1
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
            const profileId = this.currentProfile.id;
            const quizId = this.selectedQuizId;

            if (!quizId) {
              console.error('❌ No se encontró quizId para generar la ruta');
              return;
            }

            console.log('🚀 Generando ruta con:', { profileId, quizId });

            this.learningPathService.generateLearningPath(profileId, quizId).subscribe({
              next: () => {
                console.log('✅ Ruta generada correctamente');
                localStorage.setItem('profileId', profileId.toString());
                this.audioService.stop(); // Detiene la música actual
                this.audioService.play('assets/music/Classical Pop.mp3'); // Reproduce nueva música

                this.router.navigate(['/learning-path']);
              },
              error: (error: any) => {
                console.error('❌ Error al generar la ruta de aprendizaje:', error);
                alert('Hubo un error al generar tu ruta. Inténtalo más tarde.');
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
