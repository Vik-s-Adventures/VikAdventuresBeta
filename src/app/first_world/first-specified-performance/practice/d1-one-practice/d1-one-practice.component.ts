import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Trial} from '../model/Trial';
import {Riddle} from '../model/Riddle';
import {RiddleDetail} from '../model/RiddleDetails';
import {TrialService} from '../services/trial.service';
import {RiddleService} from '../services/riddle.service';
import {RiddleDetailService} from '../services/riddle-detail.service';

@Component({
  selector: 'app-d1-one-practice',
  standalone: false,
  templateUrl: './d1-one-practice.component.html',
  styleUrl: './d1-one-practice.component.css'
})

export class D1OnePracticeComponent implements OnInit {
  levelId!: number;
  trial!: Trial;
  riddle!: Riddle;
  riddleDetails: RiddleDetail[] = [];

  inputs: string[] = [];
  feedbackMessage = '';
  isCompleted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trialService: TrialService,
    private riddleService: RiddleService,
    private riddleDetailService: RiddleDetailService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.levelId = +params['levelId'];
      console.log('🟦 levelId recibido:', this.levelId);

      this.trialService.getByLevelId(this.levelId).subscribe({
        next: trial => {
          if (!trial || !trial.id) {
            console.error('⚠️ Trial no contiene ID:', trial);
            return;
          }

          this.trial = trial;
          console.log('📘 Trial recibido:', this.trial);

          this.riddleService.getByTrialId(this.trial.id).subscribe({
            next: riddle => {
              if (!riddle || !riddle.id) {
                console.error('⚠️ Riddle no contiene ID:', riddle);
                return;
              }

              this.riddle = riddle;
              console.log('📘 Riddle recibido:', this.riddle);

              this.riddleDetailService.getByRiddleId(this.riddle.id).subscribe({
                next: details => {
                  this.riddleDetails = details;
                  this.inputs = new Array(details.length).fill('');
                  console.log('📗 RiddleDetails cargados:', details);
                },
                error: err => console.error('❌ Error al cargar riddleDetails:', err)
              });
            },
            error: err => console.error('❌ Error al cargar riddle:', err)
          });
        },
        error: err => console.error('❌ Error al cargar trial:', err)
      });
    });
  }

  checkAnswer(): void {
    const allCorrect = this.inputs.every((input, i) =>
      input.trim().toLowerCase() === this.riddleDetails[i].answer.trim().toLowerCase()
    );

    if (allCorrect) {
      this.feedbackMessage = '✅ ¡Genial! Respuesta correcta.';
      this.isCompleted = true;
    } else {
      this.feedbackMessage = '❌ Inténtalo de nuevo.';
      this.inputs = this.inputs.map(() => '');
    }
  }

  goToNext(): void {
    this.router.navigate(['/d1-two-practice', this.levelId]);
  }

}

