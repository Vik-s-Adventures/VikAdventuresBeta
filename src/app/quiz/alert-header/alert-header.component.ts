import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-alert-header',
  standalone: false,
  templateUrl: './alert-header.component.html',
  styleUrl: './alert-header.component.css'
})
export class AlertHeaderComponent {
  showDialog = false;

  constructor(private router: Router) {}

  confirmExit(): void {
    this.showDialog = true;
  }

  cancelExit(): void {
    this.showDialog = false;
  }

  exitToMenu(): void {
    localStorage.removeItem('incompleteQuiz');
    this.router.navigate(['/menu']);
  }
}
