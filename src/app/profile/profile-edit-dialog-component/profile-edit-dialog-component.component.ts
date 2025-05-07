import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../shared/environments/environment.development';

@Component({
  selector: 'app-profile-edit-dialog-component',
  standalone: false,
  templateUrl: './profile-edit-dialog-component.component.html',
  styleUrl: './profile-edit-dialog-component.component.css'
})
export class ProfileEditDialogComponentComponent {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ProfileEditDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    console.log('🔍 Datos recibidos en el diálogo:', this.data);

    this.editForm = this.fb.group({
      firstName: [this.data.firstName || '', Validators.required],
      lastName: [this.data.lastName || '', Validators.required],
      sex: [this.data.sex || '', Validators.required],
      birthDate: [this.parseDate(this.data.birthDate), Validators.required],
      gradeLevel: [
        this.data.gradeLevel || '',
        [Validators.required, Validators.min(1), Validators.max(5)]
      ],
      school: [this.data.school || '', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editForm.invalid) return;

    const formValue = this.editForm.value;
    const formattedBirthDate = this.formatDate(formValue.birthDate);

    const updatedProfile = {
      ...this.data,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      sex: formValue.sex,
      birthDate: formattedBirthDate,
      gradeLevel: formValue.gradeLevel,
      school: formValue.school
    };

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(`${environment.serverBasePath}/profiles`, updatedProfile, { headers }).subscribe({
      next: () => this.dialogRef.close(updatedProfile),
      error: (err) => console.error('❌ Error al actualizar perfil:', err)
    });
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private parseDate(dateStr: string): Date {
    if (!dateStr) return new Date();
    const [day, month, year] = dateStr.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
}
