import { Component } from '@angular/core';
import {Profile} from '../model/Profile';
import {ProfileService} from '../services/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  profile: Profile = {
    firstName: '',
    lastName: '',
    birthDate: '',
    sex: '',
    gradeLevel: 1,
    school: '',
    id: 0
  };

  constructor(private profileService: ProfileService,
              private router: Router) {}

  onSubmit(): void {
    this.profileService.createProfile(this.profile).subscribe({
      next: (createdProfile) => {
        alert('✅ Perfil creado exitosamente.');

        // 👉 Guardar el ID del perfil en localStorage
        localStorage.setItem('profileId', createdProfile.id.toString());

        // 🔁 Redirigir al cuestionario u otra ruta
        this.router.navigate(['/menu']);
      },
      error: err => alert('❌ Error al crear perfil: ' + err.message)
    });
  }
}

