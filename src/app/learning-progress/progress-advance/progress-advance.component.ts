import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-advance',
  standalone: false,
  templateUrl: './progress-advance.component.html',
  styleUrl: './progress-advance.component.css'
})
export class ProgressAdvanceComponent {
  levels: number[] = Array(10).fill(30); // Iniciar niveles con 30 puntos por defecto
  maxPointsPerLevel: number = 100;

  increaseProgress(index: number) {
    if (this.levels[index] < this.maxPointsPerLevel) {
      this.levels[index] += 10;
      if (this.levels[index] > this.maxPointsPerLevel) {
        this.levels[index] = this.maxPointsPerLevel;
      }
    }
  }

  resetProgress(index: number) {
    this.levels[index] = 30; // Reinicia al valor por defecto
  }

  getLevelProgress(levelIndex: number): number {
    return (this.levels[levelIndex - 1] / this.maxPointsPerLevel) * 100;
  }

  isLevelUnlocked(levelIndex: number): boolean {
    if (levelIndex === 1) return true;
    return this.levels[levelIndex - 2] >= this.maxPointsPerLevel;
  }

  canUnlockReward(levelIndex: number): boolean {
    return this.levels[levelIndex - 1] >= this.maxPointsPerLevel;
  }
}
