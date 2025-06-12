import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ObstacleOption} from '../../models/ObstacleOptions';
import {ObstacleService} from '../../services/obstacle.service';
import {ObstacleOptionService} from '../../services/obstacle-option.service';

@Component({
  selector: 'app-d1-one-evaluation-question',
  standalone: false,
  templateUrl: './d1-one-evaluation-question.component.html',
  styleUrl: './d1-one-evaluation-question.component.css'
})
export class D1OneEvaluationQuestionComponent implements OnInit {
  obstacleId!: number;
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
    private obstacleOptionService: ObstacleOptionService
  ) {}

  ngOnInit(): void {
    this.obstacleId = +this.route.snapshot.params['obstacleId'];

    this.obstacleService.getById(this.obstacleId).subscribe({
      next: obstacle => {
        // Corrige el mapeo de campos
        this.question = obstacle.imageUrl;     // <-- el texto real
        this.imageUrl = obstacle.description;  // <-- la URL real de la imagen
      },
      error: err => console.error('❌ Error al cargar obstáculo:', err)
    });

    this.obstacleOptionService.getByObstacleId(this.obstacleId).subscribe({
      next: options => {
        this.options = options;
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
    if (selectedOption?.isCorrect) {
      this.isAnswerCorrect = true;
      setTimeout(() => {
        this.router.navigate(['/one-dialogues']);
      }, 1000);
    } else {
      this.isAnswerCorrect = false;
    }
  }
}
