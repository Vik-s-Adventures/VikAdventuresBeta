import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import confetti from 'canvas-confetti';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-identification',
  standalone: false,
  templateUrl: './data-identification.component.html',
  styleUrl: './data-identification.component.css'
})
export class DataIdentificationComponent implements OnInit, OnDestroy {

  constructor(private router: Router) {}

  continuar() {
    this.router.navigate(['/d1-visual-representation']);
  }

  zonaDisponibleOriginal: string[] = [
    'Laura colocó 1/4 de las manzanas en un plato.',
    'En el plato se observan 2 manzanas.',
    '¿Cuántas manzanas quedarón en la canasta?',
    'Laura compró 10 dulces.'
  ];

  zonaDisponible: string[] = [];
  zonaDato: string[] = [];
  zonaFaltante: string[] = [];

  mensajeFeedback = '';

  textoOriginal = 'Laura recogió cierta cantidad de manzanas. Colocó 1/4 de esa cantidad en un plato y dejó el resto en la canasta. ¿Cuántas manzanas dejó Laura en la canasta?';
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
      'Laura colocó 1/4 de las manzanas en un plato.',
      'En el plato se observan 2 manzanas.'
    ];
    const faltanteCorrecto = '¿Cuántas manzanas quedarón en la canasta?';
    const distractor = 'Laura compró 10 dulces.';

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
