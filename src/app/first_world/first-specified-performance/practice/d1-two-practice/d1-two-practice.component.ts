import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchingItemService} from '../services/matching-item.service';

interface Card {
  id: number;
  type: string;
  img: string;
  revealed: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-d1-two-practice',
  standalone: false,
  templateUrl: './d1-two-practice.component.html',
  styleUrl: './d1-two-practice.component.css'
})
export class D1TwoPracticeComponent implements OnInit{
  levelId!: number;
  matchingDescription = '';
  cards: any[] = [];
  selectedCards: any[] = [];
  successMessage = '';
  isCompleted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matchingItemService: MatchingItemService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.levelId = +params['levelId'];
      console.log('📘 levelId recibido:', this.levelId);

      this.matchingItemService.getByLevelId(this.levelId).subscribe({
        next: result => {
          this.matchingDescription = result.description;
          this.cards = this.shuffle(result.items.map(item => ({
            id: item.id,
            img: item.imageUrl,
            matchingPairId: item.matchingPairId,
            isDistractor: item.isDistractor,
            revealed: false,
            matched: false
          })));
          console.log('🃏 Cartas cargadas:', this.cards);
        },
        error: err => console.error('❌ Error al cargar matching items:', err)
      });
    });
  }

  revealCard(card: any) {
    if (card.revealed || card.matched || this.selectedCards.length === 2) return;
    card.revealed = true;
    this.selectedCards.push(card);
    if (this.selectedCards.length === 2) this.checkForMatch();
  }

  checkForMatch() {
    const [c1, c2] = this.selectedCards;
    if (
      c1.matchingPairId === c2.matchingPairId &&
      !c1.isDistractor && !c2.isDistractor &&
      c1.id !== c2.id
    ) {
      c1.matched = true;
      c2.matched = true;
      this.selectedCards = [];
      this.checkWinCondition();
    } else {
      setTimeout(() => {
        c1.revealed = false;
        c2.revealed = false;
        this.selectedCards = [];
      }, 1000);
    }
  }

  checkWinCondition() {
    const allMatched = this.cards.every(c => c.matched || c.isDistractor);
    if (allMatched) {
      this.successMessage = '¡Lo lograste! Continuemos.';
      this.isCompleted = true;
    }
  }

  goToNext(): void {
    this.router.navigate(['/d1-three-practice', this.levelId]);

  }


  shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}

