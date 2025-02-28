import { Component } from '@angular/core';

@Component({
  selector: 'app-ranking',
  standalone: false,
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
  studentsWithScores = [
    { firstName: 'Leydi', lastName: 'Gómez', score: 95 },
    { firstName: 'Carlos', lastName: 'Pérez', score: 88 },
    { firstName: 'Ana', lastName: 'López', score: 92 },
    { firstName: 'Jorge', lastName: 'Hernández', score: 85 },
    { firstName: 'Sofía', lastName: 'Martínez', score: 90 }
  ].sort((a, b) => b.score - a.score); // Ordenar de mayor a menor
}
