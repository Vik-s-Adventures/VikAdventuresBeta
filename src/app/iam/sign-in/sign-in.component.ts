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
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService
  ) {}

  onSignIn(): void {
    // 🔄 Limpia datos anteriores de otro usuario
    localStorage.clear();

    this.authService.signIn(this.credentials).subscribe({
      next: (response) => {
        console.log('✅ Usuario autenticado correctamente:', response);

        localStorage.setItem('token', response.token);

        const decodedToken = this.parseJwt(response.token);
        const username = decodedToken?.sub;
        console.log('👤 Username decodificado:', username);

        // Buscar si ya tiene perfil creado
        this.profileService.getProfileByUsername(username).subscribe({
          next: (profile) => {
            if (profile?.id) {
              localStorage.setItem('profileId', profile.id.toString());
              console.log('📌 Perfil encontrado:', profile);
              this.router.navigate(['/menu']);
            } else {
              console.warn('⚠️ Usuario no tiene perfil, redirigiendo...');
              this.router.navigate(['/profile']);
            }
          },
          error: (err) => {
            console.warn('⚠️ No se encontró perfil, redirigiendo al registro...');
            this.router.navigate(['/profile']);
          }
        });
      },
      error: (error) => {
        console.error('❌ Error al autenticar usuario:', error);
      }
    });
  }

  private parseJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('❌ Error al decodificar JWT:', e);
      return null;
    }
  }
}
