import { Component } from '@angular/core';
import { Profile } from '../model/Profile';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  profile: Profile = {
    id: 0,
    fullName:'',
    firstName: '',
    lastName: '',
    birthDate: '',
    sex: '',
    gradeLevel: 1,
    school: ''
  };

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  onSubmit(): void {
    // 🔄 Formatear la fecha de nacimiento a MM/DD/YYYY
    const [year, month, day] = this.profile.birthDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    // 🔤 Traducir sexo
    const sexMap: Record<string, string> = {
      M: 'Masculino',
      F: 'Femenino'
    };
    const formattedSex = sexMap[this.profile.sex] || this.profile.sex;

    // 📦 Crear objeto corregido
    const profileToSend: Profile = {
      ...this.profile,
      birthDate: formattedDate,
      sex: formattedSex
    };

    console.log('📤 Enviando perfil corregido:', profileToSend);

    this.profileService.updateProfile(profileToSend).subscribe({
      next: (updatedProfile) => {
        if (!updatedProfile || !updatedProfile.id) {
          console.warn('⚠️ El perfil fue actualizado pero sin ID válido:', updatedProfile);
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
          alert('⚠️ Vuelve a completar tus datos, ingresalos de forma correcta.');
          localStorage.clear();
          this.router.navigate(['/sign-in']);
        } else {
          alert('❌ Error inesperado. Revisa los datos e intenta nuevamente.');
        }
      }
    });
  }
}
