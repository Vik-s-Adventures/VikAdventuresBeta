import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEvent<any>>> {
    const token = localStorage.getItem('token');

    // ✅ Rutas que realmente NO requieren token
    const publicRoutes = [
      '/api/v1/authentication/register',
      '/api/v1/authentication/login'
    ];

    const isPublic = publicRoutes.some(route => req.url.endsWith(route));

    // 🔍 Logging para depuración
    console.log('🌐 Request URL:', req.url);
    console.log('🛡️ Interceptando - Pública?', isPublic);
    console.log('🔑 Token encontrado?', !!token);

    if (!isPublic && token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('✅ Token agregado al header');
    } else if (!isPublic) {
      console.warn('⚠️ Token requerido pero no encontrado');
    }

    return next.handle(req);
  }
}
