import { Component } from '@angular/core';
import {Router} from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-d2-visual-representation',
  standalone: false,
  templateUrl: './d2-visual-representation.component.html',
  styleUrl: './d2-visual-representation.component.css'
})
export class D2VisualRepresentationComponent {
  constructor(private router: Router) {}

  continuar() {
    this.router.navigate(['/d2-operation-response']);
  }


  textoOriginal: string =
    'En el estadio de la ciudad de Tacna, se jugó la final de un campeonato de fútbol. En total, 500 personas asistieron al estadio.  Esta cantidad de personas representa a los 2/4 de su capacidad. ¿Cuál es la capacidad que tiene este estadio?';
  mostrarConsejo: boolean = true;

  consejo: string =
    '💡 Consejo: 2/4 representa a dos de las cuatro partes.';

  opciones = [
    {
      id: 1,
      imagen: 'assets/images/d2/D2-1-003.PNG',
      alt: 'Fracción 1',
      esCorrecta: false
    },
    {
      id: 2,
      imagen: 'assets/images/d2/D2-1-002.PNG',
      alt: 'Fracción 2',
      esCorrecta: false
    },
    {
      id: 3,
      imagen: 'assets/images/d2/D2-1-001.PNG',
      alt: 'Fracción 3',
      esCorrecta: true
    }
  ];

  seleccionadaId: number | null = null;
  mensajeFeedback: string = '';
  respuestaCorrecta: boolean = false;

  seleccionarOpcion(id: number) {
    this.seleccionadaId = id;
    const opcion = this.opciones.find(opt => opt.id === id);
    if (opcion?.esCorrecta) {
      this.mensajeFeedback = '✅ ¡Correcto! Esa es la fracción adecuada ✔';
      this.respuestaCorrecta = true;

      // 🎉 Lanzar confeti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

    } else {
      this.mensajeFeedback = '❌ Esa no representa correctamente la fracción. Intenta otra vez.';
      this.respuestaCorrecta = false;
    }
  }

  reiniciar() {
    this.seleccionadaId = null;
    this.mensajeFeedback = '';
    this.respuestaCorrecta = false;
  }
}
