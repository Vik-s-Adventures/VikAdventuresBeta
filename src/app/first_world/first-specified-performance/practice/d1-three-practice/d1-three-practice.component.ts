import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import confetti from 'canvas-confetti';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LinkingPairService} from '../services/linking-pair.service';
import {PlayerLinkingPairService} from '../services/player-linking-pair.service';
import {PlayerLinkingPairRequest} from '../model/PlayerLinkingPairRequest';

interface MatchItem {
  id: number;
  label?: string;
  image?: string;
  value: string;
}

@Component({
  selector: 'app-d1-three-practice',
  standalone: false,
  templateUrl: './d1-three-practice.component.html',
  styleUrl: './d1-three-practice.component.css'
})
export class D1ThreePracticeComponent implements OnInit{
  levelId!: number;
  profileId!: number;
  description = '';
  leftItems: MatchItem[] = [];
  rightItems: MatchItem[] = [];
  selectedLeft: MatchItem | null = null;
  selectedRight: MatchItem | null = null;
  matchedPairs: { left: MatchItem; right: MatchItem }[] = [];
  canSubmit = false;
  redirectUrl = '/d1-evaluation';

  @ViewChild('errorDialog') errorDialog!: TemplateRef<any>;
  @ViewChild('successDialog') successDialog!: TemplateRef<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private linkingPairService: LinkingPairService,
    private playerLinkingPairService: PlayerLinkingPairService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.levelId = +params['levelId'];
      console.log('🔢 levelId:', this.levelId);

      const storedProfileId = localStorage.getItem('profileId');
      if (!storedProfileId) {
        console.error('❌ No se encontró el profileId en localStorage.');
        this.router.navigate(['/login']);
        return;
      }
      this.profileId = +storedProfileId;
      console.log('🧾 profileId cargado:', this.profileId);

      this.linkingPairService.getByLevelId(this.levelId).subscribe({
        next: result => {
          console.log('📘 Resultado del servicio linkingPairService:', result);
          this.description = result.description;

          const items = result.items;
          this.leftItems = this.shuffle(items.map(p => ({
            id: p.id,
            image: p.imageUrl,
            value: p.answer
          })));

          this.rightItems = this.shuffle(items.map(p => ({
            id: p.id,
            label: p.answer,
            value: p.answer
          })));

          console.log('🧩 LeftItems:', this.leftItems);
          console.log('🧩 RightItems:', this.rightItems);
        },
        error: err => console.error('❌ Error al cargar linking pairs:', err)
      });
    });
  }

  selectLeft(item: MatchItem) {
    console.log('🎯 Left seleccionado:', item);
    this.selectedLeft = item;
    this.tryToPair();
  }

  selectRight(item: MatchItem) {
    console.log('🎯 Right seleccionado:', item);
    this.selectedRight = item;
    this.tryToPair();
  }

  tryToPair() {
    if (this.selectedLeft && this.selectedRight) {
      console.log('🔗 Intentando emparejar:', this.selectedLeft, this.selectedRight);
      const alreadyMatched = this.matchedPairs.some(
        pair => pair.left.id === this.selectedLeft!.id || pair.right.id === this.selectedRight!.id
      );

      if (!alreadyMatched) {
        this.matchedPairs.push({ left: this.selectedLeft, right: this.selectedRight });
        console.log('✅ Emparejamiento registrado:', this.matchedPairs);
      } else {
        console.warn('⚠️ Ya existe emparejamiento con alguno de los ítems seleccionados');
      }

      this.selectedLeft = null;
      this.selectedRight = null;
      this.canSubmit = this.matchedPairs.length === this.leftItems.length;
      console.log('📦 Pairs actuales:', this.matchedPairs);
    }
  }

  getPairClass(item: MatchItem, side: 'left' | 'right'): string {
    const pairIndex = this.matchedPairs.findIndex(pair => pair[side].id === item.id);
    return pairIndex >= 0 ? `pair-color-${pairIndex}` : '';
  }

  isPaired(id: number, side: 'left' | 'right'): boolean {
    return this.matchedPairs.some(pair => pair[side].id === id);
  }

  verifyMatches() {
    console.log('🔍 Verificando respuestas...');
    const correct = this.matchedPairs.every(
      pair => pair.left.value === pair.right.value
    );

    if (correct) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

      const request: PlayerLinkingPairRequest = {
        playerId: this.profileId,
        pairs: this.matchedPairs.map(pair => ({
          linkingPairImageId: pair.left.id,
          linkingPairAnswerId: pair.right.id
        }))
      };

      console.log('📤 Enviando player linking pairs al backend:', request);

      this.playerLinkingPairService.save(request).subscribe({
        next: () => {
          console.log('✅ Emparejamientos guardados exitosamente.');
          this.dialog.open(this.successDialog, { disableClose: true });
        },
        error: err => console.error('❌ Error al guardar emparejamientos:', err)
      });
    } else {
      console.warn('❌ Respuestas incorrectas. Mostrando diálogo de error.');
      this.dialog.open(this.errorDialog);
    }
  }

  resetPairs() {
    console.log('🔄 Reiniciando emparejamientos.');
    this.matchedPairs = [];
    this.selectedLeft = null;
    this.selectedRight = null;
    this.canSubmit = false;
  }

  closeAndNavigate(dialogRef: MatDialogRef<any>) {
    console.log('➡️ Navegando al siguiente componente.');
    dialogRef.close();
    this.router.navigate([this.redirectUrl, this.levelId]);
  }

  shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
