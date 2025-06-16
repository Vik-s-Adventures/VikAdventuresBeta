import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ObstacleOption} from '../../models/ObstacleOptions';
import {ObstacleService} from '../../services/obstacle.service';
import {ObstacleOptionService} from '../../services/obstacle-option.service';
import {PlayerFinalBattleService} from '../../services/player-final-battle.service';
import {PlayerFinalBattleRequest} from '../../models/PlayerFinalBattleRequest';

@Component({
  selector: 'app-d1-one-evaluation-question',
  standalone: false,
  templateUrl: './d1-one-evaluation-question.component.html',
  styleUrl: './d1-one-evaluation-question.component.css'
})
export class D1OneEvaluationQuestionComponent implements OnInit {
  obstacleId!: number;
  playerId!: number;
  question = '';
  imageUrl = '';
  options: ObstacleOption[] = [];

  selectedOptionId: number | null = null;
  isOptionSelected = false;
  isAnswerCorrect: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private obstacleService: ObstacleService,
    private obstacleOptionService: ObstacleOptionService,
    private playerFinalBattleService: PlayerFinalBattleService
  ) {}

  ngOnInit(): void {
    this.obstacleId = +this.route.snapshot.params['obstacleId'];

    const storedProfileId = localStorage.getItem('profileId');
    if (!storedProfileId) {
      console.error('❌ No se encontró el profileId en localStorage');
      this.router.navigate(['/login']);
      return;
    }
    this.playerId = +storedProfileId;

    this.obstacleService.getById(this.obstacleId).subscribe({
      next: obstacle => {
        this.question = obstacle.description;
        this.imageUrl = obstacle.imageUrl;
        console.log('📘 Pregunta cargada:', this.question);
        console.log('🖼️ Imagen cargada:', this.imageUrl);
      },
      error: err => console.error('❌ Error al cargar obstáculo:', err)
    });

    this.obstacleOptionService.getByObstacleId(this.obstacleId).subscribe({
      next: options => {
        this.options = options;
        console.log('📋 Opciones cargadas:', this.options);
      },
      error: err => console.error('❌ Error al cargar opciones:', err)
    });
  }

  selectOption(optionId: number): void {
    this.selectedOptionId = optionId;
    this.isOptionSelected = true;
    this.isAnswerCorrect = null;
  }

  submitAnswer(): void {
    const selectedOption = this.options.find(opt => opt.id === this.selectedOptionId);
    if (!selectedOption) return;

    const request: PlayerFinalBattleRequest = {
      playerId: this.playerId,
      obstacleOptionId: selectedOption.id
    };

    if (this.isAnswerCorrect === null) {
      console.log('📤 Enviando respuesta inicial:', request);
      this.playerFinalBattleService.save(request).subscribe({
        next: () => console.log('✅ Respuesta registrada exitosamente'),
        error: err => console.error('❌ Error al guardar respuesta:', err)
      });
    } else {
      console.log('📤 Actualizando respuesta con:', request);
      this.playerFinalBattleService.update({
        playerId: this.playerId,
        obstacleId: this.obstacleId,
        newObstacleOptionId: selectedOption.id
      }).subscribe({
        next: () => console.log('🔁 Respuesta actualizada exitosamente'),
        error: err => console.error('❌ Error al actualizar respuesta:', err)
      });
    }

    if (selectedOption.isCorrect) {
      this.isAnswerCorrect = true;
      setTimeout(() => {
        this.router.navigate(['/one-dialogues']);
      }, 1000);
    } else {
      this.isAnswerCorrect = false;
    }
  }
}

