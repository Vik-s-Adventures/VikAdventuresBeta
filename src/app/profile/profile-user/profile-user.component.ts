import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../shared/environments/environment.development';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ProfileEditDialogComponentComponent } from '../profile-edit-dialog-component/profile-edit-dialog-component.component';



@Component({
  selector: 'app-profile-user',
  standalone: false,
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent implements OnInit {
  profile: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = this.parseJwt(token);
      const userId = decodedToken?.userId;

      if (userId) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this.http.get(`${environment.serverBasePath}/profiles/users/${userId}`, { headers })
          .subscribe({
            next: data => this.profile = data,
            error: err => console.error('❌ Error al cargar perfil:', err)
          });
      } else {
        console.warn('⚠️ No se pudo extraer userId del token');
      }
    } else {
      console.warn('⚠️ Token no disponible');
    }
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(ProfileEditDialogComponentComponent, {
      width: '400px',
      data: { ...this.profile }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.profile = result;
      }
    });
  }


  goToMenu(): void {
    this.router.navigate(['/menu']);
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
