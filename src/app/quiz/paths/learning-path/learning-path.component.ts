import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../shared/environments/environment.development';


interface Option {
  id: number;
  questionId: number;
  isCorrect: boolean;
}

interface Response {
  optionId: number;
  profileId: number;
}

@Component({
  selector: 'app-learning-path',
  standalone: false,
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.css']
})
export class LearningPathComponent implements OnInit {
  cards: { value: number, id: number, title: string, route: string }[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const profileId = localStorage.getItem('profileId');
    if (!profileId) {
      console.error('❌ No se encontró el profileId en localStorage');
      return;
    }

    console.log('🟢 profileId cargado:', profileId);
    this.initializeCards();
    this.loadUserResponses(+profileId);
  }

  initializeCards(): void {
    const rutas = [
      '/one-performance-concept',
      '/two-performance-concept',
      '/one-performance-concept',
      '/one-performance-concept',
      '/one-performance-concept',
      '/one-performance-concept',
      '/one-performance-concept',
      '/one-performance-concept',
      '/one-performance-concept',
      '/one-performance-concept'
    ];

    this.cards = rutas.map((ruta, i) => ({
      value: -1,
      id: i + 1,
      title: `Nivel ${i + 1}`,
      route: ruta
    }));
    console.log('🟢 Niveles inicializados:', this.cards);
  }

  loadUserResponses(profileId: number): void {
    const quizId = 1;

    this.http.get<Response[]>(`${environment.serverBasePath}/responses/profile/${profileId}/quiz/${quizId}`).subscribe({
      next: responses => {
        console.log('🟢 Respuestas del usuario:', responses);

        this.http.get<Option[]>(`${environment.serverBasePath}/options/quiz/${quizId}`).subscribe({
          next: options => {
            console.log('🟢 Opciones del quiz:', options);

            const questionIdsOrdered = Array.from(new Set(options.map(o => o.questionId)));
            console.log('🧩 Orden de preguntas:', questionIdsOrdered);

            responses.forEach(resp => {
              if (!resp.optionId) {
                console.warn('⚠️ Respuesta sin optionId válido:', resp);
                return;
              }

              const selectedOption = options.find(opt => opt.id === resp.optionId);
              if (!selectedOption) {
                console.warn(`⚠️ No se encontró opción con ID=${resp.optionId}`);
                return;
              }

              const questionId = selectedOption.questionId;
              const correctOption = options.find(opt => opt.questionId === questionId && opt.isCorrect === true);
              const isCorrect = correctOption?.id === selectedOption.id;

              const levelIndex = questionIdsOrdered.indexOf(questionId);
              if (levelIndex !== -1 && levelIndex < this.cards.length) {
                this.cards[levelIndex].value = isCorrect ? 1 : 0;
              }

              console.log(
                `📍 Nivel ${levelIndex + 1} | Pregunta=${questionId} | opción=${selectedOption.id} | correcta=${correctOption?.id} | ✅=${isCorrect}`
              );
            });

            console.log('✅ Resultado final de niveles:', this.cards);
          },
          error: err => {
            console.error('❌ Error al obtener opciones:', err);
          }
        });
      },
      error: err => {
        console.error('❌ Error al obtener respuestas del usuario:', err);
      }
    });
  }

  onCardSelect(cardId: number): void {
    const selectedCard = this.cards.find(card => card.id === cardId);
    if (selectedCard) {
      this.router.navigate([selectedCard.route]);
    }
  }
}
