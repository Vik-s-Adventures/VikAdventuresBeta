import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../iam/services/auth.service';
import Phaser from 'phaser';

@Component({
  selector: 'app-play',
  standalone: false,
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit{
  constructor(private router: Router,
              private authService: AuthService) {}


  navigateToInitial(): void {
    this.router.navigate(['/initial']);
  }

  phaserGame!: Phaser.Game;

  preload = function (this: Phaser.Scene) {
    this.load.spritesheet('character', 'assets/images/vick250ad.png', {
      frameWidth: 250,
      frameHeight: 250
    });
  };

  create = function (this: Phaser.Scene) {
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
      frameRate: 8,
      repeat: -1
    });

    // Ajuste dinámico de escala según el ancho del canvas
    const canvasWidth = this.sys.canvas.width;
    const scaleFactor = canvasWidth <= 200 ? 0.4 : canvasWidth <= 300 ? 0.6 : 0.8;

    const sprite = this.add.sprite(canvasWidth / 2, canvasWidth * 0.35, 'character').setScale(scaleFactor);
    sprite.play('walk');
  };

  update = function () {};

  ngOnInit(): void {
    const width = Math.min(window.innerWidth * 0.6, 250);
    const height = width;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: width,
      height: height,
      parent: 'phaser-container',
      transparent: true,
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update
      }
    };

    this.phaserGame = new Phaser.Game(config);
  }
}
