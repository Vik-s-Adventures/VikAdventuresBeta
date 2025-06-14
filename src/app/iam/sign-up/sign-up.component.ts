import { Component } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {AudioService} from '../../shared/services/audio.service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent  {
  user = { name: '', email: '', password: '' };
  errorMessage: string | null = null;
  showPassword = false;

  passwordValidation = {
    hasLower: false,
    hasUpper: false,
    hasNumber: false,
    minLength: false
  };

  constructor(private authService: AuthService,
              private router: Router,
              private audioService: AudioService) {}

  onSignUp(): void {
    if (!this.isFormValid()) return;

    this.authService.signUp(this.user).subscribe({
      next: (response) => {
        console.log('✅ Usuario registrado exitosamente:', response);
        // 🔊 Reproducir audio de registro exitoso
        this.audioService.play('assets/music/Plucked.wav');
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('❌ Error al registrar:', error);
        this.errorMessage = 'Registro fallido. Intenta nuevamente.';
      }
    });
  }

  validatePassword(password: string): void {
    this.passwordValidation = {
      hasLower: /[a-z]/.test(password),
      hasUpper: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      minLength: password.length >= 8
    };
  }

  isPasswordValid(): boolean {
    const { hasLower, hasUpper, hasNumber, minLength } = this.passwordValidation;
    return hasLower && hasUpper && hasNumber && minLength;
  }

  isFormValid(): boolean {
    return (
      this.user.name.trim() !== '' &&
      this.user.email.trim() !== '' &&
      this.isPasswordValid()
    );
  }
}


