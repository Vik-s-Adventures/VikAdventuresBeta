import { Component } from '@angular/core';
import { Profile } from '../model/Profile';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  profile: Profile = {
    id: 0,
    fullName: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    sex: '',
    gradeLevel: 1,
    school: ''
  };

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  validateAndSubmit(form: NgForm): void {
    if (form.invalid) {
      this.snackBar.open('⚠️ Por favor completa todos los campos correctamente.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const [year, month, day] = this.profile.birthDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    const sexMap: Record<string, string> = { M: 'Masculino', F: 'Femenino' };
    const formattedSex = sexMap[this.profile.sex] || this.profile.sex;

    const profileToSend: Profile = {
      ...this.profile,
      birthDate: formattedDate,
      sex: formattedSex
    };

    this.profileService.updateProfile(profileToSend).subscribe({
      next: (updatedProfile) => {
        if (!updatedProfile || !updatedProfile.id) {
          alert('❌ No se pudo actualizar el perfil correctamente.');
          return;
        }
        alert('✅ Perfil actualizado correctamente.');
        localStorage.setItem('profileId', updatedProfile.id.toString());
        this.router.navigate(['/menu']);
      },
      error: (err) => {
        console.error('❌ Error al actualizar el perfil:', err);
        if (err.status === 401) {
          alert('⚠️ Vuelve a completar tus datos.');
          localStorage.clear();
          this.router.navigate(['/initial']);
        } else {
          alert('❌ Error inesperado.');
        }
      }
    });
  }
}
