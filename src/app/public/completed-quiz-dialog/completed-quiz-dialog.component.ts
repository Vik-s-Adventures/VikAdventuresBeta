import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-completed-quiz-dialog',
  standalone: false,
  templateUrl: './completed-quiz-dialog.component.html',
  styleUrl: './completed-quiz-dialog.component.css'
})
export class CompletedQuizDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CompletedQuizDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { characterImg: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
