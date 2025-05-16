import { Component } from '@angular/core';
import {Router} from '@angular/router';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-d2-operation-response',
  standalone: false,
  templateUrl: './d2-operation-response.component.html',
  styleUrl: './d2-operation-response.component.css'
})
export class D2OperationResponseComponent {
  constructor(private router: Router) {}

  // Texto del narrador
  textoNarrado: string = 'En el estadio de la ciudad de Tacna, se jugó la final de un campeonato de fútbol. En total, 500 personas asistieron al estadio.  Esta cantidad de personas representa a los 2/4 de su capacidad. ¿Cuál es la capacidad que tiene este estadio?';
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

    if (this.opcionSeleccionada === '1000') {
      this.mensajeFeedback = '✅ ¡Correcto! la capacidad total del estadio es de 1000 personas';
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
    this.router.navigate(['/d2-evaluation']);
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
