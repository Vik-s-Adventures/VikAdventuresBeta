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
  currentCard = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game({
      type: Phaser.AUTO,
      width: 300,
      height: 200,
      parent: 'phaser-container',
      transparent: true,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: {
        preload: function () {
          this.load.spritesheet('character', 'assets/images/vick250ad.png', {
            frameWidth: 250,
            frameHeight: 250,
          });
        },
        create: function () {
          const scaleFactor = window.innerWidth < 480 ? 0.4 : window.innerWidth < 768 ? 0.5 : 0.6;
          this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
          });
          const sprite = this.add.sprite(150, 150, 'character').setScale(scaleFactor);
          sprite.play('walk');
        },
        update: function () {}
      }
    });
  }

  // Cambia a la tarjeta siguiente
  nextCard(): void {
    if (this.currentCard < 7) {
      this.currentCard++;
    }
  }

  // Cambia a la tarjeta anterior
  previousCard(): void {
    if (this.currentCard > 0) {
      this.currentCard--;
    }
  }

  // Redirige al componente de práctica
  goToRemember(): void {
    this.router.navigate(['/d2-one-practice']);
  }

  // Redirige al menú
  navigateToComponent1(): void {
    this.router.navigate(['/menu']);
  }

  // Redirige a la ruta de aprendizaje
  navigateToComponent2(): void {
    this.router.navigate(['/learning-path']);
  }
}
