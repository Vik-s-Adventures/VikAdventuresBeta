import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AudioService} from '../../shared/services/audio.service';

@Component({
  selector: 'app-alert-header',
  standalone: false,
  templateUrl: './alert-header.component.html',
  styleUrl: './alert-header.component.css'
})
export class AlertHeaderComponent {
  showDialog = false;

  constructor(private router: Router,
              private audioService: AudioService) {}



  confirmExit(): void {
    // Detiene la música actual y reproduce una nueva
    this.audioService.play('assets/music/Bebop.mp3');
    this.showDialog = true;
  }

  cancelExit(): void {
    this.audioService.play('assets/music/TalkingCuteChiptune.mp3');
    this.showDialog = false;
  }

  exitToMenu(): void {
    sessionStorage.removeItem('allowQuestionnaireAccess');
    localStorage.removeItem('incompleteQuiz');
    this.router.navigate(['/menu']);
  }
}
