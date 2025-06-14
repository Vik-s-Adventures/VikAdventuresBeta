import {Component, OnInit} from '@angular/core';
import Phaser from 'phaser';
import {Router} from '@angular/router';
import {AudioService} from '../../../shared/services/audio.service';

@Component({
  selector: 'app-welcome-questionnaire',
  standalone: false,
  templateUrl: './welcome-questionnaire.component.html',
  styleUrl: './welcome-questionnaire.component.css'
})
export class WelcomeQuestionnaireComponent implements OnInit{

  phaserGame!: Phaser.Game;

  constructor(private router: Router,
              private audioService: AudioService) {}

  ngOnInit(): void {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 300,
      height: 300,
      parent: 'phaser-container',
      transparent: true,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: {
        preload: function () {
          this.load.spritesheet('character', 'assets/images/adelantesprite.png', {
            frameWidth: 500,
            frameHeight: 500
          });
        },
        create: function () {
          // Escala dinámica según resolución
          const scaleFactor = window.innerWidth < 480
            ? 0.4
            : window.innerWidth < 768
              ? 0.5
              : 0.6;

          this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
          });

          const sprite = this.add.sprite(150, 150, 'character').setScale(scaleFactor);
          sprite.play('walk');
        },
        update: function () {
          // No se requiere lógica de actualización por ahora
        }
      }
    };

    this.phaserGame = new Phaser.Game(config);
  }

  continueAction(): void {
    sessionStorage.setItem('allowQuestionnaireAccess', 'true');

    // Detiene la música actual y reproduce una nueva
    this.audioService.play('assets/music/GypsyAlex(Chiptune).mp3');

    this.router.navigate(['/questionnaire']);
  }

}


