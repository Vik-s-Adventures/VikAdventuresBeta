import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  template: `<p>Autenticando...</p>`
})
export class AuthCallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // 1. Obtener el token desde la URL
    const token = this.route.snapshot.queryParamMap.get('token');

    // 2. Si hay token, guardarlo y redirigir
    if (token) {
      localStorage.setItem('token', token);
      this.router.navigate(['/profile']);
    } else {
      // 3. Si no hay token, redirigir al login
      this.router.navigate(['/login']);
    }
  }
}
