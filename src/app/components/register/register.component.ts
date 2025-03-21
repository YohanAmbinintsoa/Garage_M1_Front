import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../../../environments/environment';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FloatLabelModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Correction ici
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    birthdate: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  errorMessage: string = "";

  constructor(private http: HttpClient,private router: Router) { }

  onRegister() {
    if (this.registerForm.valid) {
      this.http.post(environment.API_URL+'/auth/register', this.registerForm.value)
        .subscribe({
          next: (response: any) => {
            localStorage.setItem('token', response.token);
            console.log('Registration successful!', response);
            this.router.navigate(['/home']);
          },
          error: (err) => {
            this.errorMessage = err?.error?.message || "An error occurred. Please try again.";
            console.error('Registration error:', err);
          }
        });
    } else {
      this.errorMessage = "Please fill out all required fields correctly.";
    }
  }
}
