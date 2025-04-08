import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-d2-two-practice',
  standalone: false,
  templateUrl: './d2-two-practice.component.html',
  styleUrl: './d2-two-practice.component.css'
})
export class D2TwoPracticeComponent {
  constructor(private router: Router) {}

  // Configuración de fracciones con imágenes y respuestas correctas
  fractions = [
    { id: 1, img: 'assets/images/d1/d1-3.png', answer: '3/8', userAnswer: '' },
    { id: 2, img: 'assets/images/d1/d1-6.png', answer: '6/8', userAnswer: '' },
    { id: 3, img: 'assets/images/d1/d1-4.png', answer: '4/8', userAnswer: '' },
    { id: 4, img: 'assets/images/d1/d1-7.png', answer: '7/8', userAnswer: '' },
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
