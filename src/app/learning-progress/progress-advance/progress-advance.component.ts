import {Component, OnInit} from '@angular/core';
import {PlayerProgressService} from '../services/player-progress.service';

@Component({
  selector: 'app-progress-advance',
  standalone: false,
  templateUrl: './progress-advance.component.html',
  styleUrl: './progress-advance.component.css'
})
export class ProgressAdvanceComponent implements OnInit{
  levels: number[] = Array(10).fill(0); // 10 niveles con score inicial en 0
  maxPointsPerLevel: number = 100;
  playerId!: number;

  constructor(private progressService: PlayerProgressService) {}

  ngOnInit(): void {
    const storedProfileId = localStorage.getItem('profileId');
    if (!storedProfileId) {
      console.error('❌ No se encontró profileId en localStorage');
      return;
    }
    this.playerId = +storedProfileId;
    console.log('📌 playerId:', this.playerId);

    for (let i = 1; i <= 10; i++) {
      const levelIndex = i - 1;
      this.progressService.getByPlayerAndLevel(this.playerId, i).subscribe({
        next: (progress) => {
          console.log(`✅ Progreso recibido para nivel ${i}:`, progress);
          if (Array.isArray(progress) && progress.length > 0) {
            this.levels[levelIndex] = progress[0].score;
          } else {
            this.levels[levelIndex] = 0;
          }
        },
        error: (err) => {
          console.warn(`⚠️ No se encontró progreso para nivel ${i}`, err);
          this.levels[levelIndex] = 0;
        }
      });
    }
  }

  getLevelProgress(levelIndex: number): number {
    const score = this.levels[levelIndex - 1];
    return (score / this.maxPointsPerLevel) * 100;
  }

  isLevelUnlocked(levelIndex: number): boolean {
    if (levelIndex === 1) return true;
    return this.levels[levelIndex - 2] >= this.maxPointsPerLevel;
  }

  canUnlockReward(levelIndex: number): boolean {
    return this.levels[levelIndex - 1] >= this.maxPointsPerLevel;
  }
}
