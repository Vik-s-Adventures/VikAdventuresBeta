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
      question: "Pedro recogió cierta cantidad de cocos. Colocó 1/4 de esa cantidad en un plato y dejó el resto en la canasta. ¿Cuántos cocos dejó Pedro en la canasta?",
      revealed: false,
      route: '/d1-one-evaluation-question'
    },
    {
      image: '../../../../../assets/images/sandia.png',  // Ruta de la imagen
      question: "Roberto recogió cierta cantidad de naranjas. Colocó 1/5 de esa cantidad en un plato y dejó el resto en la canasta. ¿Cuántas naranjas dejó Roberto en la canasta?",
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
