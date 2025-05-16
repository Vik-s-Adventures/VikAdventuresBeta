import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-d2-data-identification',
  standalone: false,
  templateUrl: './d2-data-identification.component.html',
  styleUrl: './d2-data-identification.component.css'
})
export class D2DataIdentificationComponent implements OnInit, OnDestroy {

  constructor(private router: Router) {}

  continuar() {
    this.router.navigate(['/d2-visual-representation']);
  }

  zonaDisponibleOriginal: string[] = [
    '500 personas asistieron al estadio',
    '2/4 de su capacidad es igual a 500',
    '¿Cuál es la capacidad que tiene el estadio?',
    '200 personas más entraron después'
  ];

  zonaDisponible: string[] = [];
  zonaDato: string[] = [];
  zonaFaltante: string[] = [];

  mensajeFeedback = '';

  textoOriginal = 'En el estadio de la ciudad de Tacna, se jugó la final de un campeonato de fútbol. En total, 500 personas asistieron al estadio.  Esta cantidad de personas representa a los 2/4 de su capacidad. ¿Cuál es la capacidad que tiene este estadio?';
  textoNarrado = '';
  mostrarConsejo = false;
  narracionFinalizada = false;
  narracionInterval: any = null;

  ngOnInit() {
    this.reiniciarJuego();
  }

  ngOnDestroy(): void {
    if (this.narracionInterval) {
      clearInterval(this.narracionInterval);
    }
  }

  narrarTexto() {
    if (this.narracionInterval) {
      clearInterval(this.narracionInterval);
    }

    let i = 0;
    this.textoNarrado = '';

    this.narracionInterval = setInterval(() => {
      if (i < this.textoOriginal.length) {
        this.textoNarrado += this.textoOriginal.charAt(i);
        i++;
      } else {
        clearInterval(this.narracionInterval);
        this.narracionInterval = null;
        this.narracionFinalizada = true;
        this.mostrarConsejo = true;
      }
    }, 40);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  validarRespuesta() {
    const datosCorrectos = [
      '500 personas asistieron al estadio',
      '2/4 de su capacidad es igual a 500',
    ];
    const faltanteCorrecto = '¿Cuál es la capacidad que tiene el estadio?';
    const distractor = '200 personas más entraron después';

    const zonaDatoOk = this.zonaDato.length === 2 &&
      this.zonaDato.includes(datosCorrectos[0]) &&
      this.zonaDato.includes(datosCorrectos[1]);

    const zonaFaltanteOk = this.zonaFaltante.length === 1 &&
      this.zonaFaltante[0] === faltanteCorrecto;

    const sinDistractores = !this.zonaDato.includes(distractor) &&
      !this.zonaFaltante.includes(distractor);

    if (zonaDatoOk && zonaFaltanteOk && sinDistractores) {
      this.mensajeFeedback = '✅ ¡Correcto! Clasificación realizada con éxito 🎉';
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } else {
      this.mensajeFeedback = '❌ Hay errores en la clasificación. Revisa las tarjetas.';
    }
  }

  reiniciarJuego() {
    this.zonaDisponible = [...this.zonaDisponibleOriginal];
    this.zonaDato = [];
    this.zonaFaltante = [];
    this.mensajeFeedback = '';
    this.textoNarrado = '';
    this.mostrarConsejo = false;
    this.narracionFinalizada = false;
    this.narrarTexto();
  }
}
