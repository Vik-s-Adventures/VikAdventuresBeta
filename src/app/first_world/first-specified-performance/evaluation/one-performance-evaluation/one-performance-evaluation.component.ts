import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-one-performance-evaluation',
  standalone: false,
  templateUrl: './one-performance-evaluation.component.html',
  styleUrl: './one-performance-evaluation.component.css'
})
export class OnePerformanceEvaluationComponent {
  currentCardIndex = -1; // Al principio, ninguna carta está seleccionada
  cards = [
    {
      image: '../../../../../assets/images/perab2.png',  // Ruta de la imagen
      question: "Se tiene un listón de madera de 3/10 m. ¿Cuántos metros más de madera debo adquirir para completar 17/20 m?",
      revealed: false,
      route: '/d1-one-evaluation-question'
    },
    {
      image: '../../../../../assets/images/sandia.png',  // Ruta de la imagen
      question: "Una piscina inflable de 5200 L de capacidad está llena hasta sus 3/8. ¿Cuántos litros de agua hay que agregar para llenar la piscina?",
      revealed: false,
      route: '/d1-two-evaluation-question'
    }
  ];

  constructor(private router: Router) {
  }

  revealCard(index: number) {
    if (this.currentCardIndex === -1) {
      this.currentCardIndex = index;
      this.cards[index].revealed = true;
    }
  }

  goToQuestion(route: string) {
    this.router.navigate([route]);
  }
}
