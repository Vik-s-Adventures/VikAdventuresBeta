import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ProfileService} from '../../profile/services/profile.service';

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
        this.profileService.getProfileById(userId).subscribe({
          next: (profile) => {
            if (profile) {
              this.router.navigate(['/menu']); // ✅ Ya tiene perfil
            } else {
              this.router.navigate(['/profile']); // 🔄 Redirigir a completar datos
            }
          },
          error: () => {
            // ❌ No tiene perfil aún
            this.router.navigate(['/profile']);
          }
        });
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(decodeURIComponent(atob(base64).split('').map(c =>
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join('')));
    } catch (error) {
      return null;
    }
  }
}
