import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Obstacle} from '../models/Obstacle';
import {FinalBattleService} from '../services/final-battle.service';
import {ObstacleService} from '../services/obstacle.service';

@Component({
  selector: 'app-one-performance-evaluation',
  standalone: false,
  templateUrl: './one-performance-evaluation.component.html',
  styleUrl: './one-performance-evaluation.component.css'
})
export class OnePerformanceEvaluationComponent implements OnInit {
  levelId!: number;
  finalBattleDescription: string = '';
  obstacleCards: Obstacle[] = [];
  currentCardIndex: number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private finalBattleService: FinalBattleService,
    private obstacleService: ObstacleService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.levelId = +params['levelId'];

      this.finalBattleService.getByLevelId(this.levelId).subscribe({
        next: finalBattles => {
          const finalBattle = finalBattles[0];
          if (!finalBattle || typeof finalBattle.id === 'undefined') {
            console.error('❌ Error: finalBattle.id está undefined');
            return;
          }

          this.finalBattleDescription = finalBattle.description;

          this.obstacleService.getByFinalBattleId(finalBattle.id).subscribe({
            next: (obstacles: any[]) => {
              // Mapear los campos invertidos del backend
              this.obstacleCards = obstacles.map(o => ({
                id: o.id,
                finalBattleId: o.finalBattleId,
                description: o.description, // ← Aquí va el texto
                imageUrl: o.imageUrl, // ← Aquí va la imagen
                revealed: false
              }));
            },
            error: err => console.error('❌ Error al cargar obstáculos:', err)
          });
        },
        error: err => console.error('❌ Error al cargar final battle:', err)
      });
    });
  }

  revealCard(index: number): void {
    if (this.currentCardIndex === -1) {
      this.currentCardIndex = index;
      this.obstacleCards[index].revealed = true;
    }
  }

  goToQuestion(obstacleId: number): void {
    this.router.navigate(['/d1-one-evaluation-question', obstacleId]);
  }
}
