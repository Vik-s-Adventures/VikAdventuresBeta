import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as Phaser from 'phaser';

@Component({
  selector: 'app-initial',
  standalone: false,
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent implements OnInit{
  constructor(private router: Router) {}

  navigateToSignIn(): void {
    this.router.navigate(['/sign-in']);
  }

  navigateToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }

  phaserGame!: Phaser.Game;
  config!: Phaser.Types.Core.GameConfig;


  sprite!: Phaser.GameObjects.Sprite;
  private load: any;
  private anims: any;
  private add: any;


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
    this.load.spritesheet('character', 'assets/images/vick250ad.png', {
      frameWidth: 250,
      frameHeight: 250
    });
  }

  create() {
    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('character', {start: 0, end: 3}),
      frameRate: 8,
      repeat: -1
    });

    this.sprite = this.add.sprite(250, 180, 'character').setScale(1);
    this.sprite.play('walk');
  }

  update() {
    // Lógica de actualización
  }
}
