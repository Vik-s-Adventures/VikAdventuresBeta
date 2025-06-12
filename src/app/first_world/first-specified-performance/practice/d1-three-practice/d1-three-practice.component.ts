import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import confetti from 'canvas-confetti';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LinkingPairService} from '../services/linking-pair.service';

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
    private linkingPairService: LinkingPairService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.levelId = +params['levelId'];

      this.linkingPairService.getByLevelId(this.levelId).subscribe({
        next: result => {
          this.description = result.description;

          // Left (imagen) y Right (respuesta)
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
        },
        error: err => console.error('❌ Error al cargar linking pairs:', err)
      });
    });
  }

  selectLeft(item: MatchItem) {
    this.selectedLeft = item;
    this.tryToPair();
  }

  selectRight(item: MatchItem) {
    this.selectedRight = item;
    this.tryToPair();
  }

  tryToPair() {
    if (this.selectedLeft && this.selectedRight) {
      const alreadyMatched = this.matchedPairs.some(
        pair => pair.left.id === this.selectedLeft!.id || pair.right.id === this.selectedRight!.id
      );

      if (!alreadyMatched) {
        this.matchedPairs.push({ left: this.selectedLeft, right: this.selectedRight });
      }

      this.selectedLeft = null;
      this.selectedRight = null;
      this.canSubmit = this.matchedPairs.length === this.leftItems.length;
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
    const correct = this.matchedPairs.every(
      pair => pair.left.value === pair.right.value
    );

    if (correct) {
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
      this.dialog.open(this.successDialog, { disableClose: true });
    } else {
      this.dialog.open(this.errorDialog);
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
    this.router.navigate([this.redirectUrl, this.levelId]);
  }


  shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
