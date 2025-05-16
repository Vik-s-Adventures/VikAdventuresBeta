import {Component, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import confetti from 'canvas-confetti';
import {MatchItem} from '../../../first-specified-performance/practice/model/MatchItem';

@Component({
  selector: 'app-d2-three-practice',
  standalone: false,
  templateUrl: './d2-three-practice.component.html',
  styleUrl: './d2-three-practice.component.css'
})
export class D2ThreePracticeComponent {
  // Subtítulo y ruta de redirección fija
  redirectUrl: string = '/d2-data-identification';


  // 🔸 Ejemplo visible por ahora, puedes cambiar la ruta de imagen luego
  exampleImage: string = 'assets/images/d1/p3-ejemplo.PNG';

  // 🔸 Datos de prueba para fracciones — luego serán traídos desde un servicio
  leftItems: MatchItem[] = [
    { id: 1, image: 'assets/images/d2/D2-009.PNG', value: 'La parte punteada representa 200 y es igual a 1/3 del total.' },
    { id: 2, image: 'assets/images/d2/D2-010.PNG', value: 'La parte punteada representa 30 y es igual a 1/3 del total.' },
    { id: 3, image: 'assets/images/d2/D2-11.PNG', value: 'La parte punteada representa 70 y es igual a 1/3 del total.' }
  ];

  rightItems: MatchItem[] = [
    { id: 6, label: 'La parte punteada representa 30 y es igual a 1/3 del total.', value: 'La parte punteada representa 30 y es igual a 1/3 del total.' },
    { id: 5, label: 'La parte punteada representa 200 y es igual a 1/3 del total.', value: 'La parte punteada representa 200 y es igual a 1/3 del total.' },
    { id: 4, label: 'La parte punteada representa 70 y es igual a 1/3 del total.', value: 'La parte punteada representa 70 y es igual a 1/3 del total.' },
  ];

  // Selección actual y pares emparejados
  selectedLeft: MatchItem | null = null;
  selectedRight: MatchItem | null = null;
  matchedPairs: { left: MatchItem; right: MatchItem }[] = [];

  canSubmit = false;

  @ViewChild('errorDialog') errorDialog!: TemplateRef<any>;
  @ViewChild('successDialog') successDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private router: Router) {}

  selectLeft(item: MatchItem) {
    this.selectedLeft = item;
    this.tryToPair();
  }

  selectRight(item: MatchItem) {
    this.selectedRight = item;
    this.tryToPair();
  }

  getPairClass(item: MatchItem, side: 'left' | 'right'): string {
    const pairIndex = this.matchedPairs.findIndex(pair => pair[side].id === item.id);
    return pairIndex >= 0 ? `pair-color-${pairIndex}` : '';
  }


  tryToPair() {
    if (this.selectedLeft && this.selectedRight) {
      const alreadyMatched = this.matchedPairs.some(
        pair =>
          pair.left.id === this.selectedLeft!.id ||
          pair.right.id === this.selectedRight!.id
      );
      if (!alreadyMatched) {
        this.matchedPairs.push({
          left: this.selectedLeft,
          right: this.selectedRight
        });
      }
      this.selectedLeft = null;
      this.selectedRight = null;
    }
    this.canSubmit = this.matchedPairs.length === this.leftItems.length;
  }

  isPaired(id: number, side: 'left' | 'right'): boolean {
    return this.matchedPairs.some(pair => pair[side].id === id);
  }

  verifyMatches() {
    const correct = this.matchedPairs.every(
      pair => pair.left.value === pair.right.value
    );

    if (!correct) {
      this.dialog.open(this.errorDialog);
    } else {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      this.dialog.open(this.successDialog, { disableClose: true });
    }
  }

  resetPairs() {
    this.matchedPairs = [];
    this.selectedLeft = null;
    this.selectedRight = null;
    this.canSubmit = false;
  }

  closeAndNavigate(dialogRef: MatDialogRef<any>) {
    dialogRef.close();
    this.router.navigate([this.redirectUrl]);
  }
}
