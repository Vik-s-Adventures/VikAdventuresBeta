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

interface Level {
  id: number;
  name: string;
  worldId: number;
  performance: string;
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
    console.log('🟢 ngOnInit - profileId en localStorage:', profileId);

    if (!profileId) {
      console.error('❌ profileId no encontrado');
      return;
    }

    // Llama al flujo principal de carga de la ruta de aprendizaje
    this.loadLearningPath();
  }


  loadLearningPath(): void {
    const profileId = localStorage.getItem('profileId');
    console.log('🟢 ngOnInit - profileId en localStorage:', profileId);

    if (!profileId) {
      console.warn('⚠️ No se encontró profileId en localStorage');
      return;
    }

    console.log('📥 Iniciando carga de ruta IA para profileId:', profileId);

    this.http.get<any[]>(`${environment.serverBasePath}/learning-path/profile/${profileId}`).subscribe({
      next: (res) => {
        console.log('📦 Respuesta recibida del backend:', res);

        const learningPathRaw = res[0]?.learningPath;
        console.log('🧪 learningPath (raw desde res[0]):', learningPathRaw);

        if (!learningPathRaw) {
          console.warn('⚠️ learningPath está vacío, deteniendo flujo');
          return;
        }

        const learningPath: number[] = Array.isArray(learningPathRaw)
          ? learningPathRaw
          : JSON.parse(learningPathRaw);

        console.log('✅ learningPath convertido a arreglo:', learningPath);

        // Llamamos a los niveles del mundo 1
        this.http.get<any[]>(`${environment.serverBasePath}/levels/world/1`).subscribe({
          next: (levels) => {
            console.log('📘 Niveles del mundo 1:', levels);

            this.cards = learningPath.map((levelId: number, index: number) => ({
              id: levelId,
              value: -1,
              title: `Nivel ${index + 1}`,
              route: '/one-performance-concept'
            }));

            console.log('🧩 Cards construidos:', this.cards);
          },
          error: (err) => {
            console.error('❌ Error al obtener niveles del mundo 1:', err);
          }
        });
      },
      error: (err) => {
        console.error('❌ Error al obtener ruta de aprendizaje:', err);
      }
    });
  }



  loadUserResponses(profileId: number, quizId: number): void {
    this.http.get<Response[]>(`${environment.serverBasePath}/responses/profile/${profileId}/quiz/${quizId}`).subscribe({
      next: responses => {
        this.http.get<Option[]>(`${environment.serverBasePath}/options/quiz/${quizId}`).subscribe({
          next: options => {
            const questionIdsOrdered = Array.from(new Set(options.map(o => o.questionId)));

            responses.forEach(resp => {
              const selectedOption = options.find(opt => opt.id === resp.optionId);
              const correctOption = selectedOption
                ? options.find(opt => opt.questionId === selectedOption.questionId && opt.isCorrect)
                : null;

              const isCorrect = selectedOption && correctOption && selectedOption.id === correctOption.id;
              const levelIndex = selectedOption
                ? questionIdsOrdered.indexOf(selectedOption.questionId)
                : -1;

              if (levelIndex !== -1 && levelIndex < this.cards.length) {
                this.cards[levelIndex].value = isCorrect ? 1 : 0;
              }
            });

            console.log('✅ Resultado final de niveles:', this.cards);
          },
          error: err => console.error('❌ Error al obtener opciones:', err)
        });
      },
      error: err => console.error('❌ Error al obtener respuestas del usuario:', err)
    });
  }

  onCardSelect(cardId: number): void {
    this.router.navigate(['/one-performance-concept', cardId]);
  }
}
