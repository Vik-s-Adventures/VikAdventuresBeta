import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-d1-two-evaluation-question',
  standalone: false,
  templateUrl: './d1-two-evaluation-question.component.html',
  styleUrl: './d1-two-evaluation-question.component.css'
})
export class D1TwoEvaluationQuestionComponent {
  constructor(private router: Router) {}

  isOptionSelected = false;
  selectedOption: number | null = null;

  selectOption(option: number) {
    this.selectedOption = option;
    this.isOptionSelected = true;
  }

  submitAnswer() {
    console.log("La opción seleccionada es:", this.selectedOption);
    this.router.navigate(['/one-dialogues']);
    // Aquí iría la lógica para continuar con la siguiente pregunta o verificar la respuesta
  }
}
