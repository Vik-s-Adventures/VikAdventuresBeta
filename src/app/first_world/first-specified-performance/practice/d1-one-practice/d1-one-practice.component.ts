import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-d1-one-practice',
  standalone: false,
  templateUrl: './d1-one-practice.component.html',
  styleUrl: './d1-one-practice.component.css'
})

export class D1OnePracticeComponent{
  constructor(private router: Router) {}
  topInput: string='';
  bottomInput: string = '';
  feedbackMessage: string = '';
  isCompleted: boolean = false;

  checkAnswer() {
    if (this.topInput.trim().toLowerCase() === 'numerador' && this.bottomInput.trim().toLowerCase() === 'denominador') {
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
    this.router.navigate(['/d1-two-practice']);
  }
}

