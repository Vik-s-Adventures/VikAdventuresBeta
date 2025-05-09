import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {QuizResultService} from '../../quiz/services/quiz-result.service';
import {MatDialog} from '@angular/material/dialog';
import {CompletedQuizDialogComponent} from '../completed-quiz-dialog/completed-quiz-dialog.component';

@Component({
  selector: 'app-maps',
  standalone: false,
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent {
  images = [
    'mercado.png',
    'src/assets/images/laboratorio.png',
    'src/assets/images/fantasia.png',
    'src/assets/images/espacial.png'
  ];
  profileId: number = 0;

  constructor(
    private router: Router,
    private resultService: QuizResultService,
    private dialog: MatDialog
  ) {
    this.profileId = Number(localStorage.getItem('profileId'));
  }

  onMapClick(quizId: number, route: string): void {
    console.log('[🧭] Verificando si el usuario ya tiene resultado del quiz...', {
      profileId: this.profileId,
      quizId
    });

    this.resultService.getResultByProfileAndQuiz(this.profileId, quizId).subscribe({
      next: (res) => {
        console.log('[✅] Resultado encontrado:', res);
        if (res && res.score > 0) {
          // Ya completó el quiz → mostrar diálogo personalizado
          this.dialog.open(CompletedQuizDialogComponent, {
            data: { characterImg: 'assets/images/vickk.png' },
            width: '600px',
            panelClass: 'custom-dialog-container'
          }).afterClosed().subscribe(() => {
            this.router.navigate(['/learning-path']);
          });
        } else {
          console.log('[ℹ️] Resultado encontrado pero score es 0 → permitir ingreso al cuestionario');
          sessionStorage.setItem('allowQuestionnaireAccess', 'true');
          this.router.navigate([route]);
        }
      },
      error: (err) => {
        if (err.status === 404) {
          console.log('[🆕] No hay resultado previo → permitir ingreso al cuestionario');
          sessionStorage.setItem('allowQuestionnaireAccess', 'true');
          this.router.navigate([route]);
        } else {
          console.error('[❌] Error consultando resultados:', err);
        }
      }
    });
  }
}

