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

  // Configuración de fracciones con imágenes y respuestas correctas
  fractions = [
    { id: 1, img: 'assets/images/d2/d2-30.PNG', answer: '30%=3/10', userAnswer: '' },
    { id: 2, img: 'assets/images/d2/d2-60.PNG', answer: '60%=6/10', userAnswer: '' },
    { id: 3, img: 'assets/images/d2/d2-40.PNG', answer: '40%=4/10', userAnswer: '' },
    { id: 4, img: 'assets/images/d2/d2-70.PNG', answer: '70%=7/10', userAnswer: '' },
    { id: 5, img: 'assets/images/d2/d2-50.PNG', answer: '50%=5/10', userAnswer: '' },
    { id: 6, img: 'assets/images/d2/d2-20.PNG', answer: '20%=2/10', userAnswer: '' }
  ];

  isCompleted: boolean = false;

  // Método para verificar si todas las respuestas son correctas
  checkAnswers() {
    this.isCompleted = this.fractions.every(
      (fraction) => fraction.userAnswer.trim() === fraction.answer
    );
  }

  goToNext() {
    this.router.navigate(['/d2-two-practice']); // Cambia '/menu' a la ruta real de tu menú principal
  }
}
