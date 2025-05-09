import {Component, OnInit} from '@angular/core';
import {QuizResultService} from '../../../quiz/services/quiz-result.service';
import {ProfileService} from '../../../profile/services/profile.service';
import {forkJoin} from 'rxjs';
interface StudentScore {
  sex: string;
  fullName: string;
  score: number;
  originalIndex: number; // 🆕 para mantener la posición real
}
@Component({
  selector: 'app-ranking-map2',
  standalone: false,
  templateUrl: './ranking-map2.component.html',
  styleUrl: './ranking-map2.component.css'
})
export class RankingMap2Component implements OnInit {
  studentsWithScores: StudentScore[] = [];
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 5;

  constructor(
    private quizResultService: QuizResultService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {

    const quizIdFilter = 2;

    this.quizResultService.getAllResults().subscribe({
      next: (results) => {
        const filteredResults = results
          .filter(result => result.quizId === quizIdFilter)
          .sort((a, b) => b.score - a.score); // ordena antes de aplicar perfiles

        const profileRequests = filteredResults.map(result =>
          this.profileService.getProfileById(result.profileId)
        );

        forkJoin(profileRequests).subscribe({
          next: (profiles) => {
            this.studentsWithScores = filteredResults.map((result, index) => ({
              fullName: profiles[index]?.fullName ?? 'Sin nombre',
              sex: profiles[index]?.sex ?? 'Sin sexo',
              score: result.score,
              originalIndex: index + 1 // 🆕 posición real conservada
            }));
          },
          error: (err) => console.error('❌ Error al cargar perfiles:', err)
        });
      },
      error: (err) => console.error('❌ Error al cargar resultados:', err)
    });
  }

  // 🔍 Filtro por nombre (pero conserva el índice real)
  get filteredStudents(): StudentScore[] {
    const term = this.searchTerm.toLowerCase();
    return this.studentsWithScores.filter(student =>
      student.fullName.toLowerCase().includes(term)
    );
  }

  // 🔁 Paginación
  get pagedStudents(): StudentScore[] {
    const start = this.currentPage * this.pageSize;
    return this.filteredStudents.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 0) this.currentPage--;
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStudents.length / this.pageSize);
  }

  // 🎨 Clases visuales para top 3 (basado en posición real)
  getRankClass(originalIndex: number): string {
    if (originalIndex === 1) return 'first-place';
    if (originalIndex === 2) return 'second-place';
    if (originalIndex === 3) return 'third-place';
    return '';
  }
}
