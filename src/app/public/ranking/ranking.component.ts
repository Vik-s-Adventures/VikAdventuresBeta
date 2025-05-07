import { Component, OnInit } from '@angular/core';
import { QuizResultService} from '../../quiz/services/quiz-result.service';
import { ProfileService } from '../../profile/services/profile.service';
import { forkJoin } from 'rxjs';

interface StudentScore {
  fullName: string;
  score: number;
}

@Component({
  selector: 'app-ranking',
  standalone: false,
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  studentsWithScores: StudentScore[] = [];

  constructor(
    private quizResultService: QuizResultService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('❗ No hay token. No se puede cargar el ranking.');
      return;
    }

    this.quizResultService.getAllResults().subscribe({
      next: (results) => {
        const profileRequests = results.map(result =>
          this.profileService.getProfileById(result.profileId)
        );

        forkJoin(profileRequests).subscribe({
          next: (profiles) => {
            this.studentsWithScores = results.map((result, index) => ({
              fullName: profiles[index]?.fullName ?? 'Sin nombre',
              score: result.score
            })).sort((a, b) => b.score - a.score); // Orden descendente
          },
          error: (err) => {
            console.error('❌ Error al cargar perfiles:', err);
          }
        });
      },
      error: (err) => {
        console.error('❌ Error al cargar resultados:', err);
      }
    });
  }
}
