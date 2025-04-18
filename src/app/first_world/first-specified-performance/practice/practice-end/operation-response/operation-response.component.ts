import { Component } from '@angular/core';
import {Router} from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-operation-response',
  standalone: false,
  templateUrl: './operation-response.component.html',
  styleUrl: './operation-response.component.css'
})

export class OperationResponseComponent {
  constructor(private router: Router) {}

  // Texto del narrador
  textoNarrado: string = 'Laura recogió cierta cantidad de manzanas. Colocó 1/4 de esa cantidad en un plato y dejó el resto en la canasta. ¿Cuántas manzanas dejó Laura en la canasta?';

  mostrarConsejo: boolean = true;

  // Controla la selección del usuario
  opcionSeleccionada: string = '';

  // Mensaje que aparece según la respuesta
  mensajeFeedback: string = '';

  // Verifica si se mostró el confetti para evitar duplicarlo
  confettiMostrado: boolean = false;

  // Verificación de respuesta
  validarRespuesta() {
    if (this.opcionSeleccionada === '') {
      this.mensajeFeedback = '❌ Debes seleccionar una opción antes de continuar.';
      return;
    }

    if (this.opcionSeleccionada === '6') {
      this.mensajeFeedback = '✅ ¡Correcto! Laura dejó 6 manzanas en la canasta.';
      this.lanzarConfetti();
    } else {
      this.mensajeFeedback = '❌ Respuesta incorrecta. Revisa los datos y vuelve a intentarlo.';
    }
  }

  // Reinicia el estado del juego
  reiniciar() {
    this.opcionSeleccionada = '';
    this.mensajeFeedback = '';
    this.confettiMostrado = false;
  }

  continuar() {
    this.router.navigate(['/d1-evaluation']);
  }


  // 🎉 Confetti
  lanzarConfetti() {
    if (this.confettiMostrado) return;

    this.confettiMostrado = true;

    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        ...defaults,
        particleCount: 50,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });
    }, 250);
  }
}
