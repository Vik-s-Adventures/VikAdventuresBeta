import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-two-performance-evaluation',
  standalone: false,
  templateUrl: './two-performance-evaluation.component.html',
  styleUrl: './two-performance-evaluation.component.css'
})
export class TwoPerformanceEvaluationComponent {
  currentCardIndex = -1; // Al principio, ninguna carta está seleccionada
  cards = [
    {
      image: '../../../../../assets/images/perab2.png',  // Ruta de la imagen
      question: "En el estadio de la ciudad de Tarata, se jugó la final de un campeonato de fútbol. En total, 300 personas asistieron al estadio.  Esta cantidad de personas representa a los 2/4 de su capacidad. ¿Cuál es la capacidad que tiene este estadio?",
      revealed: false,
      route: '/d2-one-evaluation-question'
    },
    {
      image: '../../../../../assets/images/sandia.png',  // Ruta de la imagen
      question: "En el estadio de la ciudad de Lima, se jugó la final de un campeonato de fútbol. En total, 100 personas asistieron al estadio.  Esta cantidad de personas representa a los 2/4 de su capacidad. ¿Cuál es la capacidad que tiene este estadio?",
      revealed: false,
      route: '/d2-two-evaluation-question'
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
