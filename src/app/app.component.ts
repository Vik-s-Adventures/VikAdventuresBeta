import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vik';

  @HostListener('window:beforeunload', ['$event'])
  clearOnClose(event: Event) {
    localStorage.removeItem('profileId');
    localStorage.clear();
  }
}
