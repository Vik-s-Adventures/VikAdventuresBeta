import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-learning-path',
  standalone: false,
  templateUrl: './learning-path.component.html',
  styleUrl: './learning-path.component.css'
})
export class LearningPathComponent {
  cards: { value: number, id: number, title: string, route: string }[] = [
    { value: 0, id: 1,title:'Nivel 1', route: '/instructionOne' },
    { value: 0, id: 2,title:'Nivel 2', route: '/instructionTwo' },
    { value: 0, id: 3,title:'Nivel 3', route: '/instructionThree' },
    { value: 0, id: 4,title:'Nivel 4', route: '/instructionFour' },
    { value: 1, id: 5,title:'Nivel 5', route: '/instructionFive' },
    { value: 1, id: 6,title:'Nivel 6', route: '/instructionSix' },
    { value: 1, id: 7,title:'Nivel 7', route: '/instructionSeven' },
    { value: 1, id: 8,title:'Nivel 8', route: '/instructionSix' },
    { value: 1, id: 9,title:'Nivel 9', route: '/instructionSix' },
    { value: 1, id: 10,title:'Nivel 10', route: '/instructionSix' }
  ];
  /*
  [
   5,
  1,
  4,
  6,
  8,
  2,
  9,
  10,
  3,
  7
]
   */
  constructor(private router: Router) {
  }


  // Redirigir a la ruta específica cuando se selecciona una tarjeta
  onCardSelect(cardId: number): void {
    const selectedCard = this.cards.find(card => card.id === cardId);
    if (selectedCard) {
      this.router.navigate([selectedCard.route]);
    }
  }
}
