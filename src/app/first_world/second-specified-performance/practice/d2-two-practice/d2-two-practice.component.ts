import { Component } from '@angular/core';
import {Router} from '@angular/router';
interface Card {
  id: number;
  type: string;
  img: string;
  revealed: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-d2-two-practice',
  standalone: false,
  templateUrl: './d2-two-practice.component.html',
  styleUrl: './d2-two-practice.component.css'
})


export class D2TwoPracticeComponent {
  constructor(private router: Router) {}

// Definir las tarjetas con las imágenes y estados necesarios
  cards: Card[] = [
    { id: 1, type: 'mixta', img: 'assets/images/fraccionmixta.png', revealed: false, matched: false },
    { id: 2, type: 'impropia', img: 'assets/images/fraccionimpropia.png', revealed: false, matched: false },
    { id: 3, type: 'propia', img: 'assets/images/fraccionpropia.png', revealed: false, matched: false },
    { id: 4, type: 'mixta', img: 'assets/images/fraccionmixta.png', revealed: false, matched: false },
    { id: 5, type: 'impropia', img: 'assets/images/fraccionimpropia.png', revealed: false, matched: false },
    { id: 6, type: 'propia', img: 'assets/images/fraccionpropia.png', revealed: false, matched: false },
    { id: 7, type: 'error', img: 'assets/images/x.png', revealed: false, matched: false },
    { id: 8, type: 'error', img: 'assets/images/x.png', revealed: false, matched: false },
    { id: 9, type: 'error', img: 'assets/images/x.png', revealed: false, matched: false }
  ];

  selectedCards: Card[] = [];
  successMessage: string = '';
  isCompleted: boolean = false;

// Método para revelar una tarjeta al hacer clic
  revealCard(card: Card) {
    if (card.revealed || card.matched || this.selectedCards.length === 2) return;

    card.revealed = true;
    this.selectedCards.push(card);

    if (this.selectedCards.length === 2) {
      this.checkForMatch();
    }
  }

// Verificar si las tarjetas seleccionadas coinciden
  checkForMatch() {
    const [card1, card2] = this.selectedCards;
    if (card1.type === card2.type && card1.id !== card2.id) {
      card1.matched = true;
      card2.matched = true;
      this.selectedCards = [];
      this.checkWinCondition();
    } else {
      setTimeout(() => {
        card1.revealed = false;
        card2.revealed = false;
        this.selectedCards = [];
      }, 1000);
    }
  }

// Verificar si el juego se ha completado al encontrar todos los pares
  checkWinCondition() {
    const allMatched = this.cards.every(card => card.matched || card.type === 'error');
    if (allMatched) {
      this.successMessage = '¡Lo lograste! Continuemos.';
      this.isCompleted = true;  // Habilitar botón "Continuemos"
    }
  }

  goToNext() {
    this.router.navigate(['/d1-three-practice']); // Cambia '/menu' a la ruta real de tu menú principal
  }
}
