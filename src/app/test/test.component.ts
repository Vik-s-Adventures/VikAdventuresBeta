import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test',
  standalone: false,
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  quizzes: any[] = [];
  selectedQuizId: number | null = null;
  rutaFinal: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/v1/quizzes').subscribe({
      next: (data) => {
        this.quizzes = data;
        console.log('✅ Quizzes disponibles:', data);
      },
      error: (err) => {
        console.error('❌ Error al cargar quizzes:', err);
      }
    });
  }

  generarYObtenerRuta(): void {
    const profileId = localStorage.getItem('profileId');

    if (!profileId || !this.selectedQuizId) {
      console.warn('⚠️ profileId o quizId no disponibles.');
      return;
    }

    // Paso 1: Generar ruta
    const postUrl = `http://localhost:8080/api/v1/learning-path?profileId=${profileId}&quizId=${this.selectedQuizId}`;
    this.http.post(postUrl, {}).subscribe({
      next: () => {
        console.log('✅ Ruta generada con éxito. Consultando ruta almacenada...');

        // Paso 2: Obtener ruta final
        const getUrl = `http://localhost:8080/api/v1/learning-paths/profile/${profileId}`;
        this.http.get<any[]>(getUrl).subscribe({
          next: (res) => {
            console.log('📦 Ruta almacenada recuperada:', res);
            this.rutaFinal = res[0]?.learningPath || [];
          },
          error: (err) => {
            console.error('❌ Error al obtener ruta almacenada:', err);
          }
        });
      },
      error: (err) => {
        console.error('❌ Error al generar ruta:', err);
      }
    });
  }
}
