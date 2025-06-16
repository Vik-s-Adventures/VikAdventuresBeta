import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatchingItemService} from '../services/matching-item.service';
import {PlayerMatchingPairService} from '../services/player-matching-pair.service';
import {PlayerMatchingPairRequest} from '../model/PlayerMatchingPairRequest';
import {PlayerMatchingPair} from '../model/PlayerMatchingPair';

interface Card {
  id: number;
  img: string;
  matchingPairId: number;
  isDistractor: boolean;
  revealed: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-d1-two-practice',
  standalone: false,
  templateUrl: './d1-two-practice.component.html',
  styleUrl: './d1-two-practice.component.css'
})
export class D1TwoPracticeComponent implements OnInit {
  levelId!: number;
  profileId!: number;
  matchingDescription = '';
  cards: Card[] = [];
  selectedCards: Card[] = [];
  successMessage = '';
  isCompleted = false;
  matchedPairs: PlayerMatchingPair[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private matchingItemService: MatchingItemService,
    private playerMatchingPairService: PlayerMatchingPairService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.levelId = +params['levelId'];
      console.log('📘 levelId recibido:', this.levelId);

      const storedProfileId = localStorage.getItem('profileId');
      if (!storedProfileId) {
        console.error('❌ No se encontró el profileId en localStorage.');
        this.router.navigate(['/login']);
        return;
      }
      this.profileId = +storedProfileId;
      console.log('🪪 profileId obtenido:', this.profileId);

      this.matchingItemService.getByLevelId(this.levelId).subscribe({
        next: result => {
          console.log('📥 Datos recibidos del servicio matchingItemService:', result);
          this.matchingDescription = result.description;
          this.cards = this.shuffle(result.items.map((item: any) => ({
            id: item.id,
            img: item.imageUrl,
            matchingPairId: item.matchingPairId,
            isDistractor: item.isDistractor,
            revealed: false,
            matched: false
          })));
          console.log('🃏 Cartas generadas:', this.cards);
        },
        error: err => console.error('❌ Error al cargar matching items:', err)
      });
    });
  }

  revealCard(card: Card): void {
    if (card.revealed || card.matched || this.selectedCards.length === 2) return;
    card.revealed = true;
    this.selectedCards.push(card);
    console.log('🃁 Carta seleccionada:', card);
    if (this.selectedCards.length === 2) this.checkForMatch();
  }

  checkForMatch(): void {
    const [c1, c2] = this.selectedCards;
    console.log('🔎 Verificando emparejamiento entre:', c1, c2);
    if (
      c1.matchingPairId === c2.matchingPairId &&
      !c1.isDistractor && !c2.isDistractor &&
      c1.id !== c2.id
    ) {
      console.log('✅ Par correcto encontrado');
      c1.matched = true;
      c2.matched = true;
      this.matchedPairs.push({ matchingItemAId: c1.id, matchingItemBId: c2.id });
    } else {
      console.log('❌ No es un par válido');
      setTimeout(() => {
        c1.revealed = false;
        c2.revealed = false;
      }, 1000);
    }
    this.selectedCards = [];
    this.checkWinCondition();
  }

  checkWinCondition(): void {
    const allMatched = this.cards.every(c => c.matched || c.isDistractor);
    console.log('🔍 Verificación de victoria:', allMatched);
    if (allMatched) {
      this.successMessage = '¡Lo lograste! Continuemos.';
      this.isCompleted = true;

      const request: PlayerMatchingPairRequest = {
        playerId: this.profileId,
        pairs: this.matchedPairs
      };
      console.log('📤 Enviando request al backend:', request);

      this.playerMatchingPairService.save(request).subscribe({
        next: () => console.log('✅ Matching pairs guardados con éxito.'),
        error: err => console.error('❌ Error al guardar matching pairs:', err)
      });
    }
  }

  goToNext(): void {
    this.router.navigate(['/d1-three-practice', this.levelId]);
  }

  shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
