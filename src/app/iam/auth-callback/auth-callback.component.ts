import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProfileService} from '../../profile/services/profile.service';
import { Profile } from '../../profile/model/Profile';


@Component({
  selector: 'app-auth-callback',
  template: `<p>Autenticando...</p>`
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (token) {
      localStorage.setItem('token', token);

      const decodedToken = this.parseJwt(token);
      const userId = decodedToken?.userId;

      if (userId) {
        // ✅ Ahora usamos el nuevo endpoint correcto: /profiles/by-user/{userId}
        this.profileService.getProfileByUserId(userId).subscribe({
          next: (profile) => {
            console.log('📦 Perfil recibido:', profile); // 👈 Ahora sí, dentro del scope correcto
            const isIncomplete =
              !profile.fullName ||
              !profile.gradeLevel ||
              !profile.school;

            if (isIncomplete) {
              this.router.navigate(['/profile']); // 🔄 Redirige a completar perfil
            } else {
              this.router.navigate(['/menu']); // ✅ Perfil completo
            }
          },
          error: () => {
            // 🚨 Si falla la búsqueda del perfil, asumimos que no tiene
            this.router.navigate(['/profile']);
          }
        });
      } else {
        this.router.navigate(['/login']); // ⚠️ Token no válido
      }
    } else {
      this.router.navigate(['/login']); // ⚠️ Token no presente
    }
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
