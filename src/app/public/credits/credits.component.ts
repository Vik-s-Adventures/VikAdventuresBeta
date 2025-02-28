import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-credits',
  standalone: false,
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {
  constructor(private router: Router) {}


  goToMenu() {
    this.router.navigate(['/menu']);
  }
}
