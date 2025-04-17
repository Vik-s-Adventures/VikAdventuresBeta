import { Component } from '@angular/core';
import { Router } from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-visual-representation',
  standalone: false,
  templateUrl: './visual-representation.component.html',
  styleUrl: './visual-representation.component.css'
})
export class VisualRepresentationComponent {

  constructor(private router: Router) {}

  continuar() {
    this.router.navigate(['/d1-operation-response']);
  }


  textoOriginal: string =
    'Laura recogió cierta cantidad de manzanas. Colocó 1/4 de esa cantidad en un plato y dejó el resto en la canasta. ¿Cuántas manzanas dejó Laura en la canasta?';

  mostrarConsejo: boolean = true;

  consejo: string =
    '💡 Consejo: 1/4 representa una de cuatro partes iguales.';

  opciones = [
    {
      id: 1,
      imagen: 'assets/images/d1/practice-end-resources/visual-three.png',
      alt: 'Fracción 1',
      esCorrecta: false
    },
    {
      id: 2,
      imagen: 'assets/images/d1/practice-end-resources/visual-two.png',
      alt: 'Fracción 2',
      esCorrecta: false
    },
    {
      id: 3,
      imagen: 'assets/images/d1/practice-end-resources/visual-one.png',
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
