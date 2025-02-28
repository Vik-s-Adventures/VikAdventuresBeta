import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user = { email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSignUp() {
    this.authService.signUp(this.user).subscribe(
      (response) => {
        console.log('SignUpUser registered successfully', response);

        // Redirigir a la página de inicio de sesión o a otra ruta deseada
        this.router.navigate(['/sign-in']);
      },
      (error) => {
        console.error('Error registering user', error);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
}

