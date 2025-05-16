import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-d2-one-evaluation-question',
  standalone: false,
  templateUrl: './d2-one-evaluation-question.component.html',
  styleUrl: './d2-one-evaluation-question.component.css'
})
export class D2OneEvaluationQuestionComponent {
  constructor(private router: Router) {}


  selectedOption: number | null = null;
  isOptionSelected = false;
  isAnswerCorrect: boolean | null = null;

  correctAnswer = 600; // ✅ Respuesta correcta

  selectOption(option: number): void {
    this.selectedOption = option;
    this.isOptionSelected = true;
    this.isAnswerCorrect = null; // Reinicia feedback al cambiar selección
  }
  submitAnswer(): void {
    if (this.selectedOption === this.correctAnswer) {
      this.isAnswerCorrect = true;

      // Espera 1 segundo para mostrar feedback y luego redirige
      setTimeout(() => {
        this.router.navigate(['/one-dialogues']);
      }, 1000);
    } else {
      this.isAnswerCorrect = false;
    }
  }
}
