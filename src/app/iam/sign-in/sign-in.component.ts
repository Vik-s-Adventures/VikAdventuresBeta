import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(private router: Router,
              private authService: AuthService) {
  }

  credentials = {email: '', password: ''};


  onSignIn() {
    this.authService.signIn(this.credentials).subscribe(
      (response) => {
        console.log('SignUpUser authenticated successfully', response);
        localStorage.setItem('token', response.token);

        this.router.navigate(['/menu']);
      },
      (error) => {
        console.error('Error authenticating user', error);
      }
    );
  }
}
