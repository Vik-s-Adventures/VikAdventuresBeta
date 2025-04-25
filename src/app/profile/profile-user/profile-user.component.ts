import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../shared/environments/environment.development';


@Component({
  selector: 'app-profile-user',
  standalone: false,
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.css'
})
export class ProfileUserComponent implements OnInit {
  profile: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const profileId = localStorage.getItem('profileId');

    if (token && profileId) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get(`${environment.serverBasePath}/api/v1/profiles/${profileId}`, { headers })
        .subscribe({
        next: data => this.profile = data,
        error: err => console.error('❌ Error al cargar perfil:', err)
      });
    } else {
      console.warn('⚠️ Token o profileId no disponible');
    }
  }
}

