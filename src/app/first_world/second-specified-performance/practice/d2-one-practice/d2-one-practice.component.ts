import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-d2-one-practice',
  standalone: false,
  templateUrl: './d2-one-practice.component.html',
  styleUrl: './d2-one-practice.component.css'
})
export class D2OnePracticeComponent {
  constructor(private router: Router) {}
  topInput: string='';
  bottomInput: string = '';
  feedbackMessage: string = '';
  isCompleted: boolean = false;

  checkAnswer() {
    if (this.topInput.trim().toLowerCase() === '600' && this.bottomInput.trim().toLowerCase() === '3/4') {
      this.feedbackMessage = '¡Genial! Has completado la dinámica correctamente.';
      this.isCompleted = true;
    } else {
      this.feedbackMessage = 'Inténtalo de nuevo.';
      this.resetInputs();
    }
  }

  // Resetear los campos de entrada si la respuesta es incorrecta
  resetInputs() {
    this.topInput = '';
    this.bottomInput = '';
  }

  goToNext() {
    this.router.navigate(['/d2-two-practice']);
  }
}
