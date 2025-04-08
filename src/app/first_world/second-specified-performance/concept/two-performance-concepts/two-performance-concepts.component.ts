import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-two-performance-concepts',
  standalone: false,
  templateUrl: './two-performance-concepts.component.html',
  styleUrl: './two-performance-concepts.component.css'
})
export class TwoPerformanceConceptsComponent implements OnInit {

  phaserGame!: Phaser.Game;
  config!: Phaser.Types.Core.GameConfig;

  currentCard = 0; // Inicialmente, el sprite presenta el tema

  sprite!: Phaser.GameObjects.Sprite; // Definir el sprite para el salto
  private load: any;
  private anims: any;
  private add: any;
  private tweens: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.config = {
      type: Phaser.AUTO,
      width: 500,
      height: 500,
      parent: 'phaser-container',
      transparent: true,
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update
      }
    };

    this.phaserGame = new Phaser.Game(this.config);
  }

  preload() {
    // Cargar el nuevo sprite proporcionado
    this.load.spritesheet('character', 'assets/images/spritederecha.png', {
      frameWidth: 500,
      frameHeight: 500
    });
  }

  create() {
    // Crear la animación del nuevo sprite
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1 // Repite indefinidamente
    });

    this.sprite = this.add.sprite(250, 250, 'character').setScale(1);
    this.sprite.play('walk');
  }

  update() {
    // Lógica de actualización si es necesario
  }

  // Función para avanzar al siguiente card y hacer que el sprite salte
  nextCard() {
    this.currentCard += 1;
  }
  previousCard() {
    this.currentCard -= 1;
  }

  goToRemember() {
    this.router.navigate(['/d2-one-practice']); // Navega a otra sección
  }

  navigateToComponent1() {
    this.router.navigate(['/menu']); // Navega a Componente 1
  }

  navigateToComponent2() {
    this.router.navigate(['/result']); // Navega a Componente 2
  }
}
