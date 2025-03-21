import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FloatLabelModule, ReactiveFormsModule, CommonModule],
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
    role: new FormControl('USER') // Correction ici
  });

  errorMessage: string = "";

  constructor(private http: HttpClient) { }

  onRegister() {
    if (this.registerForm.valid) {
      this.http.post(environment.API_URL+'/auth/register', this.registerForm.value)
        .subscribe({
          next: (response: any) => {
            localStorage.setItem('token', response.token);
            console.log('Registration successful!', response);
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
