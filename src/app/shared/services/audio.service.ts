import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private currentAudio: HTMLAudioElement | null = null;

  play(src: string, loop = true, volume = 0.2): void {
    // Si ya hay una pista sonando, deténla
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    this.currentAudio = new Audio(src);
    this.currentAudio.loop = loop;
    this.currentAudio.volume = volume;

    this.currentAudio.play().catch(err => {
      console.warn('Reproducción bloqueada o fallida:', err);
    });
  }

  pause(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
    }
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }
}
