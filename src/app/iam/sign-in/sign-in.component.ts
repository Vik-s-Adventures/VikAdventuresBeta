import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ProfileService} from '../../profile/services/profile.service';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  credentials = {
    identifier: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSignIn(): void {
    localStorage.clear();

    this.authService.signIn(this.credentials).subscribe({
      next: (response) => {
        console.log('✅ Usuario autenticado correctamente:', response);
        localStorage.setItem('token', response.token);

        // 👇 Ya no obtenemos el perfil, lo mandamos al registro para completarlo con PUT
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('❌ Error al autenticar usuario:', error);
      }
    });
  }
}
