import {Component, OnInit} from '@angular/core';
import {Question} from '../../model/Question';
import {Option} from '../../model/Option';
import {Profile} from '../../../profile/model/Profile';
import {Router} from '@angular/router';
import {QuestionService} from '../../services/question.service';
import {OptionService} from '../../services/option.service';
import {ProfileResponseService} from '../../services/profile-response.service';
import {ProfileService} from '../../../profile/services/profile.service';
import {LearningPathService} from '../../services/learning-path.service';
import {ProfileResponse} from '../../model/ProfileResponse';

@Component({
  selector: 'app-questionnaire-two',
  standalone: false,
  templateUrl: './questionnaire-two.component.html',
  styleUrl: './questionnaire-two.component.css'
})
export class QuestionnaireTwoComponent implements OnInit {
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
        this.questions = data.filter(q => q.quizId === 2); // 👈 solo preguntas del quiz_id: 1
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
            alert('🎉 Has completado el cuestionario');
            this.router.navigate(['/learning-path']);
          }
        },
        error: (error) => console.error(error)
      });
    }
  }
}

