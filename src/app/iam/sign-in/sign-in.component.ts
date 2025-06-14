import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ProfileService} from '../../profile/services/profile.service';
import {Profile} from '../../profile/model/Profile';
import {AudioService} from '../../shared/services/audio.service';

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
  showPassword = false;
  isValid = false;
  showValidation = false;

  validateForm(): void {
    this.showValidation = true;
    const { identifier, password } = this.credentials;
    this.isValid = identifier.trim().length > 0 && password.trim().length >= 6;
  }


  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private audioService: AudioService,// ⬅️ NUEVO
  ) {}



  onSignIn(): void {
    localStorage.clear();

    this.authService.signIn(this.credentials).subscribe({
      next: (response) => {
        console.log('✅ Usuario autenticado correctamente:', response);
        const token = response.token;
        localStorage.setItem('token', token);

        const decodedToken = this.parseJwt(token);
        const userId = decodedToken?.userId;

        if (userId) {
          this.profileService.getProfileByUserId(userId).subscribe({
            next: (profile: Profile) => {
              console.log('📦 Perfil recibido (login):', profile);
              localStorage.setItem('profileId', profile.id.toString());
              const isIncomplete =
                !profile.fullName ||
                !profile.gradeLevel ||
                !profile.school ||
                !profile.birthDate ||
                !profile.sex;

              this.audioService.stop(); // ⛔️ Detiene música anterior

              if (isIncomplete) {
                this.router.navigate(['/profile']);
              } else {
                this.audioService.play('assets/music/Bebop.mp3'); // ✅ Nueva música para menú
                this.router.navigate(['/menu']);
              }
            },
            error: () => {
              this.router.navigate(['/profile']);
            }
          });
        }
        else {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('❌ Error al autenticar usuario:', error);
      }
    });
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }
}
